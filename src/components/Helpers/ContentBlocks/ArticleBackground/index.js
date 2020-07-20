import React from 'react'
import './styles.less'
import { Container } from '../../Container'
import CustomLink from '../../CustomLink'
import { Col, Row, Typography, Button } from 'antd'
import { isMobile } from '../../../../utils/'
import { HTMLContent } from '../../Content'

const { Title, Paragraph } = Typography

class ArticleBackground extends React.Component {
  render () {
    const bgImage = isMobile() ? this.props.backgroundImageMobile : this.props.backgroundImage
    return (
      <div
        className='article-background'
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className='mask'>
          <Container>
            <Row>
              <Col className='layer' xs={24} sm={18} md={16} lg={14}>
                <div className='text-container'>
                  <Title level={2} className='section-heading'>
                    { this.props.title }
                  </Title>
                  <Paragraph style={{ marginBottom: '40px', whiteSpace: 'pre-wrap' }} >
                    { this.props.richtext
                      ? <HTMLContent content={this.props.text} />
                      : this.props.text
                    }
                  </Paragraph>
                  <CustomLink location={this.props.button1.location} linkType={this.props.button1.linkType}>
                    <Button type='primary' size='large'>
                      {this.props.button1.text}
                    </Button>
                  </CustomLink>
                  <CustomLink location={this.props.button2.location} linkType={this.props.button2.linkType}>
                    <Button type='primary' size='large' className='color-moon'>
                      {this.props.button2.text}
                    </Button>
                  </CustomLink>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

    )
  }
}

export default ArticleBackground
