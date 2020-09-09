import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { CustomLink, Link } from "../../Elements";
import { Row, Col } from "antd";
import { useIsMobile } from "../../../utils/IsMobileProvider";
import Ticker from "react-ticker";
import PageVisibility from "react-page-visibility";
import "./styles.less";

const TopBar = ({ inverse }) => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     contentfulTopBar {
  //       text
  //       cta {
  //         slug
  //         url
  //         text
  //         type
  //       }
  //       mobileText
  //       icon
  //     }
  //   }
  // `)
  // const { text, mobileText, cta } = data.contentfulTopBar
  const isMobile = useIsMobile();
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
