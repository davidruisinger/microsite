import React, { Fragment } from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import config from "../utils/siteConfig";
import Layout from "../components/Layout/Layout";
import { Row, Col, Card, Button } from "antd";
import InfoBox from "../components/InfoBox";
import { ContentSection, SimpleHeader } from "../components/Elements";
import Header from "../components/Header";
import PersonalAction from "../components/PersonalAction";
import CardsCarousel from "../components/CardsCarousel";
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
          <Col xs={24} md={12} lg={12}>
            <Header
              title={`Find out how ${name} reduces their carbon emissions`}
              subtitle={`We encourage organizations to take climate action. By making their efforts transparent, we inspire others to follow! `}
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
              website={"x"}
              actions={actions}
            />
          </Col>
        </Row>
      </div>

      <div className="container-fluid color-primary-light">
        <div
          className="container"
          style={{
            padding: "20px 0",
          }}
        >
          <Row>
            {aboutSections ? (
              aboutSections.map((section, i) => (
                <ContentSection
                  key={`content-section-${i}`}
                  orientation={i % 2 == 0 ? "left" : "right"}
                  image={section.image}
                  heading={section.heading}
                  text={section.text}
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
      </div>

      <div className="container">
        <Row>
          <Col className="simple-header" xs={24} md={{ span: 20, offset: 2 }}>
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
        </Row>
      </div>

      <div className="container">
        <CardsCarousel actionsContent={actionsContent} />
      </div>

      <div className="container-fluid color-primary-light">
        <div className="container">
          <PersonalAction
            title={`Do your part, take action and accelerate the transition.`}
            description={
              <div>
                <p>
                  The climate crisis affects all of us and we can all contribute
                  in the fight against it. It’s not enough to point at
                  politicians and businesses and wait for change. It’s on us to
                  increase the pressure and actively push for change. We vote
                  with our daily consumption choices, our political voices and
                  our personal investments.
                </p>
                <p>
                  Check out our tips for effective personal climate action and
                  contribute in the fight against the climate crisis.
                </p>
              </div>
            }
          />
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
    companies(id: { eq: $id }) {
      id
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
