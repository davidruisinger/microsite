import React from "react";
import { Link } from "gatsby";
import Helmet from "react-helmet";

const HomePage = () => (
  <div className="container">
    <Helmet>
      <title>Homepage</title>
      <meta name="description" content="Page not found" />
    </Helmet>

    <div className="container">
      <h1>Hallo</h1>
    </div>
  </div>
);

export default HomePage;
