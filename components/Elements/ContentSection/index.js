require('./styles.less')

import { Col, Row } from 'antd'
import React, { Fragment } from 'react'

const ContentSection = (props) => {
  const ImageElement = ({ img }) => {
    if (!img) return null
    return (
      <Col className="image-wrapper" md={11} xs={24}>
        <img src={img} width="100%" />
      </Col>
    )
  }
  const hasImage = !!props.image
  return (
    <div className={`content-section ${props.orientation}`}>
      <Row>
        {props.orientation === 'left' ? (
          <Fragment>
            <ImageElement img={props.image} />
            <Col
              className="text-wrapper"
              md={hasImage ? 13 : { offset: 1, span: 22 }}
              xs={24}
            >
              {props.supertext && (
                <div className="super-text">{props.supertext}</div>
              )}
              <h2>{props.heading}</h2>
              {props.text}
            </Col>
          </Fragment>
        ) : (
          <Fragment>
            <Col
              className="text-wrapper"
              md={hasImage ? 13 : { offet: 2, span: 18 }}
              xs={24}
            >
              <h2>{props.heading}</h2>
              {props.text}
            </Col>
            <ImageElement img={props.image} />
          </Fragment>
        )}
      </Row>
    </div>
  )
}

export default ContentSection
