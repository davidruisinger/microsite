import React from "react"
import "./card_styles.less"
import { Row } from "antd"

class ClimateCard extends React.Component {
  render() {
    const { cover, title, color, explanation, hover } = this.props
    const hasHover = hover
    const mainClass = hasHover ? "climate-card hover" : "climate-card"
    const hasTitle = !!title
    return (
      <div className={mainClass}>
        <div className="card-wrapper">
          <div className="status-bar" style={{ background: color }}>
            <div className="content">{explanation}</div>
          </div>
          <Row className="card-content">
            <div className="card-cover">{cover}</div>
            {hasTitle && (
              <div className="stat" style={{ float: "right" }}>
                <h5>{title}</h5>
              </div>
            )}
          </Row>
        </div>
      </div>
    )
  }
}

export default ClimateCard
