import React from "react"
import PropTypes from "prop-types"
import Helmet from "../components/SEO"
import { graphql } from "gatsby"
import { HTMLContent } from "../components/Helpers/Content"
import HomePageTemplate from "../components/Templates/HomePageTemplate"
import PageLayout from "../components/Helpers/PageLayout"
import { BASE_IMAGE } from "../utils"

const HomePage = ({ data, pageContext }) => {
  const { homepage } = data
  const { companiesFiltered } = pageContext
  return (
    <PageLayout>
      <Helmet
        title={homepage.frontmatter.meta_title}
        meta_title={homepage.frontmatter.meta_title}
        meta_desc={homepage.frontmatter.meta_description}
        cover={BASE_IMAGE}
        slug={""}
      />
      <HomePageTemplate
        contentComponent={HTMLContent}
        title={homepage.frontmatter.title}
        description={homepage.frontmatter.description}
        heroButton={homepage.frontmatter.hero_button}
        content={homepage.html}
        companies={companiesFiltered}
      />
    </PageLayout>
  )
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired
}

export default HomePage

export const homePageQuery = graphql`
  query HomePage($id: String!) {
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
