import React from 'react'

const PageBody = props => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.body.childMarkdownRemark.html }}
    />
  )
}

export default PageBody
