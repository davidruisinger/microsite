import React from "react";
import { Button, Icon } from "antd";
import { CustomLink } from "../../Elements";
import "./styles.less";

const CallToAction = ({
  cta: { text, slug, url, type },
  style,
  after,
  before,
  ctaClass,
}) => {
  const isGhost = type === "ghost";
  const CtaButton = () => (
    <>
      {before}
      <Button
        style={style}
        className={`cta ${ctaClass || ""}`}
        size="large"
        type={isGhost ? "primary" : type}
        ghost={isGhost}
      >
        {text}
      </Button>
      {after}
    </>
  );
  return (
    <CustomLink url={url} slug={slug}>
      <CtaButton />
    </CustomLink>
  );
};

export default CallToAction;
