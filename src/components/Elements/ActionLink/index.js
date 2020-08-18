import React from "react";
import { Button, Card } from "antd";
import { CallToAction } from "../../Elements";
import "./styles.less";
import Icon from "@ant-design/icons";
import IconArrowRight from "../../../assets/icons/frame-c-arrow-right.svg";

const ActionLink = (props) => {
  return (
    <a href={props.link} className="action-link">
      <Card>
        <h4>{props.title}</h4>
        <p>{props.description}</p>
      </Card>
    </a>
  );
};

export default ActionLink;
