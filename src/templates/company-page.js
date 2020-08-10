import React, { Fragment } from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import config from "../utils/siteConfig";
import Layout from "../components/Layout/Layout";
import { Row, Col, Card, Button } from "antd";
import InfoBox from "../components/InfoBox";
import { ContentSection, SimpleHeader } from "../components/Elements";
import Header from "../components/Header";
import CardsCarousel from "../components/CardsCarousel";
import SEO from "../components/SEO";
import { useContentfulActions } from "../utils/hooks";

const ActionLink = (props) => {
  return (
    <Card>
      <h5>{props.title}</h5>
      <p style={{ fontSize: "15px" }}>{props.description}</p>
      <a href={props.link}>
        <Button type="primary" ghost>
          {props.linkText}
        </Button>
      </a>
    </Card>
  );
};

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
          <Col
            style={{ textAlign: "center", padding: "30px 60px 15px" }}
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
        </Row>
      </div>

      <div className="container">
        <CardsCarousel actionsContent={actionsContent} />
      </div>

      <div className="container-fluid color-primary-light">
        <div className="container">
          <Row style={{ padding: "60px 0" }}>
            <Col xs={24} md={12} style={{ padding: "30px" }}>
              <h2>Do your part, take action and accelerate the transition. </h2>
              <p>
                The climate crisis affects all of us and we can all contribute
                in the fight against it. It’s not enough to point at politicians
                and businesses and wait for change. It’s on us to increase the
                pressure and actively push for change. We vote with our daily
                consumption choices, our political voices and our personal
                investments.
              </p>
              <p>
                Check out our tips for effective personal climate action and
                contribute in the fight against the climate crisis.
              </p>
            </Col>
            <Col xs={24} md={12} style={{ padding: "30px" }}>
              <ActionLink
                title={"Move your money to Green Investments"}
                description={`Many banks and insurances are still financing new coal and oil plants. Move your money into green investment vecicles like Sustainable ETF’s and switch to a green bank like Tomorrow or XY. `}
                link={"x"}
                linkText={"Invest green now"}
              />
              <ActionLink
                title={"Measure and reduce your personal footprint"}
                description={`Lead by example, inform yourself about climate change. Figure out what you can change in your personal life and talk to friends and family about the problem. Use our free calculator `}
                link={"x"}
                linkText={"Measure and compensate"}
              />
              <ActionLink
                title={"Raise your voice and engage in peaceful activism"}
                description={`Fridays for Future, Extinction Rebellion, .. So many great organizations helped to increase the pressure on politics and businesses. Join them and think about who you `}
                link={"x"}
                linkText={"Engage"}
              />
            </Col>
          </Row>
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
