import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { tenantIdFromAccessToken } from "./session-claims";

const Tenant = "5b1f6f0e-7d0a-4c1e-9d55-3a8f2c9e1b44";

function token(claims: unknown): string {
  const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "RS256" })}.${encode(claims)}.signature`;
}

describe("tenantIdFromAccessToken", () => {
  it("reads the tenant_id claim", () => {
    assert.equal(tenantIdFromAccessToken(token({ sub: "u1", tenant_id: Tenant })), Tenant);
  });

  it("lowercases it", () => {
    assert.equal(tenantIdFromAccessToken(token({ tenant_id: Tenant.toUpperCase() })), Tenant);
  });

  it("has none when the claim is missing, not a guid, all zeros or not text", () => {
    for (const claims of [{}, { tenant_id: "acme" }, { tenant_id: "00000000-0000-0000-0000-000000000000" }, { tenant_id: 7 }, { tenant: Tenant }, null, [], "x"]) {
      assert.equal(tenantIdFromAccessToken(token(claims)), null, JSON.stringify(claims));
    }
  });

  it("has none for something that is not a token", () => {
    for (const bad of ["", "abc", "a.b", "a.b.c.d", "a..c", `x.${Buffer.from("not json").toString("base64url")}.z`]) {
      assert.equal(tenantIdFromAccessToken(bad), null, bad);
    }
  });
});
