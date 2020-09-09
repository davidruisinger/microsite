import React, { useState } from "react";
import { Row, Collapse, Popover, Button } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { Link as ScrollLink } from "react-scroll";
import IconDown from "../../assets/icons/ctrl-down.svg";
import IconCheckSmall from "../../assets/icons/check-single.svg";
import "./styles.less";
import { mergeActions } from "../../utils";

const { Panel } = Collapse;

const InfoBox = (props) => {
  const [showMore, setShowMore] = useState(false);
  const mergedActions = mergeActions(props.actionsContent, props.actions);
  const filteredActions = mergedActions.filter((action) => action.isCompleted);
  const useShowMore = filteredActions.length > 5;
  const collapseStyle = useShowMore
    ? showMore
      ? { maxHeight: "none", paddingBottom: "40px" }
      : { maxHeight: "280px" }
    : {};
  return (
    <div className="info-box">
      <Row className="wrapper">
        <div className="label">Reduction Measures taken at</div>
        <div className="left-box">
          <h4>{props.name}</h4>
          <a className="link" href={props.website}>
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
        style={collapseStyle}
      >
        {filteredActions &&
          filteredActions.map((action, i) => {
            return (
              <Panel
                className="actions-container"
                header={
                  <span className="action">
                    <div className="icon">
                      <Icon component={IconCheckSmall} />
                    </div>
                    <div className="inline">{action.title}</div>
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
                  content={`All members are part of the LFCA Community and use our digital reduction program. Some measures require the upload of documents as a proof (e.g. offset certificates), others are made controllable simple by making them transparent to the public. Please contact us if you find any violation or misinformation (e.g. as an employee of this company).`}
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
                Find out more and understand why this measure is important{" "}
                <ScrollLink smooth to={"initiative"}>
                  here
                </ScrollLink>
                .
              </Panel>
            );
          })}
        {useShowMore && (
          <div className="show-more">
            <Button ghost size="small" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show less" : "Show all"}
            </Button>
          </div>
        )}
      </Collapse>
    </div>
  );
};

export default InfoBox;
