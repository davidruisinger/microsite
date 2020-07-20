import React from "react";
import { Row, Col } from "antd";
import "./styles.less";

const Press = ({ mentions }) => (
  <div className="press">
    <Row>
      <h5>Bekannt aus:</h5>
    </Row>
    <Row type="flex" justify="center" align="top">
      {mentions &&
        mentions.map((mention, i) => (
          <Col key={`press-${i}`} xs={4}>
            <img
              style={{ width: `${mention.width}` }}
              src={mention.image}
              alt="press"
            />
          </Col>
        ))}
    </Row>
  </div>
);

export default Press;
