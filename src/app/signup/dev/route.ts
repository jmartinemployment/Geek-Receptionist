import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { writeSignup } from "@/lib/signup/state";

/**
 * Development only: starts a signup as if the person and the business were already created, so a screen after eligibility can be
 * looked at on a machine that has no robot check and no GeekAPI. It calls nothing and makes nothing; production answers 404.
 */
export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") notFound();

  await writeSignup({ tenantId: "00000000-0000-4000-8000-000000000000", contactEmail: "owner@example.test" });
  return NextResponse.redirect(new URL("/signup", request.url));
}
