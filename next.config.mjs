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
      {
        protocol: "https",
        port: "",
        hostname: "vphdxociarqnaxj6.public.blob.vercel-storage.com",
      },
      {
        protocol: "http",
        port: "3000",
        hostname: "localhost",
      },
      {
        protocol: "https",
        port: "",
        hostname: "honeypotfinance.xyz",
      },
      {
        protocol: "https",
        port: "",
        hostname: "*.honeypotfinance.xyz",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: 'https://honeypotfinance.xyz/',
      },
    ]
  },
};

export default nextConfig;
