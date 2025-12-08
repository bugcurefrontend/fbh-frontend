/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // enables static export for Amplify
  images: {
    unoptimized: true, // required for static hosting (no server-side optimization)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // allow all image paths
      },
    ],
  },
};

module.exports = nextConfig;
