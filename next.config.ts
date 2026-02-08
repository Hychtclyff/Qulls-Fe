import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 1. Unsplash (Cukup satu saja)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      // 2. Dicoding / DigitalOcean Spaces (Format diperbaiki)
      {
        protocol: "https",
        hostname: "dicoding-web-img.sgp1.cdn.digitaloceanspaces.com",
        port: "",
        pathname: "/**", // Mengizinkan semua path di domain ini
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        port: "",
        pathname: "/**", // Mengizinkan semua path di domain ini
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "4hb5g34gc9.ufs.sh",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
