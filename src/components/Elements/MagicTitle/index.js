import React from 'react'
import { createMagicUnderline } from '../../../utils'

const MagicTitle = ({ title }) => {
  const htmlTitle = createMagicUnderline(title)
  return (
    <h1
      dangerouslySetInnerHTML={{
        __html: htmlTitle,
      }}
    />
  )
}

export default MagicTitle
