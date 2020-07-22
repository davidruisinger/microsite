import React from 'react'
import {
  WhatsappShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share'

import { Row, Col, Icon } from 'antd'
import './styles.less'

const SIZE = '40px'

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
