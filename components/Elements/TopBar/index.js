require('./styles.less')

import { Col, Row } from 'antd'
import React, { useState } from 'react'
import PageVisibility from 'react-page-visibility'
import Ticker from 'react-ticker'

import { CustomLink } from '../../Elements'

const TopBar = ({ inverse }) => {
  const [pageIsVisible, setPageIsVisible] = useState(true)

  const handleVisibilityChange = (isVisible) => {
    setPageIsVisible(isVisible)
  }
  return (
    <div className={`top-bar ${inverse ? 'inverse' : ''}`}>
      <Row>
        <Col className="center-block" md={24} xs={24}>
          <div className="content-wrapper">
            <PageVisibility onChange={handleVisibilityChange}>
              {pageIsVisible && (
                <Ticker direction="toLeft" move offset="-100%" speed={3}>
                  {({ index }) => (
                    <CustomLink url={`https://www.lfca.earth/apply`}>
                      <h3>
                        +++ Join our community and start your climate action
                        journey today
                      </h3>
                    </CustomLink>
                  )}
                </Ticker>
              )}
            </PageVisibility>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default TopBar
