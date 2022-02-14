require('./styles.less')

import Icon from '@ant-design/icons'
import React from 'react'

import IconArrowRight from '../../assets/icons/frame-c-arrow-right.svg'
import CallToAction from '../Elements/CallToAction'

const Header = (props) => {
  return (
    <div className="header">
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
      <CallToAction
        after={<Icon component={IconArrowRight} />}
        cta={{ slug: '#initiative', text: 'Learn more', type: 'link' }}
        ctaClass="bold-arrow"
      />
    </div>
  )
}

export default Header
