import React, { useState } from "react";
import { graphql, useStaticQuery, Link, navigate } from "gatsby";
import { Layout, Menu, Drawer, List, Badge, Button } from "antd";
import { TopBar, CustomLink } from "../../Elements";
import { UnorderedListOutlined } from "@ant-design/icons";
import IconArrowDown from "../../../assets/icons/small-down.svg";
import "./styles.less";
import { useIsMobile } from "../../../utils/IsMobileProvider";
import { replaceVar } from "../../../utils";
import { useCookies } from "react-cookie";
import { getFirebaseI18nPrefix } from "../../../utils/shared";
import { setLangCookies } from "../../../utils";

import Icon from "@ant-design/icons";

const { Header } = Layout;
const { SubMenu } = Menu;

const LeftMenu = (props) => (
  <div className="left-menu">
    <div className="logo">
      <CustomLink slug={"/"}>
        {/* {props.logo} */}
        <div className="logo-wrapper" />
      </CustomLink>
    </div>
  </div>
);

const RightMenu = ({
  items,
  activePath,
  langKey,
  langsMenu,
  openCompanies,
  companiesCount,
  activeCompany,
}) => {
  const isMobile = useIsMobile();

  const [, setCookie] = useCookies();
  const activeItem = langsMenu.find((lang) => lang.isoCode === langKey);
  const activeIcon = activeItem.icon && activeItem.icon.file.url;

  const switchLanguage = (langKey) => {
    setLangCookies(setCookie, langKey);
    const navTo = getFirebaseI18nPrefix(langKey) || "/";
    navigate(navTo);
  };

  return (
    <Menu
      className="right-menu"
      mode={!isMobile ? "horizontal" : "inline"}
      selectedKeys={[activePath]}
    >
      {items &&
        items.map((item) =>
          item.elements ? (
            <SubMenu
              key={item.id}
              title={
                <span className="submenu-title">
                  {item.title}
                  <Icon component={IconArrowDown} />
                </span>
              }
            >
              {item.elements.map((subItem) => (
                <Menu.Item key={`sub-${subItem.id}`}>
                  <CustomLink url={subItem.url} slug={subItem.slug}>
                    {subItem.title}
                  </CustomLink>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            activeCompany && (
              <Menu.Item key={item.id}>
                <CustomLink url={item.url} slug={item.slug}>
                  {replaceVar(item.title, activeCompany)}
                </CustomLink>
              </Menu.Item>
            )
          )
        )}

      <SubMenu
        className="lang-submenu"
        key={"lang-switcher"}
        title={
          <span className="submenu-title lang">
            <Button size="small" type="link">
              <img alt={langKey} src={activeIcon} />

              <Icon component={IconArrowDown} />
            </Button>
          </span>
        }
      >
        {langsMenu.map((language) => {
          const langKey = language.isoCode;
          return (
            <Menu.Item key={language.isoCode}>
              <Button
                onClick={() => switchLanguage(langKey)}
                type="link"
                key={langKey}
                className="lang-item"
              >
                <img
                  style={{ marginRight: "10px" }}
                  alt={langKey}
                  src={language.icon && language.icon.file.url}
                />
                {language.name}
              </Button>
            </Menu.Item>
          );
        })}
      </SubMenu>

      <Menu.Item
        className="simple-menu-item"
        key="open-companies"
        onClick={() => openCompanies(true)}
      >
        <Badge
          className="company-count"
          offset={[13, -3]}
          count={companiesCount}
        >
          <UnorderedListOutlined />
          All Companies
        </Badge>
      </Menu.Item>
    </Menu>
  );
};

const PageHeader = ({ langKey, data, activeCompany }) => {
  // select the right locale
  const { nodes: allCompanies } = data.allCompanies;
  const { nodes: intlNodes } = data.allContentfulNavigation;
  const selectedMenu = intlNodes.find((node) => node.node_locale === langKey);
  const { elements } = selectedMenu;
  const menuItems = elements;
  const { languages } = data.contentfulMetaData;
  // state for hamburger menu
  const [open, setOpen] = useState(false);
  const [openCompanies, setOpenCompanies] = useState(false);
  const isMobile = useIsMobile();
  const hamburgerClass = `hamburger hamburger--spin ${open && "is-active"}`;
  // const pageLogo = isMobile ? logoMobile : logoDesktop;

  return (
    <Header className={"page-header"}>
      <TopBar />
      <div className="container">
        <nav className="menu-bar">
          <div className="menu-con">
            <LeftMenu
              langKey={langKey}
              // logo={isMobile ? <LogoMobile /> : <LogoDesktop />}
            />

            <button
              className={hamburgerClass}
              type="button"
              onClick={() => setOpen(true)}
            >
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
            <RightMenu
              langKey={langKey}
              langsMenu={languages}
              items={menuItems}
              openCompanies={setOpenCompanies}
              companiesCount={allCompanies.length}
              activeCompany={activeCompany}
            />
            <Drawer
              className="nav-drawer"
              placement="left"
              width={isMobile ? "280px" : "400px"}
              closable={false}
              onClose={() => setOpen(false)}
              visible={open}
            >
              <h2>Navigation</h2>
              <RightMenu
                langKey={langKey}
                langsMenu={languages}
                items={menuItems}
                openCompanies={setOpenCompanies}
                companiesCount={allCompanies.length}
                activeCompany={activeCompany}
              />
            </Drawer>
            <Drawer
              className="drawer-xl"
              placement="right"
              width={isMobile ? "100%" : "600px"}
              closable={true}
              onClose={() => setOpenCompanies(false)}
              visible={openCompanies}
            >
              <div className="title">Other Companies that lead by example</div>
              <List
                className="company-listing"
                bordered={false}
                dataSource={allCompanies}
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
            </Drawer>
          </div>
        </nav>
      </div>
    </Header>
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
      allCompanies(filter: { hasBadgeQualification: { eq: true } }) {
        nodes {
          id
          url
          hasBadgeQualification
          companyPledgeStatus
          name
          logo
        }
      }
      allContentfulNavigation(filter: { menuId: { eq: "mainMenu" } }) {
        nodes {
          id
          node_locale
          elements {
            ... on ContentfulNavigation {
              id
              title
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
  return <PageHeader data={data} {...props} />;
};

export default DataWrapper;
