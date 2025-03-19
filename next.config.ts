import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ai-public.creatie.ai",
      },
    ],
  },
};

export default nextConfig;
