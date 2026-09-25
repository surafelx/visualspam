/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
  },
  // Serve the static roofing demo in public/roofing at /roofing.
  async rewrites() {
    return [{ source: '/roofing', destination: '/roofing/index.html' }]
  },
  // Keep links to the old site's routes working.
  async redirects() {
    return [
      { source: '/jan-14', destination: '/work/jan-14', permanent: true },
      { source: '/visuals', destination: '/#work', permanent: false },
      { source: '/live', destination: '/#live', permanent: false },
      { source: '/files', destination: '/#sound', permanent: false },
      { source: '/info', destination: '/#about', permanent: false },
      { source: '/notes/:path*', destination: '/', permanent: false },
    ]
  },
}

module.exports = nextConfig
