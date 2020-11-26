const path = require(`path`);
const config = require("./src/utils/siteConfig");

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
        allCompanies(filter: { hasBadgeQualification: { eq: true } }) {
          nodes {
            id
            url
            companyPledgeStatus
            hasBadgeQualification
            name
            logo
          }
        }
      }
    `).then((result) => {
      // Create custom pages for companies
      const companies = result.data.allCompanies.nodes;

      companies.forEach((company) => {
        const slug = `/e/${company.url}`;
        createPage({
          path: slug,
          component: path.resolve(`src/templates/company-page.js`),
          context: { id: company.id, slug: slug },
        });
      });

      // Create homepage
      createPage({
        path: `/`,
        component: path.resolve(`src/templates/homepage.js`),
        context: { slug: `/` },
      });

      // Create simple pages like Imprint etc.
      const pages = result.data.allContentfulPageGlobal.edges;
      pages.map(({ node }) => {
        const locale = node.node_locale;
        // for default language use the root domain
        const pagePath =
          locale === config.defaultLangKey
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
