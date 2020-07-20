import React from "react";
import PropTypes from "prop-types";
import HomePageTemplate from "../../components/Templates/HomePageTemplate";

const HomePagePreview = ({ entry, widgetFor }) => {
  return (
    <div>
      <div style={{ marginTop: "60px" }} />
      <HomePageTemplate title={entry.getIn(["data", "title"])} />
    </div>
  );
};

HomePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default HomePagePreview;
