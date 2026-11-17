import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Demoen er oppdiktet og skal ikke vises i søk. På en ekte side: allow: "/".
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
