require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config = require("./src/utils/siteConfig");

// Antd Config
const path = require("path");
const fs = require("fs");

const lessToJs = require("less-vars-to-js");
const themeVariables = lessToJs(
  fs.readFileSync(
    path.join(__dirname, "./src/assets/less/ant-default-vars.less"),
    "utf8"
  )
);

// Contentful config
const contentfulConfig = {
  host: process.env.CF_APP_HOST_URL,
  spaceId: process.env.CF_APP_SPACE_ID,
  accessToken: process.env.CF_APP_ACCESS_TOKEN,
};

const contentfulConfigApp = {
  host: process.env.CF_BADGE_HOST_URL,
  spaceId: process.env.CF_BADGE_SPACE_ID,
  accessToken: process.env.CF_BADGE_ACCESS_TOKEN,
};

module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl,
    rssMetadata: {
      site_url: config.siteUrl,
      feed_url: `${config.siteUrl}/rss.xml`,
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${config.siteUrl}${config.siteLogo}`,
      author: config.author,
      copyright: config.copyright,
    },
  },
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "companies",
        fieldName: "lfcaBackend",
        url: process.env.GQL_API_URL,
        headers: {
          Authorization: `Bearer ${process.env.GQL_ADMIN_ACCESS_TOKEN}`,
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-less`,
      options: {
        lessOptions: {
          modifyVars: themeVariables,
          javascriptEnabled: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-antd",
      options: {
        style: true,
      },
    },
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: config.siteUrl,
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 3000,
              backgroundColor: "white",
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig,
    },
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfigApp,
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.siteTitle,
        short_name: config.shortTitle,
        description: config.siteDescription,
        start_url: "/",
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: "minimal-ui",
        icon: `static${config.favicon}`,
      },
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: config.themeColor,
      },
    },
  ],
};
