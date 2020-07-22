import React from 'react'
import { Link } from 'gatsby'
import { Icon } from 'antd'
import IconArrowRight from '../../../assets/icons/small-right.svg'
import './styles.less'

const ArticleLink = ({
  slug,
  heroImage,
  title,
  publishDate,
  node_locale: nodeLocale,
  ...props
}) => {
  return (
    <div className="article-link">
      <Link to={`${nodeLocale}/${slug}/`}>
        <div className="text-wrapper">
          <h3>{title}</h3>
        </div>
        <div className="icon-wrapper">
          <Icon component={IconArrowRight} />
        </div>
      </Link>
    </div>
  )
}

export default ArticleLink
