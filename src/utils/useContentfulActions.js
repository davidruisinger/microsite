import { useStaticQuery, graphql } from "gatsby";

const parseActions = (actions) =>
  actions.reduce((acc, curr) => {
    if (!acc[curr.actionId]) {
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

const useContentfulActions = (langKey) => {
  const {
    allContentfulAction: { group: actionsGroups },
  } = useStaticQuery(graphql`
    query {
      allContentfulAction(
        sort: { fields: order, order: ASC }
        filter: { type: { ne: "personal" }, category: { eq: "A" } }
      ) {
        group(field: node_locale) {
          fieldValue
          nodes {
            actionId
            node_locale
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
    }
  `);

  let actionsList = [];
  const actionsByLocale = actionsGroups.reduce((acc, curr) => {
    if (!acc[curr.fieldValue]) {
      if (curr.fieldValue === langKey) {
        actionsList = curr.nodes;
      }
      const actions = parseActions(curr.nodes);

      acc[curr.fieldValue] = actions;
    }
    return acc;
  }, {});

  return {
    list: actionsList,
    object: actionsByLocale[langKey],
  };
};

export default useContentfulActions;
