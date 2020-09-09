import React from "react";
import { graphql, Link } from "gatsby";
import Helmet from "react-helmet";
import config from "../utils/siteConfig";
import Layout from "../components/Layout/Layout";
import { Row, Col, List } from "antd";
import { PageTitle } from "../components/Elements";

import SEO from "../components/SEO";
import { useContentfulActions } from "../utils/hooks";
import { filterCompanies } from "../utils";

const Homepage = ({ data, location, pageContext }) => {
  const { slug } = pageContext;
  const pageTitle = `${config.siteTitle}`;
  const { nodes: allCompanies } = data.allCompanies;
  const filteredCompanies = allCompanies.filter(filterCompanies);
  // SEO config
  const postNode = {
    title: pageTitle,
    description: "We take Climate Action.",
    metaDescription: {
      internal: {
        content:
          "We encourage organizations to take climate action. By making their efforts transparent, we inspire others to follow!",
      },
    },
    heroImage: "",
  };
  return (
    <Layout metadata={data.site.siteMetadata} location={location}>
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
                dataSource={filteredCompanies}
                renderItem={(company) => (
                  <List.Item>
                    <Link to={`/e/${company.url}`}>
                      <div className="left-box">
                        <div className="img-wrapper">
                          <img src={company.logo} />
                        </div>
                      </div>
                      <div className="right-box">{company.name}</div>
                    </Link>
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
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
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
`;

export default Homepage;