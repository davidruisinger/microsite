import React from 'react'
import Content from '../../Helpers/Content'
import { Container } from '../../Helpers/Container'
import HeroSmall from '../../HeroSmall'
import { Row, Col } from 'antd'

const ArticleTemplate = ({
  content,
  contentComponent,
  cover,
  meta_title,
  meta_desc,
  tags,
  title
}) => {
  const PostContent = contentComponent || Content
  return (
    <div className='blog-post'>
      <HeroSmall
        title={title}
        backgroundImage={cover}
      />
      <Container>
        <Row style={{ marginTop: '2em' }}>
          <Col md={{ offset: 2, span: 20 }} lg={{ offset: 4, span: 16 }}>
            <PostContent content={content} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ArticleTemplate
