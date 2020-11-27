import React from "react";
import { Row, Col, Icon, Menu } from "antd";
import { navigate, graphql, useStaticQuery } from "gatsby";
import { CustomLink } from "../../Elements";
import { getI18nPrefix } from "../../../utils/shared";
import { isBrowser, getPath } from "../../../utils";
import IconArrowDown from "../../../assets/icons/small-down.svg";
import "./styles.less";

const { SubMenu } = Menu;

const Footer = ({ langKey, navigation, languages }) => {
  const selectedMenu = navigation[langKey];
  const { elements } = selectedMenu;
  const elementsById = elements.reduce((acc, element) => {
    acc[element.menuId] = {
      ...element,
    };
    return acc;
  }, {});

  const activeItem = languages.find((lang) => lang.isoCode === langKey);
  const activeIcon = activeItem.icon && activeItem.icon.file.url;

  const switchLanguage = ({ key }) => {
    const navTo = getI18nPrefix(key);
    const currentPath = isBrowser() && getPath(window.location.pathname);
    navigate(`/${navTo}${currentPath}`);
  };

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
            <h5>Powered by</h5>

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
          <Col xs={24}>
            <div
              style={{
                display: "inline-block",
                margin: "12px",
                verticalAlign: "top",
              }}
            >
              ©LFCA Umweltschutz e.V. 2020
            </div>

            <Menu
              style={{ maxWidth: "200px", display: "inline-block" }}
              onClick={switchLanguage}
            >
              <SubMenu
                className="lang-submenu"
                key={"lang-switcher"}
                title={
                  <span className="submenu-title lang">
                    <img alt={langKey} src={activeIcon} />
                    {/* {activeItem.name} */}
                    <Icon component={IconArrowDown} />
                  </span>
                }
              >
                {languages.map((language) => {
                  return (
                    <Menu.Item key={language.isoCode}>
                      <img
                        style={{ marginRight: "10px" }}
                        alt={language.isoCode}
                        src={language.icon && language.icon.file.url}
                      />
                      {language.name}
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            </Menu>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

const DataWrapper = (props) => {
  const data = useStaticQuery(graphql`
    query {
      contentfulMetaData(name: { eq: "Main" }) {
        name
        languages {
          name
          isoCode
          icon {
            file {
              url
            }
          }
        }
      }
      allContentfulNavigation(filter: { menuId: { eq: "footer" } }) {
        group(field: node_locale) {
          fieldValue
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
    }
  `);
  const { group: intlNodes } = data.allContentfulNavigation;
  const navByLocale = intlNodes.reduce((acc, curr) => {
    if (!acc[curr.fieldValue]) {
      acc[curr.fieldValue] = curr.nodes[0];
    }
    return acc;
  }, {});

  const { languages } = data.contentfulMetaData;

  return <Footer languages={languages} navigation={navByLocale} {...props} />;
};

export default DataWrapper;
