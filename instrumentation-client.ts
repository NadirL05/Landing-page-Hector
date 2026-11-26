// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { publicSentryDsn } from "./lib/public-sentry";
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: publicSentryDsn,
  tunnel: process.env.NEXT_PUBLIC_WORKERS_EXPORT === "1" ? "/monitoring" : undefined,
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
