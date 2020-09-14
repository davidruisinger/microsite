import React from "react";
import { CallToAction, ActionLink } from "../Elements";
import { Col, Row } from "antd";
import "./styles.less";

const PersonalAction = (props) => {
  return (
    <Row className="personal-action">
      <Col xs={24} md={12}>
        <h2>{props.title}</h2>
        {/* <div dangerouslySetInnerHTML={{ __html: props.description }} /> */}
        {props.description}
      </Col>
      <Col xs={24} md={12}>
        <ActionLink
          title={"Move your money to Green Investments"}
          description={`Many banks and insurances are still financing new coal and oil plants. Move your money into green investment vecicles like Sustainable ETF’s and switch to a green bank like Tomorrow or bunq. `}
          link={
            "https://www.cnbc.com/2019/12/14/your-complete-guide-to-socially-responsible-investing.html"
          }
          linkText={"Invest green now"}
        />
        <ActionLink
          title={"Measure and reduce your personal footprint"}
          description={`Lead by example, inform yourself about climate change. Figure out what you can change in your personal life and talk to friends and family about the problem. Use our free calculator `}
          link={"https://footprint.lfca.earth/"}
          linkText={"Measure and compensate"}
        />
        <ActionLink
          title={"Raise your voice and engage in peaceful activism"}
          description={`Fridays for Future, Extinction Rebellion, .. So many great organizations helped to increase the pressure on politics and businesses. Join them and think about who you `}
          link={"https://fridaysforfuture.org/"}
          linkText={"Engage"}
        />
      </Col>
    </Row>
  );
};

export default PersonalAction;
