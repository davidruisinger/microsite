import React from "react"
import "./styles.less"
import { Col, Row, Typography, Button, Icon } from "antd"
import CustomLink from "../../CustomLink"
import { HTMLContent } from "../../Content"

const { Title, Paragraph } = Typography

class SimpleText extends React.Component {
  render() {
    const { title, buttons, text, mode, buttonType } = this.props
    const textClass = mode === "dark" ? "simple-text dark" : "simple-text"
    const btnType = buttonType || "primary"
    return (
      <div className={textClass}>
        <Row className="content-block">
          <Col lg={{ offset: 2, span: 20 }}>
            <Title level={2} className="section-heading center">
              {title}
            </Title>
            <Paragraph style={{ whiteSpace: "pre-wrap" }}>
              {this.props.richtext ? <HTMLContent content={text} /> : text}
            </Paragraph>
            {buttons.map((button, i) => (
              <CustomLink
                location={button.location}
                linkType={button.linkType}
                key={`button-${i}`}
              >
                <Button
                  className={`btn-${i}`}
                  style={{ marginTop: "30px" }}
                  type={btnType}
                >
                  {btnType === "link" && <Icon type="home" />}

                  {button.text}
                </Button>
              </CustomLink>
            ))}
          </Col>
        </Row>
      </div>
    )
  }
}

export default SimpleText
