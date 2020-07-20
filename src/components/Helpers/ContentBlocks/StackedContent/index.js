import React from "react"
import "./styles.less"
import { Col, Row, Typography, Button, List } from "antd"
import CustomLink from "../../CustomLink"
import { isMobile } from "../../../../utils"
const { Title, Paragraph } = Typography

const COMP_LOGOS = [
  { img: "/img/dh_logo.png" },
  { img: "/img/flix_logo.png" },
  { img: "/img/ecosia_logo.png" },
  { img: "/img/gyg_logo.png" },
  { img: "/img/earlybird_logo.png" },
  { img: "/img/soundcloud_logo.png" },
  { img: "/img/raisin_logo.png" },
  { img: "/img/celonis_logo.png" },
  { img: "/img/tier_logo.png" },
  { img: "/img/many_more.png" }
]

class StackedContent extends React.Component {
  render() {
    const { contentBlocks, title, text } = this.props
    return (
      <div className="stacked-content">
        <Row type="flex" justify="end">
          <Col xs={24} md={14}>
            <Row>
              <Col xs={24} className="heading">
                <div className="section-heading">
                  <p>Wer steckt hinter "act now"?</p>
                  <Title level={2}>
                    Wir sind Unternehmerinnen und Unternehmer aus der
                    Digitalbranche, die ein Umdenken fordern
                  </Title>
                </div>

                <p>
                  Ende 2019 gründete eine Gruppe von Digitalunternehmern aus
                  Berlin die non-profit Organisation "Leaders for Climate Action
                  e.V.". Seit der Gründung arbeitet das Team daran die
                  Digitalindustrie zu einem Vorreiter in Sachen Klimaschutz zu
                  machen. Mittlerweile sind über 300 Unternehmerinnen und
                  Unternehmer Teil des Netzwerkes und bereits mehr als 100
                  Unternehmen haben begonnen Ihre CO₂-Emissionen zu messen, zu
                  reduzieren und zu kompensieren.
                </p>
              </Col>
            </Row>

            <Row>
              <Col xs={24}>
                <h3>Einige unserer Supporter</h3>
                <List
                  itemLayout="horizontal"
                  className="company-logos"
                  grid={{ gutter: 16, xs: 3, md: 5 }}
                  pagination={{
                    onChange: page => {
                      console.log(page)
                    },
                    position: "top",
                    pageSize: isMobile() ? 3 : 5,
                    size: "small"
                  }}
                  dataSource={COMP_LOGOS}
                  renderItem={item => (
                    <List.Item key={item.img}>
                      <List.Item.Meta />
                      <img src={item.img} alt="logo" />
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={10}>
            {contentBlocks.map((block, i) => {
              return (
                <Row
                  key={`content-block-${i}`}
                  className="content-block padding-md-10"
                >
                  <Col xs={20}>
                    <h5>{block.title}</h5>
                    <Paragraph>{block.short_text}</Paragraph>
                  </Col>
                </Row>
              )
            })}
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center", margin: "40px 0 20px" }}>
            <CustomLink
              location={"https://www.leadersforclimateaction.com"}
              linkType={"external"}
            >
              <Button type="primary" size="large">
                Erfahre mehr
              </Button>
            </CustomLink>
          </Col>
        </Row>
      </div>
    )
  }
}

export default StackedContent
