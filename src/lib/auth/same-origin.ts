/**
 * True when a form POST came from a page of this site. A browser always sends Origin on a cross-site POST, so a POST whose Origin is a
 * different site is refused: another site cannot sign a visitor into an account of its choosing or sign them out. A POST with no Origin
 * at all is refused too, because every browser this site supports sends one on a form POST.
 */
export function cameFromThisSite(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  return origin === publicOrigin(request);
}

/**
 * The origin the visitor's browser used. Behind Vercel the request URL can carry the deployment's own host, so the forwarded host and
 * protocol, which Vercel sets, are preferred.
 */
export function publicOrigin(request: Request): string {
  const url = new URL(request.url);
  const host = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() || url.host;
  const proto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || url.protocol.replace(/:$/, "");
  return `${proto}://${host}`;
}
