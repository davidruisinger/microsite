import React, { useState } from "react";
import { graphql, useStaticQuery, navigate } from "gatsby";
import { Layout, Menu, Drawer, List, Badge, Button } from "antd";
import { TopBar, CustomLink } from "../../Elements";
import Icon, { UnorderedListOutlined } from "@ant-design/icons";
import IconArrowDown from "../../../assets/icons/small-down.svg";
import "./styles.less";
import { useIsMobile } from "../../../utils/IsMobileProvider";
import { replaceVars } from "../../../utils";

const { Header } = Layout;
const { SubMenu } = Menu;

const LeftMenu = (props) => (
  <div className="left-menu">
    <div className="logo">
      <CustomLink slug={"/"}>
        <div className="logo-wrapper" />
      </CustomLink>
    </div>
  </div>
);

const RightMenu = ({
  items,
  activePath,
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
                  {replaceVars(item.title, { company: activeCompany })}
                </CustomLink>
              </Menu.Item>
            )
          )
        )}

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

const PageHeader = ({ langKey, data, navigation, activeCompany }) => {
  const { nodes: allCompanies } = data.allCompanies;
  const selectedMenu = navigation[langKey];

  const { elements } = selectedMenu;
  const menuItems = elements;
  const { languages } = data.contentfulMetaData;

  const [open, setOpen] = useState(false);
  const [openCompanies, setOpenCompanies] = useState(false);
  const isMobile = useIsMobile();
  const hamburgerClass = `hamburger hamburger--spin ${open && "is-active"}`;

  return (
    <Header className={"page-header"}>
      <TopBar />
      <div className="container">
        <nav className="menu-bar">
          <div className="menu-con">
            <LeftMenu langKey={langKey} />

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
                    <CustomLink slug={`e/${company.url}`}>
                      <div className="left-box">
                        <div className="img-wrapper">
                          <img alt="logo" src={company.logo} />
                        </div>
                      </div>
                      <div className="right-box">{company.name}</div>
                    </CustomLink>
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
        group(field: node_locale) {
          fieldValue
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
    }
  `);
  const { group: intlNodes } = data.allContentfulNavigation;

  const navByLocale = intlNodes.reduce((acc, curr) => {
    if (!acc[curr.fieldValue]) {
      acc[curr.fieldValue] = curr.nodes[0];
    }
    return acc;
  }, {});
  return <PageHeader navigation={navByLocale} data={data} {...props} />;
};

export default DataWrapper;
