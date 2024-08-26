/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/images/:imagename',
          destination: '/api/images/:imagename',
        },
      ];
    },
  };
  
  export default nextConfig;
  