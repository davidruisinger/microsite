import React from "react";
import { Row, Collapse } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons";
import IconDown from "../../assets/icons/ctrl-down.svg";
import "./styles.less";
import { useContentfulActions } from "../../utils/hooks";
import { mergeActions } from "../../utils";

const { Panel } = Collapse;

const InfoBox = (props) => {
  const actionsContent = useContentfulActions();
  const mergedActions = mergeActions(actionsContent, props.actions);
  console.log(mergedActions);
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
      <Collapse
        expandIcon={({ isActive }) => (
          <Icon component={IconDown} rotate={isActive ? 180 : 0} />
        )}
        expandIconPosition="right"
        bordered={false}
        accordion
      >
        {mergedActions &&
          mergedActions.map((action, i) => (
            <Panel header={action.title} key={i}>
              <p>{action.shortDescription}</p>
            </Panel>
          ))}
      </Collapse>
    </div>
  );
};

export default InfoBox;
