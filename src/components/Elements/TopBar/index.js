import React, { useState } from "react";
import { CustomLink } from "../../Elements";
import { Row, Col } from "antd";
import Ticker from "react-ticker";
import PageVisibility from "react-page-visibility";
import "./styles.less";

const TopBar = ({ inverse }) => {
  const [pageIsVisible, setPageIsVisible] = useState(true);

  const handleVisibilityChange = (isVisible) => {
    setPageIsVisible(isVisible);
  };
  return (
    <div className={`top-bar ${inverse ? "inverse" : ""}`}>
      <Row>
        <Col className="center-block" xs={24} md={24}>
          <div className="content-wrapper">
            <PageVisibility onChange={handleVisibilityChange}>
              {pageIsVisible && (
                <Ticker offset="-100%" move speed={3} direction="toLeft">
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
  );
};

export default TopBar;
