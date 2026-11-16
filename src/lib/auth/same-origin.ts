/**
 * The origin the visitor's browser used, from the request's headers. Behind Vercel the request can carry the deployment's own host, so
 * the forwarded host and protocol, which Vercel sets, are preferred; on this machine there are none and the Host header is used.
 *
 * Cross-site requests are not checked here: every form is a Server Action, and Next.js refuses a Server Action whose Origin is not this
 * site's host before it runs.
 */
export function publicOrigin(headers: Headers): string {
  const host = headers.get("x-forwarded-host")?.split(",")[0]?.trim() || headers.get("host") || "localhost:3010";
  const forwarded = headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const proto = forwarded || (/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host) ? "http" : "https");
  return `${proto}://${host}`;
}
