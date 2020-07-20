import React, { Component, Fragment } from "react"
import "../../../assets/less/styles.less"
import PageHeader from "../PageHeader"
import PageFooter from "../PageFooter"
import { Layout } from "antd"

// enable smooth scroll for all kinds of anchor links
if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]')
}

class PageLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false
    }
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar() {
    this.setState({ isActive: !this.state.isActive })
  }

  render() {
    return (
      <Fragment>
        <Layout className="app">
          <PageHeader />
          {this.props.children}
          <PageFooter />
        </Layout>
      </Fragment>
    )
  }
}

export default PageLayout
