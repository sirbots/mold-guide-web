/** @type {import('next').NextConfig} */
const nextConfig = {
  // Added when I went through next-auth setup. May be unnecessary now.
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
  },
};

module.exports = nextConfig;
