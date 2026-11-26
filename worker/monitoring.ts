import { publicSentryDsn } from "../lib/public-sentry";

const dsn = new URL(publicSentryDsn);
const ingest = `https://${dsn.host}/api${dsn.pathname}/envelope/?hsts=0`;

export default {
  async fetch(request: Request, env: { ASSETS: { fetch: (req: Request) => Promise<Response> } }): Promise<Response> {
    const path = new URL(request.url).pathname;
    if ((path !== "/monitoring" && path !== "/monitoring/") || request.method !== "POST") {
      return env.ASSETS.fetch(request);
    }

    // The destination is fixed to this site's public Sentry project.
    const headers = new Headers();
    for (const name of ["content-type", "content-encoding"]) {
      const value = request.headers.get(name);
      if (value) headers.set(name, value);
    }
    const upstream = await fetch(ingest, {
      method: "POST",
      headers,
      body: request.body,
      redirect: "manual",
    });
    const responseHeaders = new Headers({ "cache-control": "no-store" });
    for (const name of ["content-type", "retry-after", "x-sentry-rate-limits"]) {
      const value = upstream.headers.get(name);
      if (value) responseHeaders.set(name, value);
    }
    return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
  },
};
