import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.9",
    "rare-yaks-own.loca.lt",
    "*.loca.lt",
    "localhost:3000"
  ]
};

export default nextConfig;
