import { useStaticQuery, graphql } from "gatsby";

export const useContentfulActions = () => {
  const {
    allContentfulAction: { nodes: actionsContent },
  } = useStaticQuery(graphql`
    query {
      allContentfulAction(
        sort: { fields: order, order: ASC }
        filter: { category: { eq: "A" } }
      ) {
        nodes {
          actionId
          description {
            childMarkdownRemark {
              html
            }
          }
          about {
            childMarkdownRemark {
              html
            }
          }
          order
          category
          badge {
            file {
              url
            }
          }
          createdAt
          shortDescription
          explanation {
            json
          }
          icon {
            file {
              url
            }
          }
          title
          updatedAt
          requirements {
            title
            description {
              childMarkdownRemark {
                html
              }
            }
            reqId
            optional
            values {
              title
              valueId
              hint {
                hint
              }
              unit
              type
            }
          }
        }
      }
    }
  `);
  const asObject = actionsContent.reduce((acc, curr) => {
    if (!acc[curr.actionId]) {
      // requirements as object
      const { requirements, ...rest } = curr;
      const reqsAsObject = requirements.reduce((acc, curr) => {
        if (!acc[curr.reqId]) {
          acc[curr.reqId] = curr;
        }
        return acc;
      }, {});
      acc[curr.actionId] = {
        ...rest,
        requirements: reqsAsObject,
      };
    }
    return acc;
  }, {});
  return {
    list: actionsContent,
    object: asObject,
  };
};
