import React from "react";
import "./styles.less";
import { Col, Row, Button, Typography } from "antd";
import CustomLink from "../../CustomLink";
const { Title, Paragraph } = Typography;

class PillarsQuattro extends React.Component {
  render() {
    const { contentBlocks, title, button } = this.props;
    return (
      <div className="pillars-quattro">
        <Row>
          <Col style={{ textAlign: "center" }}>
            <Title
              className="section-heading center"
              style={{ margin: "0.5em 0 1em" }}
              level={2}
            >
              {title}
            </Title>
          </Col>
        </Row>
        <Row>
          {contentBlocks.map((block, i) => {
            return (
              <Col
                key={`pillar-block-${i}`}
                xs={24}
                md={6}
                className="content-block"
              >
                <h5>{block.title}</h5>
                <Paragraph>{block.short_text}</Paragraph>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col style={{ textAlign: "center", margin: "30px 0 0" }}>
            <CustomLink location={button.location} linkType={button.linkType}>
              <Button type="primary" size="large">
                {button.text}
              </Button>
            </CustomLink>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PillarsQuattro;
