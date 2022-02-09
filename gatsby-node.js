const path = require(`path`);
const { getI18nPrefix } = require("./src/utils/shared");

// warnings in netlify deploy log
exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();
  const miniCssExtractPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === "MiniCssExtractPlugin"
  );
  if (miniCssExtractPlugin) {
    miniCssExtractPlugin.options.ignoreOrder = true;
  }
  actions.replaceWebpackConfig(config);
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
        lfcaBackend {
          qualifiedCompanies {
            company {
              id
              logoUrl
              name
              websiteUrl
              micrositeSlug
              aboutSections {
                heading
                imageUrl
                text
              }
            }
            completedCompanyActions {
              contentId
              description
              id
              requirements {
                contentId
                description
                id
                title
              }
              title
            }
            programId
            programName
          }
        }
      }
    `).then((result) => {
      const { languages } = result.data?.contentfulMetaData;
      const companies = result.data?.lfcaBackend?.qualifiedCompanies;

      console.log(`...building microsites for ${companies.length} companies`);
      if (!companies) throw new Error("No qualified companies found");

      // @TODO: if api is down, do no build! throw error

      // Create pages in different languages
      for (const language of languages) {
        const prefix = getI18nPrefix(language.isoCode);
        const urlFirstPart = !prefix ? "" : `/${prefix}`;

        companies.forEach((data) => {
          const { company } = data;
          if (!company) return;
          const slug = `${urlFirstPart}/e/${company.micrositeSlug}`;
          createPage({
            path: slug,
            component: path.resolve(`src/templates/company-page.js`),
            context: {
              id: company.id,
              slug: slug,
              data,
            },
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
