/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true,
  productionBrowserSourceMaps: false,

  // Type safety
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["images.unsplash.com", "images.pexels.com"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers for security
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ]
  },

  // Redirects for old URLs (if needed in future)
  async redirects() {
    return []
  },

  // Rewrites for API routes (if needed)
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
    }
  },
}

export default nextConfig
