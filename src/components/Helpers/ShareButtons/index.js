import React from "react"
import {
  WhatsappShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton
} from "react-share"
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share"
import { Row, Col } from "antd"
import "./styles.less"

const SIZE = "55px"

class ShareButtons extends React.Component {
  render() {
    const pageLink = typeof window !== "undefined" && `${window.location.href}`
    return (
      <div className="share-buttons">
        <Row>
          <Col md={{ span: 20, offset: 2 }} style={{ textAlign: "center" }}>
            <h1>Teile diese Seite mit deinen Freunden!</h1>
            <p>
              Du hilfst uns weiter, wenn du selbst zum Influencer wirst und
              andere auf den Klimawandel aufmerksam machst. Begnege Zweiflern
              mit Fakten und sorge dafür, dass die Menschen handeln.
            </p>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <WhatsappShareButton url={pageLink}>
              <WhatsappIcon round size={SIZE} />
            </WhatsappShareButton>
            <FacebookShareButton url={pageLink}>
              <FacebookIcon round size={SIZE} />
            </FacebookShareButton>
            <LinkedinShareButton url={pageLink}>
              <LinkedinIcon round size={SIZE} />
            </LinkedinShareButton>
            <TwitterShareButton url={pageLink}>
              <TwitterIcon round size={SIZE} />
            </TwitterShareButton>
            <EmailShareButton url={pageLink}>
              <EmailIcon round size={SIZE} />
            </EmailShareButton>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ShareButtons
