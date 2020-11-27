import React from "react";
import { ActionLink } from "../Elements";
import { Col, Row } from "antd";
import "./styles.less";
import useIntl from "../../utils/useIntl";
import useContentfulBlocks from "../../utils/useContentfulBlocks";

const PersonalAction = (props) => {
  const langCode = useIntl().isoCode;
  const blocks = useContentfulBlocks(langCode);
  return (
    <Row className="personal-action">
      <Col xs={24} md={12}>
        <h2> {props.title}</h2>
        {props.description}
      </Col>
      <Col xs={24} md={12}>
        <ActionLink
          title={blocks["act.action1.title"]}
          description={blocks["act.action1.description"]}
          link={
            "https://www.cnbc.com/2019/12/14/your-complete-guide-to-socially-responsible-investing.html"
          }
          linkText={blocks["act.action1.link"]}
        />
        <ActionLink
          title={blocks["act.action2.title"]}
          description={blocks["act.action2.description"]}
          link={"https://footprint.lfca.earth/"}
          linkText={blocks["act.action2.link"]}
        />
        <ActionLink
          title={blocks["act.action3.title"]}
          description={blocks["act.action3.description"]}
          link={"https://fridaysforfuture.org/"}
          linkText={blocks["act.action3.link"]}
        />
      </Col>
    </Row>
  );
};

export default PersonalAction;
