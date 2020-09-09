import React from "react";
import CallToAction from "../Elements/CallToAction";
import "./styles.less";
import Icon from "@ant-design/icons";
import IconArrowRight from "../../assets/icons/frame-c-arrow-right.svg";

const Header = (props) => {
  return (
    <div className="header">
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
      <CallToAction
        cta={{ text: "Learn more", type: "link", slug: "#initiative" }}
        ctaClass="bold-arrow"
        after={<Icon component={IconArrowRight} />}
      />
    </div>
  );
};

export default Header;
