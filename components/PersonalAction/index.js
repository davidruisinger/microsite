require('./styles.less')

import { Col, Row } from 'antd'
import React from 'react'

import { useTranslation } from '../../hooks/useTranslation'
import { ActionLink } from '../Elements'

const PersonalAction = (props) => {
  return (
    <Row className="personal-action">
      <Col md={12} xs={24}>
        <h2> {props.title}</h2>
        {props.description}
      </Col>
      <Col md={12} xs={24}>
        <ActionLink
          description={useTranslation('act.action1.description')}
          link={
            'https://www.cnbc.com/2019/12/14/your-complete-guide-to-socially-responsible-investing.html'
          }
          linkText={useTranslation('act.action1.link')}
          title={useTranslation('act.action1.title')}
        />
        <ActionLink
          description={useTranslation('act.action2.description')}
          link={'https://footprint.lfca.earth/'}
          linkText={useTranslation('act.action2.link')}
          title={useTranslation('act.action2.title')}
        />
        <ActionLink
          description={useTranslation('act.action3.description')}
          link={'https://fridaysforfuture.org/'}
          linkText={useTranslation('act.action3.link')}
          title={useTranslation('act.action3.title')}
        />
      </Col>
    </Row>
  )
}

export default PersonalAction
