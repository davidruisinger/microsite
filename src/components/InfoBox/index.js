import React from "react";
import { Row, Collapse, Popover } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons";
import IconDown from "../../assets/icons/ctrl-down.svg";
import IconCheckSmall from "../../assets/icons/check-single.svg";
import "./styles.less";
import { mergeActions } from "../../utils";

const { Panel } = Collapse;

const InfoBox = (props) => {
  const mergedActions = mergeActions(props.actionsContent, props.actions);
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
            <Panel
              header={
                <span className="action">
                  <Icon component={IconCheckSmall} />
                  {action.title}
                </span>
              }
              key={i}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: action.about.childMarkdownRemark.html,
                }}
              />
              <Popover
                placement="left"
                content="In this closed BETA Version of our project, we do not demand the upload of documents yet. In the future, we will demand a document for each requirement."
                title="How do we control this information?"
                overlayClassName="simple-popover"
              >
                <h5>Requirements* </h5>
              </Popover>
              <ul className="green-list">
                {action.requirements &&
                  action.requirements.map((requirement, i) => (
                    <li key={`list-${i}`}>
                      {requirement.title}
                      {/* {requirement.isDone && (
                        <span>
                          <Icon
                            style={{ fontSize: "12px", marginLeft: "10px" }}
                            component={IconCheckSmall}
                          />
                        </span>
                      )} */}
                    </li>
                  ))}
              </ul>
            </Panel>
          ))}
      </Collapse>
    </div>
  );
};

export default InfoBox;
