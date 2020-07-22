import React from 'react'
import { CustomLink } from '../../Elements'
import { Tag, Row, Col } from 'antd'
import Img from 'gatsby-image'
import './styles.less'

const ArticleCard = ({
  slug,
  heroImage,
  title,
  tag,
  excerpt,
  hasBorder,
  publishDate,
  isMain,
  layout,
  body,
  node_locale: nodeLocale,
}) => {
  const tagColorMap = {
    news: 'orange',
    science: 'blue',
    story: 'green',
  }
  const timeToRead =
    body && body.childMarkdownRemark && body.childMarkdownRemark.timeToRead
  const heroImageFluid = heroImage && heroImage.fluid
  const excerptContent =
    body && body.childMarkdownRemark && body.childMarkdownRemark.excerpt
  if (layout === 'big') {
    return (
      <div className={`article-card big`}>
        <CustomLink slug={slug}>
          <Row>
            <Col xs={24} md={11}>
              <div className="text-wrapper">
                <div className="simple-tag">{tag}</div>
                <h3>{title}</h3>
                {excerpt && (
                  <div
                    className="excerpt"
                    dangerouslySetInnerHTML={{
                      __html: excerptContent,
                    }}
                  />
                )}
                <p className="info">
                  {publishDate} | {timeToRead} min read
                </p>
              </div>
            </Col>
            <Col xs={24} md={13}>
              {heroImageFluid && (
                <Img fluid={heroImageFluid} backgroundColor={'#eeeeee'} />
              )}
            </Col>
          </Row>
        </CustomLink>
      </div>
    )
  } else {
    return (
      <div
        className={`article-card ${isMain ? 'main' : ''} ${
          hasBorder ? 'with-border' : ''
        }`}
      >
        <CustomLink slug={slug}>
          {heroImageFluid && (
            <Img fluid={heroImageFluid} backgroundColor={'#eeeeee'} />
          )}
          <div className="text-wrapper">
            <Tag className={`${tagColorMap[tag]}`}>{tag}</Tag>
            <h3>{title}</h3>
            <p className="info">
              {publishDate} | {timeToRead} min read
            </p>
            {excerpt && (
              <div
                className="excerpt"
                dangerouslySetInnerHTML={{
                  __html: excerptContent,
                }}
              />
            )}
          </div>
        </CustomLink>
      </div>
    )
  }
}

export default ArticleCard
