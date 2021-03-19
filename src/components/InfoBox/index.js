import React, { useState } from "react";
import { Row, Collapse, Popover, Button } from "antd";
import Icon, { InfoCircleOutlined } from "@ant-design/icons";
import { Link as ScrollLink } from "react-scroll";
import IconDown from "../../assets/icons/ctrl-down.svg";
import IconCheckSmall from "../../assets/icons/check-single.svg";
import "./styles.less";
import { mergeActions } from "../../utils";
import useIntl from "../../utils/useIntl";
import useContentfulBlocks from "../../utils/useContentfulBlocks";

const { Panel } = Collapse;

const InfoBox = (props) => {
  const langCode = useIntl().isoCode;
  const blocks = useContentfulBlocks(langCode);
  const [showMore, setShowMore] = useState(false);
  const mergedActions = mergeActions(props.actionsContent, props.actions);

  const useShowMore = mergedActions.length > 5;
  const collapseStyle = useShowMore
    ? showMore
      ? { maxHeight: "none", paddingBottom: "40px" }
      : { maxHeight: "280px" }
    : {};
  return (
    <div className="info-box">
      <Row className="wrapper">
        <div className="label">{blocks["infobox.label"]}</div>
        <div className="left-box">
          <h4>{props.name}</h4>
          <div className="link">
            Info <InfoCircleOutlined />
          </div>
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
        {mergedActions &&
          mergedActions.map((action, i) => {
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
                  content={blocks["infobox.popover.content"]}
                  title={blocks["infobox.popover.title"]}
                  overlayClassName="simple-popover"
                >
                  <h5>{blocks["infobox.popover.element"]} </h5>
                </Popover>
                <ul className="green-list">
                  {action.requirements &&
                    action.requirements.map((requirement, i) => (
                      <li key={`list-${i}`}>{requirement.title}</li>
                    ))}
                </ul>
                {blocks["infobox.more.text"]}
                <ScrollLink smooth to={"initiative"}>
                  {blocks["infobox.more.link"]}
                </ScrollLink>
                .
              </Panel>
            );
          })}
        {useShowMore && (
          <div className="show-more">
            <Button ghost size="small" onClick={() => setShowMore(!showMore)}>
              {showMore
                ? blocks["infobox.button.showless"]
                : blocks["infobox.button.showmore"]}
            </Button>
          </div>
        )}
      </Collapse>
    </div>
  );
};

export default InfoBox;
