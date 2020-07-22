import React from 'react'
import './styles.less'
import { commentToHtml } from '../../../utils'

const ArticleBody = props => {
  const fullHtml = commentToHtml(props.body.childMarkdownRemark.html)

  return (
    <div
      className="article-body drop-cap"
      dangerouslySetInnerHTML={{ __html: fullHtml }}
    />
  )
}

/*
<!-- [ Interactive name="InfoBox" text="Click here to see" ] -->
*/

export default ArticleBody
