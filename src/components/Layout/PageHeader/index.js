import React, { useState } from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { Layout, Menu, Drawer, List, Badge } from "antd";
import { TopBar, CustomLink } from "../../Elements";
import { defaultLangKey } from "../../../data/languages";
import { UnorderedListOutlined } from "@ant-design/icons";
import IconArrowDown from "../../../assets/icons/small-down.svg";
import "./styles.less";
import { useIsMobile } from "../../../utils/IsMobileProvider";
import { replaceVar, filterCompanies } from "../../../utils";
import logoMobile from "../../../assets/logo/logo_mobile.svg";
import logoDesktop from "../../../assets/logo/logo.svg";

import Icon from "@ant-design/icons";

const { Header } = Layout;
const { SubMenu } = Menu;

const LeftMenu = (props) => (
  <div className="left-menu">
    <div className="logo">
      <CustomLink slug={"/"}>
        <Icon component={props.logo} />
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
      {/* <SubMenu
        className="lang-submenu"
        key={"lang-switcher"}
        title={
          <span className="submenu-title lang">
            {langKey.substring(0, 2)}
            <Icon component={inverse ? IconArrowDownInverse : IconArrowDown} />
          </span>
        }
      >
        {langsMenu.map((lang) => (
          <Menu.Item key={lang.langKey}>
            <Link
              to={lang.langKey === defaultLangKey ? "/" : lang.link}
              key={lang.langKey}
              className="lang-item"
            >
              {lang.langKey.substring(0, 2)}
            </Link>
          </Menu.Item>
        ))}
      </SubMenu> */}
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

const PageHeader = ({ langsMenu, langKey, data, activeCompany }) => {
  // select the right locale
  const { nodes: allCompanies } = data.allCompanies;
  const { nodes: intlNodes } = data.allContentfulNavigation;
  const selectedMenu = intlNodes.find((node) => node.node_locale === langKey);
  const { elements } = selectedMenu;
  const menuItems = elements;
  // state for hamburger menu
  const [open, setOpen] = useState(false);
  const [openCompanies, setOpenCompanies] = useState(false);
  const isMobile = useIsMobile();

  const hamburgerClass = `hamburger hamburger--spin ${open && "is-active"}`;
  const filteredCompanies = allCompanies.filter(filterCompanies);
  // const pageLogo = isMobile ? logoMobile : logoDesktop;
  // console.log(pageLogo);
  return (
    <Header className={"page-header"}>
      {/* TODO: test on mobile, but staging!!! */}
      <Icon component={isMobile ? logoMobile : logoDesktop} />

      <TopBar />
      <div className="container">
        <nav className="menu-bar">
          <div className="menu-con">
            {/* <img src={pageLogo} /> */}

            {/* {isMobile ? (
              <img
                key={Date.now()}
                src="/img/logo_mobile.svg"
                alt="We take Climate Action - Mobile"
              />
            ) : (
              <img
                key={Date.now()}
                src="/img/logo.svg"
                alt="We take Climate Action"
              />
            )} */}
            <LeftMenu
              langKey={langKey}
              logo={isMobile ? logoMobile : logoDesktop}
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
              langsMenu={langsMenu}
              items={menuItems}
              openCompanies={setOpenCompanies}
              companiesCount={filteredCompanies.length}
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
                langsMenu={langsMenu}
                items={menuItems}
                openCompanies={setOpenCompanies}
                companiesCount={filteredCompanies.length}
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
      allCompanies(filter: { companyPledgeStatus: { gt: 2 } }) {
        nodes {
          id
          url
          companyPledgeStatus
          name
          logo
          actions {
            uid
          }
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
