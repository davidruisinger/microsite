import React, { useState } from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { Layout, Menu, Drawer, Icon, List, Badge } from "antd";
import { TopBar, CustomLink } from "../../Elements";
import { defaultLangKey } from "../../../data/languages";
import { UnorderedListOutlined } from "@ant-design/icons";
import IconArrowDown from "../../../assets/icons/small-down.svg";
import "./styles.less";
import { useIsMobile } from "../../../utils/IsMobileProvider";
import { replaceVar, filterCompanies } from "../../../utils";

const { Header } = Layout;
const { SubMenu } = Menu;

const LeftMenu = (props) => (
  <div className="left-menu">
    <div className="logo">
      <CustomLink slug={"/"}>
        <img src={props.logo} alt="We take Climate Action" />
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

const PageHeader = ({ layout, langsMenu, langKey, data, activeCompany }) => {
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
  return (
    <Header className={"page-header"}>
      <TopBar />
      <div className="container">
        <nav className="menu-bar">
          <div className="menu-con">
            <LeftMenu langKey={langKey} logo={`/img/lfca_logo.svg`} />
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
              width={isMobile ? "280px" : "600px"}
              closable={false}
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
