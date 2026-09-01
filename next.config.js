/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
      },
      {
        protocol: 'https',
        hostname: 'blob.vercel.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        three: {
          test: /[\\/]node_modules[\\/](three)[\\/]/,
          name: 'three',
          priority: 30,
          reuseExistingChunk: true,
          enforce: true,
        },
        fiber: {
          test: /[\\/]node_modules[\\/](@react-three)[\\/]/,
          name: 'fiber',
          priority: 31,
          reuseExistingChunk: true,
          enforce: true,
        },
      };
    }
    return config;
  },
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'three'],
  },
};

module.exports = nextConfig;
