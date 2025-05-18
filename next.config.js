/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.clerk.dev'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'swr': require.resolve('swr'),
      'swr/infinite': require.resolve('swr/infinite')
    }
    return config
  }
}

module.exports = nextConfig