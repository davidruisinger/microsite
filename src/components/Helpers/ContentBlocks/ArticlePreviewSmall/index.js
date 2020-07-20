import React from 'react'
import './styles.less'
import { Col, Typography } from 'antd'
import Img from 'gatsby-image'
import LinkButton from '../../LinkButton'
import CustomLink from '../../CustomLink'

const { Title } = Typography

class ArticlePreviewSmall extends React.Component {
  render () {
    const { image, title, button } = this.props
    return (
      <div className='article-preview-small'>
        <Col xs={24} md={12}>
          <div className='content-text'>
            <Title level={2} className='section-heading'>
              { title }
            </Title>
            <Img fluid={image} />
            <CustomLink location={button.location} linkType={button.linkType}>
              <LinkButton
                style={{ marginTop: '30px' }}
                type='default'
                text={button.text}
              />
            </CustomLink>
          </div>
        </Col>
      </div>
    )
  }
}

export default ArticlePreviewSmall
