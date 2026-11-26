import { readdir, readFile, writeFile } from "node:fs/promises";

// Export does not apply Next.js response headers. Reuse the build's resolved
// policies and fail the build when a new rule needs an explicit translation.
const routes = JSON.parse(await readFile(".next/routes-manifest.json", "utf8"));
const supported = new Map([["/:path*", "/*"], ["/", "/"]]);
const rules = routes.headers.map(({source, headers}) => {
  const pattern = supported.get(source);
  if (!pattern) throw new Error(`Unsupported header pattern: ${source}`);
  return [pattern, ...headers.map(({key, value}) => `  ${key}: ${value}`)].join("\n");
});
if (!routes.headers.some(rule => rule.headers.some(header => header.key === "Content-Security-Policy"))) {
  throw new Error("Missing Content-Security-Policy from Next.js build");
}
rules.push("/opengraph-image\n  Content-Type: image/png", "/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable");
await writeFile("out/_headers", rules.join("\n\n") + "\n");

// Next.js canonicalizes trailing slashes permanently, including query strings.
const pages = (await readdir("out")).filter(name => name.endsWith(".html") && !["index.html", "404.html", "_not-found.html"].includes(name));
const redirects = pages.map(name => {
  const slug = name.slice(0, -5);
  return `/${slug}/ /${slug} 308`;
});
await writeFile("out/_redirects", redirects.join("\n") + "\n");
await writeFile("out/.assetsignore", "**/*.map\n");
