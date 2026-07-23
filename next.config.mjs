/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/destinations',
        destination: '/book',
        permanent: true,
      },
      {
        source: '/destinations/:path*',
        destination: '/book',
        permanent: true,
      },
      {
        source: '/journeys',
        destination: '/book',
        permanent: true,
      },
      {
        source: '/journeys/:path*',
        destination: '/book',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
    ],
  },
};

export default nextConfig;
