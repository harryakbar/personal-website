/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Compress responses
  compress: true,

  // Image optimization
  images: {
    // Serve modern formats (WebP/AVIF) for better LCP
    formats: ["image/avif", "image/webp"],
    // Reasonable device sizes to avoid oversized images
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Cache static assets aggressively to improve repeat-visit LCP
  async headers() {
    return [
      {
        source: "/favicon/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/assets/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};
