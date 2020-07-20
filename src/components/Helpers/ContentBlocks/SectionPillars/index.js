import React from 'react'
import './styles.less'
import { Col, Row, Button, Typography, Icon } from 'antd'
import CustomLink from '../../CustomLink'
import { HTMLContent } from '../../Content'
const { Title, Paragraph } = Typography

class SectionPillars extends React.Component {
  render () {
    const { contentBlocks, title, button, text } = this.props
    return (
      <div className='section-pillars'>
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <Title className='section-heading center' style={{ margin: '0em 0 1em' }} level={2}>
              {title}
            </Title>
          </Col>
        </Row>
        <Row>
          <Col className='section-text' style={{ whiteSpace: 'pre-wrap' }} xs={24} md={11}>
            <HTMLContent content={text} />
          </Col>
          <Col xs={24} md={13}>
            { contentBlocks.map((block, i) => {
              return (
                <Row key={`claims-block-${i}`} className='claims-block padding-md-10'>
                  <Col xs={{ span: 4 }} md={{ offset: 1, span: 3 }}>
                    <Icon type={block.icon} />
                  </Col>
                  <Col xs={20}>
                    <h5>{block.title}</h5>
                    <Paragraph>{block.short_text}</Paragraph>
                  </Col>
                </Row>
              )
            }) }
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <CustomLink location={button.location} linkType={button.linkType}>
              <Button type='primary' size='large'>
                {button.text}
              </Button>
            </CustomLink>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SectionPillars
