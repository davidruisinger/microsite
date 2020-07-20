import React from 'react'
import { Button } from 'antd'
import './styles.less'

const LinkButton = ({ onClick, text, type, style }) => (
  <div className={`link-button ${type}`} onClick={onClick}>
    <Button
      size='large'
      onClick={onClick}
      type='primary'
      shape='circle'
      icon='arrow-right'
      style={style}
    />
    { text }
  </div>
)

export default LinkButton
