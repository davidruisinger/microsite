require('./styles.less')

import { Icon } from 'antd'
import Link from 'next/link'
import React from 'react'

import IconArrowRight from '../../../assets/icons/small-right.svg'

const ArticleLink = ({
  heroImage,
  node_locale: nodeLocale,
  publishDate,
  slug,
  title,
  ...props
}) => {
  return (
    <div className="article-link">
      <Link href={`${nodeLocale}/${slug}/`}>
        <a>
          <div className="text-wrapper">
            <h3>{title}</h3>
          </div>
          <div className="icon-wrapper">
            <Icon component={IconArrowRight} />
          </div>
        </a>
      </Link>
    </div>
  )
}

export default ArticleLink
