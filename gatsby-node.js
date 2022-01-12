const path = require(`path`);
const { getI18nPrefix } = require("./src/utils/shared");

// warnings in netlify deploy log
exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === "build-javascript") {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === "MiniCssExtractPlugin"
    );
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }
    actions.replaceWebpackConfig(config);
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const loadPages = new Promise((resolve, reject) => {
    graphql(`
      {
        contentfulMetaData(name: { eq: "Main" }) {
          languages {
            name
            isoCode
            countryCode
            icon {
              file {
                url
              }
            }
          }
        }
        allContentfulPageGlobal {
          edges {
            node {
              slug
              node_locale
              localized {
                id
              }
            }
          }
        }
        allCompanies(
          filter: {
            achievements: { hasBadgeQualification: { eq: true } }
            hidePage: { ne: true }
          }
        ) {
          nodes {
            id
            url
            achievements {
              hasBadgeQualification
            }
            name
            logo
          }
        }
      }
    `).then((result) => {
      const { languages } = result.data.contentfulMetaData;
      const companies = result.data.allCompanies.nodes;

      // Create pages in different languages
      for (const language of languages) {
        const prefix = getI18nPrefix(language.isoCode);
        const urlFirstPart = !prefix ? "" : `/${prefix}`;

        companies.forEach((company) => {
          if (!company) return;
          const slug = `${urlFirstPart}/e/${company.url}`;
          createPage({
            path: slug,
            component: path.resolve(`src/templates/company-page.js`),
            context: { id: company.id, slug: slug },
          });
        });

        // Create homepage
        const slug = `/${getI18nPrefix(language.isoCode)}`;
        createPage({
          path: slug,
          component: path.resolve(`src/templates/homepage.js`),
          context: { slug: slug },
        });

        // Create simple pages like Imprint etc.
        const pages = result.data.allContentfulPageGlobal.edges;
        pages.map(({ node }) => {
          const slug = `${urlFirstPart}/${node.slug}`;
          const pageId = node.localized && node.localized.id;
          if (!pageId) return;
          createPage({
            path: slug,
            component: path.resolve(`./src/templates/page.js`),
            context: {
              id: pageId,
              slug: slug,
            },
          });
        });
      }

      resolve();
    });
  });

  return Promise.all([loadPages]);
};
