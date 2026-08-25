import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://9fc4b176ce126b6f4ccfc67fe887dd01@o4510546774327296.ingest.de.sentry.io/4511971817947216",
  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,
});
