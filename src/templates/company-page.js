import React, { Fragment } from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import config from "../utils/siteConfig";
import Layout from "../components/Layout/Layout";
import { Row, Col, Carousel, Card } from "antd";
import InfoBox from "../components/InfoBox";
import {
  ContentSection,
  SimpleHeader,
  SliderCard,
} from "../components/Elements";
import Header from "../components/Header";
import SEO from "../components/SEO";
import { useContentfulActions } from "../utils/hooks";

const CompanyPageTemplate = ({ data, location, pageContext }) => {
  const { footprint, url, name, logo, actions, aboutSections } = data.companies;
  const { allCompanies } = pageContext;
  const actionsContent = useContentfulActions();
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
            <InfoBox
              actionsContent={actionsContent.object}
              name={name}
              logo={logo}
              website={"x"}
              actions={actions}
            />
          </Col>
        </Row>
      </div>

      <div className="container-fluid color-primary-light">
        <div className="container">
          <Row>
            {aboutSections &&
              aboutSections.map((section, i) => (
                <ContentSection
                  orientation={i % 2 == 0 ? "left" : "right"}
                  image={section.image}
                  heading={section.heading}
                  text={section.text}
                />
              ))}
          </Row>
        </div>
      </div>

      <div className="container">
        <Row>
          <Col
            style={{ textAlign: "center" }}
            xs={24}
            md={{ span: 20, offset: 2 }}
          >
            <SimpleHeader
              title={
                "What every (digital) company should do to fight climate change"
              }
              subtitle={`We teamed up with climate experts and scientists to find out what
              we, as the digital industry can contribute in the fight against
              the climate crisis. Learn more about effective climate measures
              for digital companies.`}
            />
          </Col>
          <Col xs={24}>
            <Carousel
              slidesToShow={4}
              arrows={true}
              dots={false}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                  },
                },
              ]}
            >
              {actionsContent &&
                actionsContent.list.map((action, i) => (
                  <SliderCard
                    opacity={1 - 1 / (10 / (i + 1))}
                    title={action.title}
                  />
                ))}
            </Carousel>
          </Col>
        </Row>
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
        heading
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
