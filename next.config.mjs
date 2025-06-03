/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ignorar pasta app para evitar conflitos
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  experimental: {
    appDir: false, // Desabilitar App Router
  },
};

export default nextConfig;
