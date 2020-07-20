import React from "react"
import PropTypes from "prop-types"
import Helmet from "../components/SEO"
import { graphql } from "gatsby"
import { HTMLContent } from "../components/Helpers/Content"
import ToolsTemplate from "../components/Templates/ToolsTemplate"
import PageLayout from "../components/Helpers/PageLayout"
import { BASE_IMAGE } from "../utils"

const Tools = ({ data, pageContext }) => {
  const { homepage } = data
  return (
    <PageLayout>
      <Helmet
        title={homepage.frontmatter.meta_title}
        meta_title={homepage.frontmatter.meta_title}
        meta_desc={homepage.frontmatter.meta_description}
        cover={BASE_IMAGE}
        slug={"tools"}
      />
      <ToolsTemplate
        contentComponent={HTMLContent}
        title={homepage.frontmatter.title}
        description={homepage.frontmatter.description}
        heroButton={homepage.frontmatter.hero_button}
        content={homepage.html}
      />
    </PageLayout>
  )
}

Tools.propTypes = {
  data: PropTypes.object.isRequired
}

export default Tools

export const toolsQuery = graphql`
  query Tools($id: String!) {
    homepage: markdownRemark(id: { eq: $id }) {
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
