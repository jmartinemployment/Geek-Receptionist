/**
 * The tenant a signed-in owner belongs to, read from the tenant_id claim of the access token, for choosing what to show. The portal
 * never trusts it for anything that matters: GeekAPI validates the token and takes the tenant from the claim itself on every call, and
 * the calendar routes of this app send the tenant that comes from here only because GeekAPI refuses a mismatch.
 */
export function tenantIdFromAccessToken(token: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 3 || !parts[1]) return null;

  let claims: unknown;
  try {
    claims = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (typeof claims !== "object" || claims === null) return null;

  const value = (claims as Record<string, unknown>)["tenant_id"];
  if (typeof value !== "string") return null;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value) && value !== "00000000-0000-0000-0000-000000000000"
    ? value.toLowerCase()
    : null;
}
