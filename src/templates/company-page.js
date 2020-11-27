import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import config from "../utils/siteConfig";
import Layout from "../components/Layout/Layout";
import { Row, Col } from "antd";
import { Element } from "react-scroll";
import InfoBox from "../components/InfoBox";
import { ContentSection, SimpleHeader } from "../components/Elements";
import Header from "../components/Header";
import PersonalAction from "../components/PersonalAction";
import CardsCarousel from "../components/CardsCarousel";

import SEO from "../components/SEO";
import useContentfulActions from "../utils/useContentfulActions";
import useContentfulBlocks from "../utils/useContentfulBlocks";
import useIntl from "../utils/useIntl";
import { replaceVars } from "../utils";

const CompanyPageTemplate = ({ data, location, pageContext }) => {
  const {
    name,
    logo,
    publicActions: actions,
    aboutSections,
    website,
  } = data.companies;
  const { slug } = pageContext;
  const pageTitle = `${name} - ${config.siteTitle}`;
  const langCode = useIntl().isoCode;
  const actionsContent = useContentfulActions(langCode);
  const blocks = useContentfulBlocks(langCode);

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
    <Layout location={location} activeCompany={name}>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <SEO pagePath={slug} postNode={postNode} pageSEO />

      <Element className="container" name="info-box">
        <Row>
          <Col style={{ alignSelf: "flex-start" }} xs={24} md={12} lg={12}>
            <Header
              title={replaceVars(blocks["company.header.title"], {
                name: name,
              })}
              subtitle={blocks["company.header.subtitle"]}
            />
          </Col>
          <Col
            style={{ alignSelf: "flex-end" }}
            xs={24}
            md={{ span: 11, offset: 1 }}
            lg={{ span: 9, offset: 3 }}
          >
            <InfoBox
              actionsContent={actionsContent.object}
              name={name}
              logo={logo}
              website={website}
              actions={actions}
            />
          </Col>
        </Row>
      </Element>

      <Element className="container-fluid color-primary-light" name="about">
        <div className="container no-padding">
          <Row>
            {aboutSections ? (
              aboutSections.map((section, i) => (
                <ContentSection
                  key={`content-section-${i}`}
                  orientation={i % 2 === 0 ? "left" : "right"}
                  image={section.image}
                  heading={section.heading}
                  text={section.text}
                  supertext={i === 0 ? `Climate Action at ${name}` : null}
                />
              ))
            ) : (
              <div
                style={{
                  padding: "60px 0",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <h3 style={{ textAlign: "center" }}>
                  Please add content to the about section.
                </h3>
              </div>
            )}
          </Row>
        </div>
      </Element>

      <Element className="container" name="initiative">
        <Row>
          <Col className="simple-header" xs={24} md={{ span: 20, offset: 2 }}>
            <SimpleHeader
              title={blocks["program.title"]}
              subtitle={blocks["program.subtitle"]}
            />
          </Col>
        </Row>
      </Element>

      <div className="container">
        <CardsCarousel actionsContent={actionsContent} />
      </div>

      <Element name="personal" className="container-fluid color-primary-light">
        <div className="container">
          <PersonalAction
            title={blocks["act.title"]}
            description={
              <div
                dangerouslySetInnerHTML={{ __html: blocks["act.content.html"] }}
              />
            }
          />
        </div>
      </Element>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    companies(id: { eq: $id }) {
      id
      url
      companyPledgeStatus
      name
      website
      companyPledge
      logo
      aboutSections {
        image
        text
        heading
      }
      publicActions {
        isComplete
        uid
        actionId
        requirements {
          isDone
          uid
        }
      }
    }
  }
`;

export default CompanyPageTemplate;
