import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://cms.chillhop.com/**"), new URL("https://chill1.b-cdn.net/**")]
  }
};

export default nextConfig;
