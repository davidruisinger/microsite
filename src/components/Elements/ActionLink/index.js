import React from "react";
import { Button, Card } from "antd";
import { CallToAction } from "../../Elements";
import "./styles.less";
import Icon from "@ant-design/icons";
import IconArrowRight from "../../../assets/icons/frame-c-arrow-right.svg";

const ActionLink = (props) => {
  return (
    <Card className="action-link">
      <CallToAction
        cta={{ text: props.title, type: "link" }}
        ctaClass="bold-arrow"
        after={<Icon component={IconArrowRight} />}
      />
      <p>{props.description}</p>
    </Card>
  );
};

export default ActionLink;
