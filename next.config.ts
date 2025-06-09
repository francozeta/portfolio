import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ahmytayvpbqnwimemzqh.supabase.co",
      },
    ]
  }
};

export default nextConfig;
