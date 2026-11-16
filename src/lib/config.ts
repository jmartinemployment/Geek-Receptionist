/**
 * Geek-Receptionist portal -> GeekAPI only (sign-in at /api/v1/owner-auth/*, the owner's tenant at /api/v1/tenants/*). Never call
 * GeekRepository or GeekMcpGateway from here, and no other Geek service is used: Geek-Receptionist has its own login.
 */

/**
 * Reads an env var, treating empty and whitespace-only as absent. `??` only falls back on null or undefined, so a variable set to ""
 * would pass straight through and make every address built from it invalid.
 */
function envOrDefault(value: string | undefined, fallback: string): string {
  const trimmed = (value ?? "").trim();
  return (trimmed.length > 0 ? trimmed : fallback).replace(/\/$/, "");
}

export const apiConfig = {
  baseUrl: envOrDefault(process.env.GEEK_API_URL, "https://api.geekatyourspot.com"),
};

/**
 * GeekAPI's key for the calls a signed-out visitor needs (sign-in, refresh, sign-out). Server-only: it has no NEXT_PUBLIC_ prefix, so
 * Next.js never puts it in the page. Null when unset, and the caller refuses rather than calling GeekAPI without it.
 */
export function geekApiKey(): string | null {
  const key = (process.env.GEEK_BACKEND_API_KEY ?? "").trim();
  return key.length > 0 ? key : null;
}
