import React from "react";
import "./styles.less";

const PageTitle = ({ title, subtitle }) => {
  const customClass = `page-title`;
  return (
    <div className={customClass}>
      <h1>{title}</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: subtitle && subtitle.childMarkdownRemark.html,
        }}
      />
    </div>
  );
};

export default PageTitle;
