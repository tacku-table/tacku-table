// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // Next에게 styled-component도 처리해달라고 옵션을 설정해줌
  },
};

module.exports = nextConfig;

// next.config.js
const withVideos = require("next-videos");

module.exports = withVideos();

module.exports = withSentryConfig(
  module.exports,
  { silent: true },
  { hideSourcemaps: true }
);

const moduleExports = {
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
};

module.exports = withSentryConfig(moduleExports);

// const moduleExports = {
//   sentry: {
//     hideSourceMaps: true,
//   },
// };

//  module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);

// module.exports = withSentryConfig(moduleExports, {
//   dryRun: process.env.VERCEL_ENV !== "production",
// });
