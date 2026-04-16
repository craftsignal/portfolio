import type { NextConfig } from "next";

/**
 * Custom domain at repo root (e.g. https://tians.space): leave unset.
 * Default GitHub Pages URL (e.g. https://craftsignal.github.io/portfolio/):
 *   NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
 */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(basePath
    ? { basePath, assetPrefix: `${basePath}/` }
    : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
  transpilePackages: ["three"],
};

export default nextConfig;
