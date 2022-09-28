const withLess = require('next-with-less')
const path = require('path')

const lessVariablesFile = path.resolve(__dirname, './styles/variables.less')
const lessMixinsFile = path.resolve(__dirname, './styles/mixins.less')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    localeDetection: false,
    locales: ['de', 'en', 'tr'],
  },
  images: {
    domains: ['images.ctfassets.net', 'res.cloudinary.com'],
  },
  lessLoaderOptions: {
    additionalData: (content) =>
      `${content}\n\n@import '${lessVariablesFile}';\n\n@import '${lessMixinsFile}';`,
    lessOptions: {
      javascriptEnabled: true,
    },
  },
  reactStrictMode: true,
  // swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      issuer: /\.[jt]sx?$/,
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = withLess(nextConfig)
