// const { env } = require("./src/env/server.mjs");
const removeImports = require('next-remove-imports')();

/** @type {import('next').NextConfig} */
const nextConfig = removeImports({
  reactStrictMode: true,
  images: {
    domains: [
      'i.scdn.co', // Spotify Album Art
      'pbs.twimg.com', // Twitter Profile Picture
      'cdn.sanity.io',
    ],
  },
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
});

export default nextConfig;
