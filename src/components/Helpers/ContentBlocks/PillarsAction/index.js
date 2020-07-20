import React from "react"
import "./styles.less"
import { Col, Row, Button, Typography } from "antd"
import CustomLink from "../../CustomLink"
const { Title, Paragraph } = Typography

class PillarsAction extends React.Component {
  render() {
    const { contentBlocks, title, text } = this.props
    return (
      <div className="pillars-action">
        <Row>
          <Col className="section-heading">
            <Title level={2}>{title}</Title>
            <Paragraph className="text">{this.props.text}</Paragraph>
          </Col>
        </Row>
        <Row>
          {contentBlocks.map((block, i) => {
            return (
              <Col
                key={`content-block-${i}`}
                xs={24}
                md={8}
                className="content-block"
              >
                <div className="wrapper">
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={block.image}
                      className="pillar-image"
                      alt="how-it-works"
                    />
                    <h5>{block.title}</h5>
                  </div>
                  <Paragraph>{block.short_text}</Paragraph>
                  <CustomLink
                    location={block.button.location}
                    linkType={block.button.linkType}
                  >
                    <Button type="link" size="large">
                      {block.button.text}
                    </Button>
                  </CustomLink>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }
}

export default PillarsAction
