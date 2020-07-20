import React from "react"
import PropTypes from "prop-types"
import Helmet from "../components/SEO"
import { graphql } from "gatsby"
import CompanyTemplate from "../components/Templates/CompanyTemplate"
import PageLayout from "../components/Helpers/PageLayout"

class CompanyPage extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { content } = data
    const { company } = pageContext
    const slug = `e/${company.url}`
    return (
      <PageLayout>
        <Helmet
          title={content.frontmatter.meta_title}
          meta_title={content.frontmatter.meta_title}
          meta_desc={content.frontmatter.meta_description}
          cover={company.bgImageUrl}
          slug={slug}
        />
        <CompanyTemplate
          meta_title={content.frontmatter.meta_title}
          meta_desc={content.frontmatter.meta_description}
          title={content.frontmatter.title}
          description={content.frontmatter.description}
          company={company}
        />
      </PageLayout>
    )
  }
}

CompanyPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default CompanyPage

export const companyPageQuery = graphql`
  query CompanyPage($id: String!) {
    content: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
        meta_title
        meta_description
      }
    }
  }
`
