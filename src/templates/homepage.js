import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import config from "../utils/siteConfig";
import Layout from "../components/Layout/Layout";
import CustomLink from "../components/Elements/CustomLink";
import { Row, Col, List } from "antd";
import { PageTitle } from "../components/Elements";

import SEO from "../components/SEO";

const Homepage = ({ data, location, pageContext }) => {
  const { slug } = pageContext;
  const pageTitle = `${config.siteTitle}`;
  const allCompanies = data.lfcaBackend?.qualifiedCompanies;

  const postNode = {
    title: pageTitle,
    description: "We take Climate Action ",
    metaDescription: {
      internal: {
        content:
          "We encourage organizations to take climate action. By making their efforts transparent, we inspire others to follow! ",
      },
    },
    heroImage: "",
  };

  return (
    <Layout location={location}>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <PageTitle title={"About this initiative"} />
      <div className="container">
        <Row>
          <Col xs={24} md={{ span: 20, offset: 2 }}>
            <p style={{ textAlign: "center" }}>
              The following companies take part and take climate action.
            </p>
            <div className="listing-wrapper">
              <List
                className="company-listing"
                bordered={false}
                dataSource={allCompanies}
                renderItem={(qualifiedCompany) => (
                  <List.Item>
                    <CustomLink
                      slug={`e/${qualifiedCompany?.company.micrositeSlug}`}
                    >
                      <div className="left-box">
                        <div className="img-wrapper">
                          <img
                            alt="logo"
                            src={qualifiedCompany?.company.logoUrl}
                          />
                        </div>
                      </div>
                      <div className="right-box">
                        {qualifiedCompany?.company.name}
                      </div>
                    </CustomLink>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
      </div>
      <SEO pagePath={slug} postNode={postNode} pageSEO />
    </Layout>
  );
};

export const query = graphql`
  query {
    lfcaBackend {
      qualifiedCompanies {
        company {
          id
          logoUrl
          name
          websiteUrl
          micrositeSlug
        }
      }
    }
  }
`;

export default Homepage;
