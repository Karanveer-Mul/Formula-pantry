import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  }   
};

export default nextConfig;
