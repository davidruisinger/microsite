const path = require(`path`);
const languages = require("./src/data/languages");

// @TODO: change implementation
const filterCompanies = (company) => {
  const actionIds = [
    "greenDigital",
    "renewableEnergy",
    "sustainableBanking",
    "flightPolicy",
    "sustainablePensionFund",
    "companyPledge",
    "completeClimateNeutrality",
    "veggyFood",
    "responsibleSupplychain",
    "greenBusinessModel",
    "officeReductionChampion",
    "supportClimateDemos",
    "offsetPrivateEmployeeFootprint",
  ];
  const filteredActions = company.actions.filter(
    (action) => actionIds.indexOf(action.uid) > -1 && action.isCompleted
  );

  return filteredActions.length > 3;
};

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
            actions {
              uid
              isCompleted
            }
          }
        }
      }
    `).then((result) => {
      // Create custom pages for companies
      const companies = result.data.allCompanies.nodes;
      const filteredCompanies = companies.filter(filterCompanies);

      filteredCompanies.forEach((company) => {
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
