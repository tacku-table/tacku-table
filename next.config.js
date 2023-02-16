/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // Next에게 styled-component도 처리해달라고 옵션을 설정해줌
  },
};

module.exports = nextConfig;

// next.config.js
const withVideos = require("next-videos");

module.exports = withVideos();
