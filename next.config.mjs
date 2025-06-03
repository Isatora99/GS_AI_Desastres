/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Forçar uso do App Router
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
