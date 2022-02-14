require('./styles.less')

import { Card } from 'antd'
import React from 'react'

const ActionLink = (props) => {
  return (
    <a className="action-link" href={props.link}>
      <div>
        <Card>
          <h4>{props.title}</h4>
          <p>{props.description}</p>
        </Card>
      </div>
    </a>
  )
}

export default ActionLink
