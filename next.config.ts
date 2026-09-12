import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Subpath removed for custom domain (rupp.com)
  basePath: '',
  assetPrefix: '',
};

export default nextConfig;
