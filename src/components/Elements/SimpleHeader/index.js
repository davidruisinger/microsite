import React from "react";
import "./styles.less";

const SimpleHeader = ({ title, subtitle, inverse }) => {
  return (
    <div className={"simple-header"}>
      <h2>{title}</h2>
      <div className="subtitle">{subtitle}</div>
    </div>
  );
};

export default SimpleHeader;
