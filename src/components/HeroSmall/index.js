import React from "react";
import "./styles.less";
import { Container } from "../Helpers/Container";
import { Col, Row } from "antd";

class HeroSmall extends React.Component {
  render() {
    return (
      <div className="hero-small">
        <div className="mask">
          <Container>
            <Row>
              <Col>
                <h1>{this.props.title}</h1>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default HeroSmall;
