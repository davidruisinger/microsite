import React from "react";
import "./styles.less";
import { Col, Row, Avatar, Typography, Card, Divider } from "antd";
import CustomLink from "../../CustomLink";
const { Title, Paragraph } = Typography;

const { Meta } = Card;

class Quotes extends React.Component {
  render() {
    const { quotes, title } = this.props;
    return (
      <div className="quotes">
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
          {quotes.map((quote, i) => {
            return (
              <Col key={`quotes-${i}`} xs={24} md={8} className="quotes-block">
                <Card bordered={false}>
                  {quote.quote}
                  <Divider />
                  <Meta
                    avatar={<Avatar src={quote.image} />}
                    title={quote.title}
                    description={quote.description}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default Quotes;
