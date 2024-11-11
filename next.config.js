/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['flagcdn.com'],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_EXCHANGE_RATE_API_KEY: process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY,
  },
  experimental: {
    esmExternals: 'loose',
  },
  transpilePackages: [
    '@radix-ui/react-select',
    '@radix-ui/react-dialog',
    'next-themes',
    'framer-motion'
  ]
}

module.exports = nextConfig
