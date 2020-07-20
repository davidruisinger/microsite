import React from "react"
import { Link } from "gatsby"

class CustomLink extends React.Component {
  render() {
    const { children, linkType, location } = this.props
    if (linkType === "external") {
      return (
        <a className="custom-link" href={location}>
          {children}
        </a>
      )
    } else {
      const isAnchor = location && location.charAt(0) === "#"
      const myLink =
        typeof window !== "undefined" && `${window.location.pathname}/#actnow`
      return (
        <Link className="custom-link" to={isAnchor ? myLink : location}>
          {children}
        </Link>
      )
    }
  }
}

export default CustomLink
