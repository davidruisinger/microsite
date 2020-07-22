import React from 'react'
import Img from 'gatsby-image'
import { Row, Col } from 'antd'
import BackgroundImage from 'gatsby-background-image'
import './styles.less'

const AuthorInfo = ({ author, date }) => (
  <div className="author-info">
    <Img fluid={author.image.fluid} />
    <div className="text-wrapper">
      <div className="name">{author.name}</div>
      <div className="date">{date}</div>
    </div>
  </div>
)

const HeroArticle = props => {
  return (
    <BackgroundImage fluid={props.image.fluid} className={`hero-article`}>
      <div className="container">
        <Row type="flex" justify="center">
          <Col
            className={`article-info-container ${
              props.inverse ? 'inverse' : ''
            }`}
            xs={24}
            md={{ span: 14 }}
          >
            <div className="article-info-wrapper">
              <h1>{props.title}</h1>
              <p className="subtitle">{props.subtitle}</p>
              <AuthorInfo date={props.date} author={props.author} />
              {/* <p>Time to read: {props.timeToRead} min</p> */}
            </div>
          </Col>
        </Row>
      </div>
    </BackgroundImage>
  )
}

export default HeroArticle
