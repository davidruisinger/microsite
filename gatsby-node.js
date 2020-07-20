const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

// create the slugs
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// create the pages
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            fields {
              slug
            }
            excerpt(pruneLength: 300)
            id
            frontmatter {
              title
              tags
              templateKey
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
      allCompanies {
        edges {
          node {
            id
            name
            url
            companyPledge
            companyPledgeStatus
            logo
            bgImageUrl
            bgVideoUrl
            hideFootprint
            verifiedBy
            about
            footprint
            website
          }
        }
      }
    }
  `).then(async (result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    // get companies
    const companiesRaw = result.data.allCompanies.edges
    const companies = companiesRaw.map((company) => {
      // make sure that the footprint does not
      // find its way through into the client
      // if not allowed
      if (company.node.hideFootprint) {
        company.node.footprint = -1
      }
      return company.node
    })
    const companiesFiltered = companies.filter(
      (company) => company.companyPledgeStatus > 2
    )

    // Post pages
    const postsAndPages = result.data.allMarkdownRemark.edges
    postsAndPages.forEach((edge) => {
      const id = edge.node.id
      const templateKey = edge.node.frontmatter.templateKey

      if (templateKey === "settings") {
        //  do nothing
      } else if (templateKey === "home-page") {
        createPage({
          path: edge.node.fields.slug,
          tags: edge.node.frontmatter.tags,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
          ),
          // additional data can be passed via context
          context: {
            id,
            templateKey,
            companiesFiltered,
          },
        })
      } else if (templateKey === "company-page") {
        // Dynamic company pages
        companies.forEach((company) => {
          if (company.companyPledgeStatus > 2) {
            createPage({
              path: `/e/${company.url}`,
              component: path.resolve(`src/templates/company-page.js`),
              context: { company, id },
            })
          }
        })
      } else if (templateKey === "article-page") {
        // create blog pages
        const slugParts = edge.node.fields.slug.split("/")
        const slug = slugParts[slugParts.length - 2] || edge.node.fields.slug
        createPage({
          path: slug,
          tags: edge.node.frontmatter.tags,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
          ),
          // additional data can be passed via context
          context: {
            id,
            templateKey,
          },
        })
      } else {
        // create all other pages
        createPage({
          path: edge.node.fields.slug,
          tags: edge.node.frontmatter.tags,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
          ),
          // additional data can be passed via context
          context: {
            id,
            templateKey,
          },
        })
      }
    })
  })
}
