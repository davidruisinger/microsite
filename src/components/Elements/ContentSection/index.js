import React, { Fragment } from "react";
import { Row, Col } from "antd";
import "./styles.less";

const ContentSection = (props) => {
  const ImageElement = ({ img }) => {
    if (!img) return null;
    return (
      <Col xs={24} md={11} className="image-wrapper">
        <img width="100%" src={img} />
      </Col>
    );
  };
  const hasImage = !!props.image;
  return (
    <div className={`content-section ${props.orientation}`}>
      <Row>
        {props.orientation === "left" ? (
          <Fragment>
            <ImageElement img={props.image} />
            <Col
              xs={24}
              md={hasImage ? 13 : { span: 22, offset: 1 }}
              className="text-wrapper"
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
              xs={24}
              md={hasImage ? 13 : { span: 18, offet: 2 }}
              className="text-wrapper"
            >
              <h2>{props.heading}</h2>
              {props.text}
            </Col>
            <ImageElement img={props.image} />
          </Fragment>
        )}
      </Row>
    </div>
  );
};

export default ContentSection;
