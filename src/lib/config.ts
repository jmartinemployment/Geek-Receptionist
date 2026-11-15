/**
 * Geek-Receptionist portal -> GeekOAuth (sign-in) -> GeekAPI (api/v1/tenants/*). Never call GeekRepository or GeekMcpGateway from here.
 */

/**
 * Reads an env var, treating empty and whitespace-only as absent. `??` only falls back on null or undefined, so a variable set to ""
 * would pass straight through and make every address built from it invalid.
 */
function envOrDefault(value: string | undefined, fallback: string): string {
  const trimmed = (value ?? "").trim();
  return (trimmed.length > 0 ? trimmed : fallback).replace(/\/$/, "");
}

const authUrl = envOrDefault(process.env.NEXT_PUBLIC_AUTH_URL, "https://auth.geekatyourspot.com");
// appUrl feeds redirectUri, so a wrong value is a redirect_uri mismatch at GeekOAuth rather than a visible error. When it is absent,
// prefer the host Vercel reports over the localhost default.
const vercelProductionUrl = (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "").trim();
const appUrl = envOrDefault(
  process.env.NEXT_PUBLIC_APP_URL,
  vercelProductionUrl.length > 0 ? `https://${vercelProductionUrl}` : "http://localhost:3010",
);

export const authConfig = {
  authUrl,
  authorizeUrl: `${authUrl}/connect/authorize`,
  tokenUrl: `${authUrl}/connect/token`,
  // GeekOAuth registers one public client per app; this app is "geek-receptionist".
  clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID?.trim() || "geek-receptionist",
  redirectUri: `${appUrl}/auth/callback`,
  postLogoutRedirectUri: `${appUrl}/signed-out`,
  // No custom scope: GeekAPI takes the tenant from the tenant_id claim on the owner's login, not from a scope.
  scope: "openid profile email offline_access",
  appUrl,
};

export const apiConfig = {
  baseUrl: envOrDefault(process.env.NEXT_PUBLIC_GEEK_API_URL, "https://api.geekatyourspot.com"),
};
