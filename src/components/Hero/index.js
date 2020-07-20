import React from "react"
import "./styles.less"
import { Container } from "../Helpers/Container"
import { Col, Row, Button } from "antd"

class Hero extends React.Component {
  render() {
    return (
      <div className="hero">
        <Container>
          <Row>
            <Col xs={24}>
              <h1>{this.props.title}</h1>
              <p>{this.props.description}</p>
              <Button
                style={{
                  margin: "40px 0 20px",
                  border: "none"
                }}
                size="large"
                type="primary"
              >
                {this.props.heroButton}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Hero
