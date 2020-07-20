import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from '../components/SEO'
import { HTMLContent } from '../components/Helpers/Content'
import ContactPageTemplate from '../components/Templates/ContactPageTemplate'
import PageLayout from '../components/Helpers/PageLayout'

const ContactPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark
  return (
    <PageLayout>
      <Helmet
        title={frontmatter.meta_title}
        meta_title={frontmatter.meta_title}
        meta_desc={frontmatter.meta_description}
        slug={'/contact'}
      />
      <ContactPageTemplate
        title={frontmatter.title}
        subtitle={frontmatter.subtitle}
        meta_title={frontmatter.meta_title}
        meta_description={frontmatter.meta_description}
        form_titles={frontmatter.form_titles}
        content={html}
        contentComponent={HTMLContent}
      />
    </PageLayout>
  )
}

ContactPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
}

export default ContactPage

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        meta_title
        meta_description
        heading
        form_titles {
          name_title
          name_placeholder
          job_title
          job_placeholder
          company_title
          company_placeholder
          employees_title
          email_title
          email_placeholder
          application_title
          application_placeholder
          reference_title
          reference_placeholder
          cancel
          send
        }
      }
    }
  }
`
