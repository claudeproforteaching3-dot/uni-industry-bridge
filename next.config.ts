import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/uni-industry-bridge',
  assetPrefix: '/uni-industry-bridge',
};

export default nextConfig;
