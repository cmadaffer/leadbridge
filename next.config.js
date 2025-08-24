/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ensures a Node server build for Render/Vercel
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' }
    ]
  }
};
module.exports = nextConfig;
