/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    reactCompiler: false,
  },
  compiler: {
    styledComponents: true,
  },

  // IMPORTANT FIX: enable custom elements
  react: {
    useBuiltins: true
  }
};

module.exports = nextConfig;
