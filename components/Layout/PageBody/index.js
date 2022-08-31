import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
require('./styles.less')

import React from 'react'

const PageBody = (props) => {
  return (
    <div
      className="page-body"
      dangerouslySetInnerHTML={{
        __html: documentToHtmlString(props.body),
      }}
    />
  )
}

export default PageBody
