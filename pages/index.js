import { Col, List, Row } from 'antd'
import { gql } from 'graphql-request'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

import { PageTitle } from '../components/Elements'
import CustomLink from '../components/Elements/CustomLink'
import Layout from '../components/Layout/Layout'
import SEO from '../components/SEO'
import { fetchData } from '../services/lfcaBackend'
import config from '../utils/siteConfig'

const Homepage = ({ allCompanies, slug }) => {
  const location = useRouter()
  const pageTitle = `${config.siteTitle}`

  const postNode = {
    description: 'We take Climate Action ',
    heroImage: '',
    metaDescription: {
      internal: {
        content:
          'We encourage organizations to take climate action. By making their efforts transparent, we inspire others to follow! ',
      },
    },
    title: pageTitle,
  }

  return (
    <Layout location={location}>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <PageTitle title={'About this initiative'} />
      <div className="container">
        <Row>
          <Col
            md={{
              offset: 2,
              span: 20,
            }}
            xs={24}
          >
            <p style={{ textAlign: 'center' }}>
              The following companies take part and take climate action.
            </p>
            <div className="listing-wrapper">
              <List
                bordered={false}
                className="company-listing"
                dataSource={allCompanies}
                renderItem={(qualifiedCompany) => (
                  <List.Item>
                    <CustomLink
                      slug={`e/${qualifiedCompany?.company.micrositeSlug}`}
                    >
                      <div className="left-box">
                        <div className="img-wrapper">
                          <img
                            alt="logo"
                            src={qualifiedCompany?.company.logoUrl}
                          />
                        </div>
                      </div>
                      <div className="right-box">
                        {qualifiedCompany?.company.name}
                      </div>
                    </CustomLink>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
      </div>
      <SEO pagePath={slug} pageSEO postNode={postNode} />
    </Layout>
  )
}

export async function getStaticProps() {
  const query = gql`
    query qualifiedCompanies($input: QualifiedCompaniesInput) {
      qualifiedCompanies(input: $input) {
        company {
          id
          micrositeSlug
          name
          logoUrl
        }
      }
    }
  `

  const qualifiedCompaniesResult = await fetchData(query)

  return {
    props: {
      allCompanies: qualifiedCompaniesResult.qualifiedCompanies,
    },
  }
}

export default Homepage
