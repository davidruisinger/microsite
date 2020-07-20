import React from "react"
import config from "../../../../config"
import { Layout, Row, Col, List, Icon } from "antd"
import { Container } from "../Container"
import { StaticQuery, graphql } from "gatsby"
import CustomLink from "../../Helpers/CustomLink"
import "./styles.less"
const { Footer, Content } = Layout

const LinkList = ({ list }) => {
  return (
    <List
      dataSource={list}
      itemLayout="horizontal"
      renderItem={item => (
        <List.Item>
          <CustomLink location={item.location} linkType={item.linkType}>
            {item.text}
          </CustomLink>
        </List.Item>
      )}
    />
  )
}

class PageFooter extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query FooterQuery {
            allMarkdownRemark(
              filter: { fileAbsolutePath: { regex: "/settings/" } }
            ) {
              edges {
                node {
                  frontmatter {
                    impressum
                    twitter
                    linkedin
                    facebook
                    footer_items {
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
        render={({ allMarkdownRemark: { edges } }) => {
          const frontmatter = edges[0].node.frontmatter
          return (
            <Footer>
              <Content>
                <Container>
                  <Row style={{ textAlign: "center" }}>
                    <Col xs={24} md={{ span: 12, offset: 6 }}>
                      <div className="links">
                        <LinkList list={frontmatter.footer_items} />
                      </div>
                    </Col>
                  </Row>
                  <Row className="copyright" justify="center" type="flex">
                    <Col>{config.copyright}</Col>
                  </Row>
                </Container>
              </Content>
            </Footer>
          )
        }}
      />
    )
  }
}

export default PageFooter
