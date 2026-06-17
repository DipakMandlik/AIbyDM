/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.BASE_PATH ?? '/AIByDM',
  experimental: {
    cpus: 1,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
