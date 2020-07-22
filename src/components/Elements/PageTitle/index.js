import React from 'react'
import './styles.less'
import { MagicTitle } from '../'

const PageTitle = ({ title, subtitle, inverse }) => {
  const customClass = `page-title ${inverse ? 'inverse' : ''}`
  return (
    <div className={customClass}>
      <MagicTitle title={title} />

      <div
        dangerouslySetInnerHTML={{
          __html: subtitle.childMarkdownRemark.html,
        }}
      />
    </div>
  )
}

export default PageTitle
