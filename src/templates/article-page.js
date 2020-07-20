import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { HTMLContent } from '../components/Helpers/Content'
import ArticleTemplate from '../components/Templates/ArticleTemplate'
import SE0 from '../components/SEO'
import PageLayout from '../components/Helpers/PageLayout'

const ArticlePage = ({ data }) => {
  const { markdownRemark: post } = data
  return (
    <PageLayout>
      <SE0
        title={post.frontmatter.title}
        meta_title={post.frontmatter.meta_title}
        meta_desc={post.frontmatter.meta_description}
        cover={post.frontmatter.cover}
        slug={post.fields.slug}
        date={post.frontmatter.date}
      />

      <ArticleTemplate
        content={post.html}
        contentComponent={HTMLContent}
        cover={post.frontmatter.cover}
        meta_title={post.frontmatter.meta_title}
        meta_desc={post.frontmatter.meta_description}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </PageLayout>
  )
}

ArticlePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
}

export default ArticlePage

export const pageQuery = graphql`
  query ArticleByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
            slug
          }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        cover
        meta_title
        meta_description
        tags
      }
    }
  }
`
