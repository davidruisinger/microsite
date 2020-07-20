import React from "react"
import { ContainerFluid } from "../Helpers/Container"
import { Row, Col, Button } from "antd"
import CustomLink from "../Helpers/CustomLink"
import { isMobile } from "../../utils"
import "./styles.less"

const TopBar = ({ content }) => {
  return (
    <div className="top-bar">
      <ContainerFluid>
        <Row type="flex" justify="center" align="middle">
          {content.text && (
            <Col xs={24}>
              {!isMobile() ? content.text : content.mobile_text}
              <CustomLink
                location={
                  typeof window !== "undefined" &&
                  `${window.location.pathname}/#actnow`
                }
                linkType={content.button.linkType}
              >
                <Button type="primary" style={{ marginLeft: "10px" }}>
                  {content.button.text}
                </Button>
              </CustomLink>
            </Col>
          )}
        </Row>
      </ContainerFluid>
    </div>
  )
}

export default TopBar
