import type { NextConfig } from "next";

// GitHub Pages: siden ligger i undermappen /byggmesteren og lages som vanlige filer.
// Lokalt (npm run dev) ligger den på rot, så localhost:3130 virker uten undermappe.
const basePath = process.env.NODE_ENV === "production" ? "/byggmesteren" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
