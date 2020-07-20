import React from 'react'
import './styles.less'
import { Col, Row, Typography } from 'antd'
const { Title } = Typography

class HeadingText extends React.Component {
  render () {
    const { title, text } = this.props
    return (
      <div className='heading-text'>
        <Row>
          <Col xs={24} md={{ span: 12 }} lg={{ span: 11, offset: 1 }} className='title'>
            <Title level={2}>{title}</Title>
          </Col>
          <Col xs={24} md={12} lg={11} className='text'>
            {text}
          </Col>
        </Row>
      </div>
    )
  }
}

export default HeadingText
