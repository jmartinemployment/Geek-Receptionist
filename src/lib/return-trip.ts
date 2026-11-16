import { NextResponse } from "next/server";
import { publicOrigin } from "@/lib/auth/same-origin";

const CODE = /^[a-z0-9_]{1,64}$/;

/**
 * Where a return trip from Google or PayPal ends: a 303 to a page of this site with only codes in its address, so the one-time code or
 * order PayPal and Google put in the address bar is gone before anything is drawn. A code GeekAPI sends that is not a plain code becomes
 * "api_unexpected" rather than being carried into the address.
 */
export function sendTo(request: Request, path: string, params: Record<string, string> = {}): NextResponse {
  const url = new URL(path, publicOrigin(request.headers));
  for (const [name, value] of Object.entries(params)) url.searchParams.set(name, CODE.test(value) ? value : "api_unexpected");
  return NextResponse.redirect(url, 303);
}

/** GeekAPI's failure code from a tenant call's body, or one made from its status. */
export function codeOf(body: { code?: unknown } | null, status: number): string {
  return typeof body?.code === "string" ? body.code : `http_${status}`;
}
