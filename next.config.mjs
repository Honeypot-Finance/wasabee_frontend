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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
