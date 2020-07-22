import React from "react";
import CallToAction from "../Elements/CallToAction";
import "./styles.less";

const Header = (props) => {
  return (
    <div className="header">
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
      <CallToAction cta={{ text: "Learn more", style: "ghost" }} />
    </div>
  );
};

export default Header;
