import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdnx.jumpseller.com",
      },
      {
        protocol: "https",
        hostname: "ishopmx.vtexassets.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "store.storeimages.cdn-apple.com",
      },
      {
        protocol: "https",
        hostname: "ishopmx.vtexassets.com",
      },
    ],
  },
};

export default nextConfig;
