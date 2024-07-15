/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/swap',
      //   permanent: false,
      // },
    ];
  },
};

export default nextConfig;
