#!/usr/bin/env node
/**
 * Contrôle SEO local (audit SEO/GEO du 26/10/2026, plan priorisé « Bonus » :
 * crawl local qui échoue si une règle est violée).
 *
 * Usage :
 *   npm run build && npm run seo:check            # lance `next start` sur un port libre
 *   node scripts/seo-check.mjs --base http://localhost:3000   # serveur déjà lancé
 *   node scripts/seo-check.mjs --external         # vérifie aussi les liens *.agentimpact.fr en ligne
 *
 * Règles (chaque violation fait échouer le script, code de sortie 1) :
 *   1. /sitemap.xml répond 200 et contient au moins une URL.
 *   2. Chaque URL du sitemap répond 200, sans redirection.
 *   3. Une seule balise canonical, absolue, égale à l'URL du sitemap.
 *   4. Exactement un <h1>.
 *   5. <title> et meta description présents et uniques entre les pages.
 *   6. og:image présente.
 *   7. Chaque bloc JSON-LD passe JSON.parse.
 *   8. Aucun lien interne vers une 404 ou une redirection (ancres ignorées).
 *   9. Aucun lien vers l'apex https://agentimpact.fr (308 vers www connu).
 *
 * Aucune dépendance : Node 18+ (fetch natif).
 */
import { spawn } from "node:child_process";
import { createServer } from "node:net";

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

// Hôtes connus pour rediriger : un lien vers eux est une redirection inutile.
const KNOWN_REDIRECT_HOSTS = new Set(["agentimpact.fr"]);
// Hôtes « de la famille » vérifiés en ligne avec --external.
const EXTERNAL_HOST_RE = /(^|\.)agentimpact\.fr$/;
// Liens d'action (paiement, app) qui redirigent volontairement : ignorés.
const EXTERNAL_IGNORE_RE = /^https:\/\/app\.agentimpact\.fr\//;

const errors = [];
const warn = [];
const fail = (page, msg) => errors.push(`${page} : ${msg}`);

function freePort() {
  return new Promise((resolve) => {
    const srv = createServer();
    srv.listen(0, () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

async function waitFor(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status > 0) return;
    } catch {
      /* serveur pas encore prêt */
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`serveur injoignable : ${url}`);
}

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return m ? (m[2] ?? m[3]) : undefined;
};
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const stripTrailingSlash = (u) => (u.endsWith("/") ? u.slice(0, -1) : u);

async function main() {
  let base = opt("--base");
  let child;
  if (!base) {
    const port = await freePort();
    base = `http://localhost:${port}`;
    child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], {
      stdio: ["ignore", "ignore", "inherit"],
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    });
    await waitFor(`${base}/`);
  }

  try {
    await run(base);
  } finally {
    if (child) child.kill("SIGTERM");
  }

  for (const w of warn) console.log(`  avertissement  ${w}`);
  if (errors.length) {
    console.error(`\nseo-check : ${errors.length} erreur(s)`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }
  console.log("\nseo-check : OK");
}

async function run(base) {
  // 1. sitemap
  const sm = await fetch(`${base}/sitemap.xml`, { redirect: "manual" });
  if (sm.status !== 200) {
    fail("/sitemap.xml", `statut ${sm.status}`);
    return;
  }
  const xml = await sm.text();
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (!urls.length) {
    fail("/sitemap.xml", "aucune <loc>");
    return;
  }
  const origin = new URL(urls[0]).origin;
  console.log(`sitemap : ${urls.length} URL, origine ${origin}, serveur ${base}`);

  const titles = new Map();
  const descs = new Map();
  const links = new Map(); // chemin -> page source
  const externals = new Map();

  for (const url of urls) {
    const u = new URL(url);
    const path = u.pathname + u.search;
    // 2. statut
    const res = await fetch(base + path, { redirect: "manual" });
    if (res.status !== 200) {
      fail(path, `statut ${res.status}${res.headers.get("location") ? ` → ${res.headers.get("location")}` : ""}`);
      continue;
    }
    const html = await res.text();
    const head = html.split(/<\/head>/i)[0];

    // 3. canonical
    const canon = [...head.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi)].map((m) => attr(m[0], "href"));
    if (canon.length !== 1) fail(path, `${canon.length} canonical (attendu 1)`);
    else if (stripTrailingSlash(canon[0]) !== stripTrailingSlash(url)) fail(path, `canonical ${canon[0]} ≠ ${url}`);

    // 4. un H1
    const h1 = (html.match(/<h1[\s>]/gi) || []).length;
    if (h1 !== 1) fail(path, `${h1} <h1> (attendu 1)`);

    // 5. title + description uniques
    const title = decode((head.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || "").trim();
    const descTag = head.match(/<meta\b[^>]*name=["']description["'][^>]*>/i);
    const desc = descTag ? decode(attr(descTag[0], "content") || "").trim() : "";
    if (!title) fail(path, "title absent");
    if (!desc) fail(path, "meta description absente");
    if (title && titles.has(title)) fail(path, `title identique à ${titles.get(title)}`);
    if (desc && descs.has(desc)) fail(path, `description identique à ${descs.get(desc)}`);
    titles.set(title, path);
    descs.set(desc, path);
    if (title.length > 60) warn.push(`${path} : title de ${title.length} caractères (> 60)`);

    // 6. og:image
    if (!/<meta\b[^>]*property=["']og:image["']/i.test(head)) fail(path, "og:image absente");

    // 7. JSON-LD
    const blocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    for (const [i, b] of blocks.entries()) {
      try {
        JSON.parse(b[1]);
      } catch (e) {
        fail(path, `JSON-LD #${i + 1} invalide : ${e.message}`);
      }
    }

    // 8 et 9. liens
    for (const m of html.matchAll(/<a\b[^>]*>/gi)) {
      const href = attr(m[0], "href");
      if (!href || href.startsWith("#") || /^(mailto|tel|javascript):/i.test(href)) continue;
      let target;
      try {
        target = new URL(decode(href), url);
      } catch {
        fail(path, `href invalide ${href}`);
        continue;
      }
      if (KNOWN_REDIRECT_HOSTS.has(target.hostname)) fail(path, `lien vers ${target.href} (redirige, utiliser https://www.agentimpact.fr/)`);
      if (target.origin === origin) {
        const p = target.pathname + target.search;
        if (!links.has(p)) links.set(p, path);
      } else if (EXTERNAL_HOST_RE.test(target.hostname) && !EXTERNAL_IGNORE_RE.test(target.href)) {
        const key = target.href.split("#")[0];
        if (!externals.has(key)) externals.set(key, path);
      }
    }
  }

  // 8. statut des liens internes
  for (const [p, from] of links) {
    const res = await fetch(base + p, { redirect: "manual" });
    if (res.status !== 200) fail(from, `lien interne ${p} → statut ${res.status}`);
  }
  console.log(`liens internes vérifiés : ${links.size}`);

  if (flag("--external")) {
    for (const [href, from] of externals) {
      try {
        const res = await fetch(href, { redirect: "manual" });
        if (res.status !== 200) fail(from, `lien ${href} → statut ${res.status}`);
      } catch (e) {
        fail(from, `lien ${href} injoignable (${e.message})`);
      }
    }
    console.log(`liens *.agentimpact.fr vérifiés en ligne : ${externals.size}`);
  } else if (externals.size) {
    console.log(`liens *.agentimpact.fr non vérifiés (ajouter --external) : ${externals.size}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
