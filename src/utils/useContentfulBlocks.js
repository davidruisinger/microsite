import { useStaticQuery, graphql } from "gatsby";

const useContentfulBlocks = (langCode) => {
  const {
    allContentfulBlock: { group: blockGroups },
  } = useStaticQuery(graphql`
    query {
      allContentfulBlock {
        group(field: node_locale) {
          nodes {
            key
            value {
              value
              childMarkdownRemark {
                html
              }
            }
          }
          fieldValue
        }
      }
    }
  `);
  const blocksByLocale = blockGroups.reduce((acc, curr) => {
    if (!acc[curr.fieldValue]) {
      const block = curr.nodes.reduce((acc, curr) => {
        if (!acc[curr.key]) {
          acc[curr.key] = (curr.value || {}).value;
          acc[`${curr.key}.html`] = (
            (curr.value || {}).childMarkdownRemark || {}
          ).html;
        }
        return acc;
      }, {});
      acc[curr.fieldValue] = block;
    }
    return acc;
  }, {});
  const currentLocale = blocksByLocale[langCode] || {};
  return currentLocale;
};

export default useContentfulBlocks;
