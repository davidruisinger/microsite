import React, { Fragment } from "react";
import { Row, Col } from "antd";
import "./styles.less";

const ContentSection = (props) => {
  return (
    <div className={`content-section ${props.orientation}`}>
      <Row>
        {props.orientation === "left" ? (
          <Fragment>
            <Col xs={24} md={12} className="image-wrapper">
              <img width="100%" src={props.image} />
            </Col>
            <Col xs={24} md={12} className="text-wrapper">
              {props.supertext && (
                <div className="super-text">{props.supertext}</div>
              )}
              <h2>{props.heading}</h2>
              {props.text}
            </Col>
          </Fragment>
        ) : (
          <Fragment>
            <Col xs={24} md={12} className="text-wrapper">
              <h2>{props.heading}</h2>
              {props.text}
            </Col>
            <Col xs={24} md={12} className="image-wrapper">
              <img width="100%" src={props.image} />
            </Col>
          </Fragment>
        )}
      </Row>
    </div>
  );
};

export default ContentSection;
