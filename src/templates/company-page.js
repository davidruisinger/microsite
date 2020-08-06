import React, { Fragment } from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import config from "../utils/siteConfig";
import Layout from "../components/Layout/Layout";
import { Row, Col } from "antd";
import InfoBox from "../components/InfoBox";
import Header from "../components/Header";
import PageBody from "../components/Layout/PageBody";
import { PageTitle } from "../components/Elements";
import SEO from "../components/SEO";

const CompanyPageTemplate = ({ data, location, pageContext }) => {
  const { footprint, url, name, logo, actions, aboutSections } = data.companies;
  const { allCompanies } = pageContext;
  // const postNode = data.contentfulPageLocal;
  return (
    <Layout data={data} location={location} activeCompany={name}>
      <Helmet>
        <title>{`${name} - ${config.siteTitle}`}</title>
      </Helmet>
      {/* <SEO pagePath={slug} postNode={postNode} pageSEO /> */}

      <div className="container">
        <Row>
          <Col xs={24} md={12}>
            <Header
              title={`Find out how ${name} reduces their carbon emissions`}
              subtitle={`We encourage organizations to take climate action. By making their efforts transparent, we inspire others to follow! `}
            />
          </Col>
          <Col
            style={{ alignSelf: "flex-end" }}
            xs={24}
            md={{ span: 9, offset: 3 }}
          >
            <InfoBox name={name} logo={logo} website={"x"} actions={actions} />
          </Col>
        </Row>
      </div>

      <div className="container-fluid color-primary-light">
        <div className="container">
          <Row>
            {aboutSections &&
              aboutSections.map((section) => (
                <Fragment>
                  <Col xs={24} md={12}>
                    <img width="100%" src={section.image} />
                  </Col>
                  <Col xs={24} md={12}>
                    {section.text}
                  </Col>
                </Fragment>
              ))}
          </Row>
        </div>
      </div>

      {/* <PageTitle
        title={name}
        subtitle={{ childMarkdownRemark: { html: "" } }}
      />
      <div className="container core">
        {name}
      </div> */}
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
    companies(id: { eq: $id }) {
      id
      footprint
      url
      companyPledgeStatus
      name
      companyPledge
      logo
      aboutSections {
        image
        text
      }
      actions {
        isCompleted
        totalImpact
        uid
        requirements {
          isDone
          uid
        }
      }
    }
  }
`;

export default CompanyPageTemplate;
