/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // enables static export for Amplify
  images: {
    unoptimized: true, // required for static hosting (no server-side optimization)
    domains: ["images.unsplash.com"], // allow Unsplash images
  },
};

module.exports = nextConfig;
