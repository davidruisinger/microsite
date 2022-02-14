require('./styles.less')

import React from 'react'

const SimpleHeader = ({ inverse, subtitle, title }) => {
  return (
    <div className="simple-header">
      <h2>{title}</h2>
      <div className="subtitle">{subtitle}</div>
    </div>
  )
}

export default SimpleHeader
