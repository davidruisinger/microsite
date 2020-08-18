import React from "react";
import "./styles.less";

const PageBody = (props) => {
  return (
    <div
      className="page-body"
      dangerouslySetInnerHTML={{ __html: props.body.childMarkdownRemark.html }}
    />
  );
};

export default PageBody;
