import React from "react";
import { Row, Collapse } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import "./styles.less";

const { Panel } = Collapse;

const InfoBox = (props) => {
  return (
    <div className="info-box">
      <Row className="wrapper">
        <div className="label">Reduction Measures taken at</div>
        <div className="left-box">
          <h4>{props.name}</h4>
          <a href={props.website}>
            Website <LinkOutlined />
          </a>
        </div>
        <div className="right-box">
          <div className="img-wrapper">
            <img src={props.logo} />
          </div>
        </div>
      </Row>
      <Collapse expandIconPosition="right" bordered={false} accordion>
        {props.measures &&
          props.measures.map((measure, i) => (
            <Panel header={measure.title} key={i}>
              <p>{measure.description}</p>
            </Panel>
          ))}
      </Collapse>
    </div>
  );
};

export default InfoBox;
