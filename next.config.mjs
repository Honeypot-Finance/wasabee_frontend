/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/swap',
      },
    ]
  },
};

export default nextConfig;
