import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://cms.chillhop.com/**")]
  }
};

export default nextConfig;
