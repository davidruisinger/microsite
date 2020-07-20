import React from "react"
import "./styles.less"
import { Col, Row, Typography, Button } from "antd"

const { Title, Paragraph } = Typography

class ImageFacts extends React.Component {
  render() {
    const { image, title, facts, text } = this.props
    return (
      <div className="image-facts">
        <Row className="content-block">
          <Col xs={24} md={10}>
            <img src={`${image}`} width="100%" className="article-image" />
          </Col>
          <Col xs={24} md={14}>
            <div className="content-text">
              <Title level={2} className="section-heading">
                {title}
              </Title>
              <Paragraph>{text}</Paragraph>
              {facts.map((fact, i) => (
                <div key={`fact-${i}`} className="fact">
                  <div className="title">{fact.title}</div>
                  <div className="text">{fact.text}</div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ImageFacts
