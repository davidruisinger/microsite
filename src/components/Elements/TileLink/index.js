import React from 'react'
import { Link } from 'gatsby'
import { Button } from 'antd'
import './styles.less'

const TileLink = ({ slug, title, node_locale: nodeLocale }) => {
  return (
    <div className="tile-link">
      <Link to={`${nodeLocale}/${slug}/`}>
        <Button block style={{ height: '100px' }} className="tool">
          {title}
        </Button>
      </Link>
    </div>
  )
}

export default TileLink
