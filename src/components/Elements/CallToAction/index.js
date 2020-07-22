import React from 'react'
import { Button, Icon } from 'antd'
import { CustomLink } from '../../Elements'

const CallToAction = ({ cta: { text, slug, url, type }, style }) => {
  const isGhost = type === 'ghost'
  const CtaButton = () => (
    <Button
      style={style}
      size="large"
      type={isGhost ? 'primary' : type}
      ghost={isGhost}
    >
      {text}
    </Button>
  )
  return (
    <CustomLink url={url} slug={slug}>
      <CtaButton />
    </CustomLink>
  )
}

export default CallToAction
