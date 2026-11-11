import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // nodemailer must run in Node, not be bundled for the edge
  serverExternalPackages: ["nodemailer"],
};

export default nextConfig;
