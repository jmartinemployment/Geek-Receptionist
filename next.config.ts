import type { NextConfig } from "next";

// Every page of this app that matters is behind sign-in and none is ever indexable. The Google approval comes back to a page with the
// one-time code in its address, so no page sends that address on as a referrer, and no page can be framed.
const HEADERS = [
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: HEADERS }];
  },
};

export default nextConfig;
