import { cache } from "react";
import { cookies, headers } from "next/headers";
import { ACCESS_COOKIE, AUTH_ERROR_HEADER } from "@/lib/auth/cookies";

/**
 * The owner's access token for this request, or null when there is none. Read-only, safe in Server Components and Route Handlers: the
 * refresh happens once, in proxy.ts, before either runs, because only there can the replacement cookies be written, and refreshing in
 * two places would spend one refresh token twice and end the sign-in.
 */
export const getAccessToken = cache(async (): Promise<string | null> => {
  const jar = await cookies();
  return jar.get(ACCESS_COOKIE)?.value ?? null;
});

/** Why proxy.ts could not refresh the sign-in (GeekAPI unreachable or refusing), or null when it did not try or succeeded. */
export const getAuthError = cache(async (): Promise<string | null> => {
  const all = await headers();
  return all.get(AUTH_ERROR_HEADER);
});
