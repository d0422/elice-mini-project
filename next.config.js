/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['cdn-api.elice.io'],
  },
};

module.exports = nextConfig;
