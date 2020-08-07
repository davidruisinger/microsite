import React from "react";
import { Row, Col, Icon } from "antd";
import { graphql, useStaticQuery } from "gatsby";
import { CustomLink } from "../../Elements";
import "./styles.less";

const Footer = ({ langKey, data }) => {
  // select the right locale
  const { nodes: intlNodes } = data.allContentfulNavigation;
  const selectedMenu = intlNodes.find((node) => node.node_locale === langKey);
  const { elements } = selectedMenu;
  const elementsById = elements.reduce((acc, element) => {
    acc[element.menuId] = {
      ...element,
    };
    return acc;
  }, {});
  return (
    <footer className="page-footer">
      <div className="container core">
        <Row type="flex">
          <Col xs={24} md={6} className="footer-col">
            <h5>{elementsById.footerColumn1.title}</h5>
            <ul>
              {elementsById.footerColumn1.elements.map((element) => {
                return (
                  <li key={element.id}>
                    <CustomLink url={element.url} slug={element.slug}>
                      {element.title}
                    </CustomLink>
                  </li>
                );
              })}
            </ul>
          </Col>
          <Col xs={24} md={6} className="footer-col">
            <h5>{elementsById.footerColumn2.title}</h5>
            <ul>
              {elementsById.footerColumn2.elements.map((element) => {
                return (
                  <li key={element.id}>
                    <CustomLink url={element.url} slug={element.slug}>
                      {element.title}
                    </CustomLink>
                  </li>
                );
              })}
            </ul>
          </Col>
          <Col xs={24} md={7} className="footer-col">
            <h5>{elementsById.footerColumn3.title}</h5>
            <ul>
              {elementsById.footerColumn3.elements.map((element) => {
                return (
                  <li key={element.id}>
                    <CustomLink url={element.url} slug={element.slug}>
                      {element.title}
                    </CustomLink>
                  </li>
                );
              })}
            </ul>
          </Col>
          <Col xs={24} md={5} className="footer-col">
            <h5>Social</h5>
            <a
              className="social-link"
              href="https://www.linkedin.com/company/leaders-for-climate-action/"
            >
              <Icon type="linkedin" />
            </a>
            <a className="social-link" href="https://twitter.com/Leaders4CA">
              <Icon type="twitter" />
            </a>
            <h5>Other</h5>

            <div style={{ marginTop: "20px" }}>
              <a
                href="https://www.contentful.com/"
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                <img
                  src="https://images.ctfassets.net/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg"
                  style={{ maxWidth: "100px", width: "100%" }}
                  alt="Powered by Contentful"
                />
              </a>
            </div>
          </Col>
        </Row>
        <Row style={{ textAlign: "center", margin: "50px 0 0" }}>
          <Col xs={24}>©LFCA Umweltschutz e.V. 2020</Col>
        </Row>
      </div>
    </footer>
  );
};

const DataWrapper = (props) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulNavigation(filter: { menuId: { eq: "footer" } }) {
        nodes {
          node_locale
          elements {
            ... on ContentfulNavigation {
              id
              title
              menuId
              elements {
                ... on ContentfulNavigationElement {
                  id
                  slug
                  url
                  title
                }
              }
            }
            ... on ContentfulNavigationElement {
              id
              slug
              url
              title
            }
          }
        }
      }
    }
  `);
  return <Footer data={data} {...props} />;
};

export default DataWrapper;
