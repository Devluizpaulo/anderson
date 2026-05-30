import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Habilita o modo estrito do React
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
