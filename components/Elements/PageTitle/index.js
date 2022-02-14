require('./styles.less')

import React from 'react'

const PageTitle = ({ subtitle, title }) => {
  const customClass = `page-title`
  return (
    <div className={customClass}>
      <h1>{title}</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: subtitle && subtitle.childMarkdownRemark.html,
        }}
      />
    </div>
  )
}

export default PageTitle
