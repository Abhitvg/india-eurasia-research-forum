/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Note: Google Drive is used as a remote pattern here because the CMS outputs Google Drive URLs.
    // Ensure content coming from the CMS is trusted to avoid SSRF vectors.
    remotePatterns: [
      { protocol: 'https', hostname: 'drive.google.com' }
    ]
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'indiaeurasia.org' }],
        destination: 'https://www.indiaeurasia.org/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
