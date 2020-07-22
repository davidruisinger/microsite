import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'

const NotFoundPage = () => (
  <div className="container">
    <Helmet>
      <title>404 - Page Not Found</title>
      <meta name="description" content="Page not found" />
    </Helmet>

    <div className="container">
      <h1>Page Not Found</h1>
      <p>
        Please return <Link to="/">home</Link> or use the menu to navigate to a
        different page.
      </p>
    </div>
  </div>
)

export default NotFoundPage
