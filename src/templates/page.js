import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import config from "../utils/siteConfig";
import Layout from "../components/Layout/Layout";
import PageBody from "../components/Layout/PageBody/";
import { PageTitle } from "../components/Elements";
import SEO from "../components/SEO";

const PageTemplate = ({ data, location, pageContext }) => {
  const { title, body } = data.contentfulPageLocal;
  const { slug } = pageContext;
  const postNode = data.contentfulPageLocal;

  return (
    <Layout metadata={data.site.siteMetadata} location={location}>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO pagePath={slug} postNode={postNode} pageSEO />
      <PageTitle title={title} />
      <div className="container-fluid color-white">
        <div className="container core">
          <PageBody body={body} />
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    contentfulPageLocal(id: { eq: $id }) {
      title
      metaDescription {
        internal {
          content
        }
      }
      body {
        childMarkdownRemark {
          html
          excerpt(pruneLength: 320)
        }
      }
    }
  }
`;

export default PageTemplate;
