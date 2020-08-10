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

// Contentful Config
let contentfulConfig;
let contentfulConfigApp;

try {
  contentfulConfig = require("./.contentful");
  contentfulConfigApp = require("./.contentful-app");
} catch (e) {
  // on production get the variables through netlify
  contentfulConfig = {
    production: {
      spaceId: process.env.SPACE_ID,
      accessToken: process.env.ACCESS_TOKEN,
    },
  };
  contentfulConfigApp = {
    production: {
      spaceId: process.env.SPACE_ID_APP,
      accessToken: process.env.ACCESS_TOKEN_APP,
    },
  };
} finally {
  const { spaceId, accessToken } = contentfulConfig.production;
  if (!spaceId || !accessToken) {
    throw new Error(
      "Contentful space ID and access token need to be provided."
    );
  }
  // for webapp space
  const {
    spaceId: spaceIdApp,
    accessToken: aTApp,
  } = contentfulConfigApp.production;
  if (!spaceIdApp || !aTApp) {
    throw new Error(
      "Contentful web space ID and access token need to be provided."
    );
  }
}

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
                    Object.keys(requirements).map((key) => {
                      const { isDone, ...rest } = requirements[key];
                      return {
                        uid: key,
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
      options:
        process.env.NODE_ENV === "development"
          ? contentfulConfig.development
          : contentfulConfig.production,
    },
    {
      resolve: "gatsby-source-contentful",
      options:
        process.env.NODE_ENV === "development"
          ? contentfulConfigApp.development
          : contentfulConfigApp.production,
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
      resolve: "gatsby-plugin-feed",
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata;
          ret.allMarkdownRemark = ref.query.allMarkdownRemark;
          ret.generator = "GatsbyJS GCN Starter";
          return ret;
        },
        query: `
    {
      site {
        siteMetadata {
          rssMetadata {
            site_url
            feed_url
            title
            description
            image_url
            author
            copyright
          }
        }
      }
    }
  `,
        feeds: [
          {
            serialize(ctx) {
              const rssMetadata = ctx.query.site.siteMetadata.rssMetadata;
              return ctx.query.allContentfulPostLocal.edges.map((edge) => ({
                date: edge.node.publishDate,
                title: edge.node.title,
                description: edge.node.body.childMarkdownRemark.excerpt,

                url: rssMetadata.site_url + "/" + edge.node.slug,
                guid: rssMetadata.site_url + "/" + edge.node.slug,
                custom_elements: [
                  {
                    "content:encoded": edge.node.body.childMarkdownRemark.html,
                  },
                ],
              }));
            },
            query: `
              {
            allContentfulPostLocal(limit: 1000, sort: {fields: [publishDate], order: DESC}) {
               edges {
                 node {
                   title
                   slug
                   publishDate(formatString: "MMMM DD, YYYY")
                   body {
                     childMarkdownRemark {
                       html
                       excerpt(pruneLength: 80)
                     }
                   }
                 }
               }
             }
           }
      `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: config.themeColor,
      },
    },
    "gatsby-plugin-netlify",
  ],
};
