require('./styles.less')

import { Col, Icon, Row } from 'antd'
import React from 'react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'

class ShareButtons extends React.Component {
  render() {
    const pageLink = typeof window !== 'undefined' && `${window.location.href}`
    return (
      <div className="share-buttons">
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <LinkedinShareButton url={pageLink}>
              <Icon type="linkedin" />
            </LinkedinShareButton>
            <TwitterShareButton url={pageLink}>
              <Icon type="twitter" />
            </TwitterShareButton>
            <FacebookShareButton url={pageLink}>
              <Icon type="facebook" />
            </FacebookShareButton>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ShareButtons
