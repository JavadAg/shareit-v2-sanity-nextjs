/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "cdn.sanity.io",
      "res.cloudinary.com"
    ]
  }
}

module.exports = nextConfig
