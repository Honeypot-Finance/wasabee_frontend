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
      {
        protocol: "https",
        port: "",
        hostname: "images.unsplash.com",
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
  transpilePackages: [
    "@usecapsule/web-sdk",
    "@usecapsule/react-sdk",
    // Add any other Capsule-related packages here
  ],
};

export default nextConfig;
