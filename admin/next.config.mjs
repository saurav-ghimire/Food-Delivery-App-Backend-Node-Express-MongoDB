/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'food-delivery-app-backend-node-express.onrender.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
