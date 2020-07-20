import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { Location } from "@reach/router"
import { Layout, Menu, Drawer, Icon, Button } from "antd"
import { Container } from "../Container"
import CustomLink from "../../Helpers/CustomLink"
import TopBar from "../../TopBar"
import "./styles.less"
import { isMobile } from "../../../utils"

const { Header } = Layout
const { SubMenu } = Menu
const TOPBAR_CONTENT = {
  text: "Werde aktiver Klimaschützer. Wir helfen dir dabei!",
  mobile_text: "Werde Klimaschützer!",
  button: {
    location: "/",
    text: "Act now",
    linkType: "internal"
  }
}

class LeftMenu extends React.Component {
  render() {
    const myLink = typeof window !== "undefined" && window.location.pathname
    return (
      <div className="logo">
        <CustomLink location={myLink}>
          <img src={this.props.logo} alt="leaders-for-climate-action" />
        </CustomLink>
      </div>
    )
  }
}

class RightMenu extends React.Component {
  render() {
    return (
      <Menu
        className="right-menu"
        mode={!isMobile() ? "horizontal" : "inline"}
        selectedKeys={[this.props.activePath]}
      >
        {this.props.items &&
          this.props.items.map(item => {
            if (item.linkType === "submenu") {
              return (
                <SubMenu
                  key={item.location}
                  title={
                    <span className="submenu-title">
                      {item.text}
                      <Icon type="down" />
                    </span>
                  }
                >
                  {item.sub_menu_items.map(subItem => (
                    <Menu.Item key={`sub-${subItem.location}`}>
                      <CustomLink
                        location={subItem.location}
                        linkType={subItem.linkType}
                      >
                        {subItem.text}
                      </CustomLink>
                    </Menu.Item>
                  ))}
                </SubMenu>
              )
            } else {
              const myLink =
                typeof window !== "undefined" &&
                `${window.location.pathname}${item.location}`
              return (
                <Menu.Item key={myLink}>
                  <CustomLink location={myLink} linkType={item.linkType}>
                    {item.text}
                  </CustomLink>
                </Menu.Item>
              )
            }
          })}
        <Menu.Item key="share">
          <CustomLink
            location={`${typeof window !== "undefined" &&
              window.location.pathname}/#share`}
            linkType={"internal"}
          >
            <Button type="primary" size="large" ghost>
              Seite teilen
            </Button>
          </CustomLink>
        </Menu.Item>
      </Menu>
    )
  }
}

class PageHeader extends React.Component {
  state = {
    visible: false
  }

  showDrawer = () => {
    this.setState({ visible: true })
  }

  onClose = () => {
    this.setState({ visible: false })
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query SearchIndexQuery {
            allMarkdownRemark(
              filter: { fileAbsolutePath: { regex: "/settings/" } }
            ) {
              edges {
                node {
                  frontmatter {
                    menu_items {
                      text
                      linkType
                      location
                    }
                  }
                }
              }
            }
          }
        `}
        render={({ allMarkdownRemark: { edges } }) => (
          <Location>
            {({ navigate, location }) => {
              const menuItems = edges[0].node.frontmatter.menu_items
              const hamburgerClass = `hamburger hamburger--spin ${this.state
                .visible && "is-active"}`
              const isCampaignPage =
                typeof window !== "undefined" &&
                window.location.pathname.indexOf("/e/") > -1
              return (
                <Header className="page-header">
                  <TopBar content={TOPBAR_CONTENT} />
                  <Container>
                    <nav className="menu-bar">
                      <div className="menu-con">
                        <div className="left-menu">
                          <LeftMenu
                            logo={
                              isMobile()
                                ? "/img/logo_mobile.png"
                                : "/img/logo_blue.png"
                            }
                          />
                        </div>
                        <button
                          className={hamburgerClass}
                          type="button"
                          onClick={this.showDrawer}
                        >
                          <span className="hamburger-box">
                            <span className="hamburger-inner" />
                          </span>
                        </button>
                        {isCampaignPage && <RightMenu items={menuItems} />}

                        <Drawer
                          className="nav-drawer"
                          placement="left"
                          width={isMobile() ? "280px" : "400px"}
                          closable={false}
                          onClose={this.onClose}
                          visible={this.state.visible}
                        >
                          <h2>Navigation</h2>
                          <RightMenu items={menuItems} />
                        </Drawer>
                      </div>
                    </nav>
                  </Container>
                </Header>
              )
            }}
          </Location>
        )}
      />
    )
  }
}

export default PageHeader
