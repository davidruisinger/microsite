import React from "react";
import { Card } from "antd";
import "./styles.less";

const SliderCard = ({ title, icon, opacity }) => {
  return (
    <div className="slider-card">
      <Card style={{ background: `rgba(9,37,61,${opacity})` }}>
        <div className="inner">{title}</div>
      </Card>
    </div>
  );
};

export default SliderCard;
