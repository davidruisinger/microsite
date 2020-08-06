import React from 'react'
import { colorTextMap } from '../../../utils'

const SuperText = ({ text, color }) => {
  const textColor = color || 'lightOrange'
  const subTitleStyles = { color: colorTextMap[textColor] }
  return <h5 style={subTitleStyles}>{text}</h5>
}

export default SuperText