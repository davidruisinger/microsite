import React from "react"
import "./styles.less"
import { Col, Row, Typography, Button } from "antd"
import CustomLink from "../../../Helpers/CustomLink"

const { Title, Paragraph } = Typography

class ImageFacts extends React.Component {
  render() {
    const { image, title, text } = this.props
    return (
      <div className="facts-image">
        <Row>
          <Col className="section-heading" style={{ textAlign: "center" }}>
            <p>Warum wir handeln müssen</p>
            <Title level={2}>{title}</Title>
          </Col>
        </Row>
        <Row className="content-block">
          <Col xs={24} md={10} className="article-image">
            <img src={`${image}`} />
          </Col>
          <Col xs={24} md={14}>
            <div className="content-text">
              <Paragraph>{text}</Paragraph>
              <p>
                Die letzten Jahre waren nur ein Vorgeschmack dessen, was uns in
                Zukunft erwartet. Massive Waldbrände, Überschwemmungen,
                Ernteausfülle, Hungersnöte und damit verbunden massive
                Flüchtlingsströme. Also höchste Zeit zu handeln!
              </p>
              <CustomLink
                location={
                  typeof window !== "undefined" &&
                  `${window.location.pathname}/#actnow`
                }
                linkType={"internal"}
              >
                <Button
                  style={{ margin: "10px 0 30px" }}
                  type="primary"
                  size="large"
                >
                  Jetzt aktiv werden
                </Button>
              </CustomLink>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ImageFacts
