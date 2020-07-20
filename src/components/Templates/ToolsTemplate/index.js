import React from "react"
import PropTypes from "prop-types"
import { Tabs, Icon, Row, Col } from "antd"
import { ContainerFluid } from "../../Helpers/Container/"
import HeroSmall from "../../HeroSmall"
import GreenMoney from "../../Tools/GreenMoney"
import ContactBoss from "../../Tools/ContactBoss"
import PostCard from "../../Tools/PostCard"

const { TabPane } = Tabs

class ToolsTemplate extends React.Component {
  render() {
    const { title } = this.props
    return (
      <div className="tools">
        <ContainerFluid>
          <HeroSmall title={title} />
          <Row>
            <Col lg={{ span: 16, offset: 4 }}>
              <Tabs
                style={{ textAlign: "center", margin: "0 0 100px" }}
                defaultActiveKey="3"
              >
                <TabPane
                  tab={
                    <span>
                      <Icon type="global" />
                      Green Money
                    </span>
                  }
                  key="1"
                >
                  <GreenMoney />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <Icon type="form" />
                      Contact Boss
                    </span>
                  }
                  key="2"
                >
                  <ContactBoss />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <Icon type="idcard" />
                      Contact Politik
                    </span>
                  }
                  key="3"
                >
                  <PostCard />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <Icon type="like" />
                      CO₂ Calculator
                    </span>
                  }
                  key="4"
                >
                  ...coming soon
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </ContainerFluid>
      </div>
    )
  }
}

ToolsTemplate.propTypes = {
  title: PropTypes.string.isRequired
}

export default ToolsTemplate
