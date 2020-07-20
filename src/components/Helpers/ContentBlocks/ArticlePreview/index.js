import React from "react";
import "./styles.less";
import { Col, Row, Typography, Button } from "antd";
import CustomLink from "../../CustomLink";

const { Title, Paragraph } = Typography;

class ArticlePreview extends React.Component {
  render() {
    const { image, title, button, text } = this.props;
    return (
      <div className="article-preview">
        <Row className="content-block">
          <Col xs={24} md={8}>
            <img src={`${image}`} width="100%" className="article-image" />
          </Col>
          <Col xs={24} md={16}>
            <div className="content-text">
              <Title level={2} className="section-heading">
                {title}
              </Title>
              <Paragraph>{text}</Paragraph>
              <CustomLink location={button.location} linkType={button.linkType}>
                <Button
                  style={{ marginTop: "15px" }}
                  type="primary"
                  size="large"
                >
                  {button.text}
                </Button>
              </CustomLink>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ArticlePreview;
