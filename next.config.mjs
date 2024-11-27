/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";
const nextConfig = {
  reactStrictMode: false,
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
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        port: "",
        hostname: "vphdxociarqnaxj6.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        port: "",
        hostname: "upload.wikimedia.org",
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
  async redirects() {
    return isDev
      ? [
          {
            source: "/",
            destination: "/swap",
            permanent: false,
          },
        ]
      : [
          {
            source: "/",
            destination: "https://honeypotfinance.xyz/",
            permanent: false,
          },
          {
            source: "/launch",
            destination: "/meme-launchs",
            permanent: false,
          },
        ];
  },
};

export default nextConfig;
