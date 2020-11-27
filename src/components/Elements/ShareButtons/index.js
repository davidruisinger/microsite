import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

import { Row, Col, Icon } from "antd";
import "./styles.less";

class ShareButtons extends React.Component {
  render() {
    const pageLink = typeof window !== "undefined" && `${window.location.href}`;
    return (
      <div className="share-buttons">
        <Row>
          <Col style={{ textAlign: "center" }}>
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
    );
  }
}

export default ShareButtons;
