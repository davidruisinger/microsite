require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config = require("./src/utils/siteConfig");
const languages = require("./src/data/languages");

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

// Firebase config
const firebaseConfig = {
  type: "service_account",
  project_id: "leaders-for-climate-action",
  private_key_id: process.env.FB_PRIVATE_KEY_ID,
  private_key: process.env.FB_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email:
    "firebase-adminsdk-l0a9d@leaders-for-climate-action.iam.gserviceaccount.com",
  client_id: "114062250503267573038",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l0a9d%40leaders-for-climate-action.iam.gserviceaccount.com",
};

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
    languages,
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
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: config.googleTagManagerID,
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
      },
    },
    {
      resolve: `gatsby-source-firebase`,
      options: {
        credential: firebaseConfig,
        databaseURL: process.env.FB_DB_URL,
        types: [
          {
            type: "Companies",
            path: "public_companies",
            query: (ref) => ref,
            map: (node) => {
              // overwrite actions as list
              const actionsList =
                node.actions &&
                Object.keys(node.actions).map((key, i) => {
                  const { requirements, ...rest } = node.actions[key];
                  const reqsList =
                    requirements &&
                    Object.keys(requirements).map((reqId) => {
                      const { isDone, ...rest } = requirements[reqId];
                      return {
                        uid: reqId,
                        ...rest,
                        isDone: !!isDone,
                      };
                    });
                  return {
                    ...rest,
                    requirements: reqsList,
                    uid: key,
                  };
                });

              node.actions = actionsList;

              // convert aboutSections into array
              const aboutSections =
                node.aboutSections &&
                Object.keys(node.aboutSections).map((sectionKey) => {
                  return {
                    uid: sectionKey,
                    ...node.aboutSections[sectionKey],
                  };
                });

              node.aboutSections = aboutSections;

              return node;
            },
          },
        ],
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
        javascriptEnabled: true,
        modifyVars: themeVariables,
      },
    },
    {
      resolve: "gatsby-plugin-antd",
      options: {
        style: true,
      },
    },
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyForNull: "any",
        langKeyDefault: languages.defaultLangKey,
        useLangKeyLayout: false,
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
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: config.themeColor,
      },
    },
    "gatsby-plugin-netlify",
  ],
};
