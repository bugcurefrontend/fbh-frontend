/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // required for static hosting (no server-side optimization)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // allow all image paths
      },
      {
        protocol: "https",
        hostname: "api.fbh.dev.heartfulness.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.heartfulness.org",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
