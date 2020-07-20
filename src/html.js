import React, { Component } from "react"
import favicon from "./assets/img/favicon.png"

export default class HTML extends Component {
  render() {
    return (
      <html lang="de">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          {this.props.headComponents}
          <link rel="shortcut icon" href={favicon} />
          {/* <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="https://use.typekit.net/uit7eec.css" /> */}
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
