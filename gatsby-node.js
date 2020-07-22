const path = require(`path`);
const languages = require("./src/data/languages");

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
        allCompanies(filter: { companyPledgeStatus: { gt: 2 } }) {
          nodes {
            id

            url
            companyPledgeStatus
            name
            logo
          }
        }
      }
    `).then((result) => {
      // Create custom pages for companies
      const companies = result.data.allCompanies.nodes;

      companies.forEach((company) => {
        createPage({
          path: `/e/${company.url}`,
          component: path.resolve(`src/templates/company-page.js`),
          context: { id: company.id },
        });
      });

      // Create simple pages like Imprint etc.
      const pages = result.data.allContentfulPageGlobal.edges;
      pages.map(({ node }) => {
        const locale = node.node_locale;
        // for default language use the root domain
        const pagePath =
          locale === languages.defaultLangKey
            ? `/${node.slug}/`
            : `/${locale}/${node.slug}/`;
        const pageId = node.localized.id;
        createPage({
          path: pagePath,
          component: path.resolve(`./src/templates/page.js`),
          context: {
            id: pageId,
            slug: node.slug,
          },
        });
      });
      resolve();
    });
  });

  return Promise.all([loadPages]);
};
