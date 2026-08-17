import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow images from these domains (for any future CDN or external images)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.pexels.com',
      },
    ],
    // Optimization formats
    formats: ['image/avif', 'image/webp'],
  },
  // Strict mode for better error detection
  reactStrictMode: true,
};

export default nextConfig;
