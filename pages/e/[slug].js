import { Col, Row } from 'antd'
import cloudinary from 'cloudinary-core'
import { gql } from 'graphql-request'
import Head from 'next/head'
import React from 'react'
import { Element } from 'react-scroll'

import CardsCarousel from '../../components/CardsCarousel'
import { ContentSection, SimpleHeader } from '../../components/Elements'
import Header from '../../components/Header'
import InfoBox from '../../components/InfoBox'
import Layout from '../../components/Layout/Layout'
import PersonalAction from '../../components/PersonalAction'
import SEO from '../../components/SEO'
import { useTranslation } from '../../hooks/useTranslation'
import {
  fetchAllActions,
  fetchAllBlocks,
  fetchAllMeta,
  fetchAllNavigations,
} from '../../services/contentful'
import { fetchData } from '../../services/lfcaBackend'
import { replaceVars } from '../../utils'
import config from '../../utils/siteConfig'

const getImageName = (image) => {
  const imageUrlParts = image.split('/')
  return imageUrlParts[imageUrlParts.length - 1] || image
}

const IMAGE_URL = 'Backgrounds/linkedin-wtca_xh4dra.jpg'

const CompanyPage = ({ actions, company }) => {
  const { completedCompanyActions } = company

  const { aboutSections, logoUrl: logo, name, websiteUrl: website } = company

  const slug = company.micrositeSlug
  const pageTitle = `${name} - ${config.siteTitle}`

  // create custom sharing image
  const cl = new cloudinary.Cloudinary({
    cloud_name: 'dhpk1grmy',
    secure: true,
  })

  const imageName = getImageName(logo)
  const image = cl.url(IMAGE_URL, {
    transformation: [
      {
        crop: 'fill',
        gravity: 'south',
        height: 630,
        width: 1200,
      },
      {
        crop: 'pad',
        height: 130,
        overlay: new cloudinary.Layer().publicId(`logos/${imageName}`),
        width: 130,
      },
      {
        flags: 'layer_apply',
        gravity: 'south_east',
        radius: 20,
        x: 45,
        y: 65,
      },
    ],
  })

  const postNode = {
    description: 'We take Climate Action',
    heroImage: '',
    metaDescription: {
      internal: {
        content:
          'We encourage organizations to take climate action. By making their efforts transparent, we inspire others to follow!',
      },
    },
    title: pageTitle,
  }

  return (
    <Layout activeCompany={name}>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <SEO
        ogImage={image}
        ogImageHeight={630}
        ogImageWidth={1200}
        pagePath={slug}
        pageSEO
        postNode={postNode}
      />

      <Element className="container" name="info-box">
        <Row>
          <Col lg={12} md={12} style={{ alignSelf: 'flex-start' }} xs={24}>
            <Header
              subtitle={useTranslation('company.header.subtitle')}
              title={replaceVars(useTranslation('company.header.title'), {
                name: name,
              })}
            />
          </Col>
          <Col
            lg={{
              offset: 3,
              span: 9,
            }}
            md={{
              offset: 1,
              span: 11,
            }}
            style={{ alignSelf: 'flex-end' }}
            xs={24}
          >
            <InfoBox
              actions={completedCompanyActions}
              logo={logo}
              name={name}
              website={website}
            />
          </Col>
        </Row>
      </Element>

      <Element className="container-fluid color-primary-light" name="about">
        <div className="container no-padding">
          <Row>
            {aboutSections ? (
              aboutSections.map((section, i) => (
                <ContentSection
                  heading={section.heading}
                  image={section.imageUrl}
                  key={`content-section-${i}`}
                  orientation={i % 2 === 0 ? 'left' : 'right'}
                  supertext={i === 0 ? `Climate Action at ${name}` : null}
                  text={section.text}
                />
              ))
            ) : (
              <div
                style={{
                  padding: '60px 0',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                <h3 style={{ textAlign: 'center' }}></h3>
              </div>
            )}
          </Row>
        </div>
      </Element>

      <Element className="container" name="initiative">
        <Row>
          <Col
            className="simple-header"
            md={{
              offset: 2,
              span: 20,
            }}
            xs={24}
          >
            <SimpleHeader
              subtitle={useTranslation('program.subtitle')}
              title={useTranslation('program.title')}
            />
          </Col>
        </Row>
      </Element>

      <div className="container">
        <CardsCarousel actions={actions} />
      </div>

      <Element className="container-fluid color-primary-light" name="personal">
        <div className="container">
          <PersonalAction
            description={
              <div
                dangerouslySetInnerHTML={{
                  __html: useTranslation('act.content'),
                }}
              />
            }
            title={useTranslation('act.title')}
          />
        </div>
      </Element>
    </Layout>
  )
}

export async function getStaticProps({ locale, params }) {
  const dataQuery = gql`
    query qualifiedCompanies($input: QualifiedCompaniesInput!) {
      qualifiedCompanies(input: $input) {
        id
        micrositeSlug
        name
        logoUrl
        aboutSections {
          heading
          text
          imageUrl
        }
        completedCompanyActions {
          contentId
          description
          id
          requirements {
            contentId
            description
            id
            title
          }
          title
        }
      }
    }
  `

  try {
    const actions = await fetchAllActions()
    const blocks = await fetchAllBlocks(locale)
    const meta = await fetchAllMeta(locale)
    const navigations = await fetchAllNavigations(locale)

    const filteredQualifiedCompaniesResultLFCA = await fetchData(dataQuery, {
      input: {
        achievementContentIds: ['hasBadgeQualification'],
        filter: {
          companyMicrositeSlugs: [params.slug],
        },
      },
    })

    let company = filteredQualifiedCompaniesResultLFCA.qualifiedCompanies[0]

    if (!company) {
      // Check if the company is part of TechZero
      const filteredQualifiedCompaniesResultTechZero = await fetchData(
        dataQuery,
        {
          input: {
            achievementContentIds: ['hasFulfilledTechZeroPledge'],
            filter: {
              companyMicrositeSlugs: [params.slug],
            },
          },
        }
      )
      company = filteredQualifiedCompaniesResultTechZero.qualifiedCompanies[0]
    }

    if (!company) {
      console.error('No company found')
      return {
        notFound: true,
        revalidate: 300, // 5min
      }
    }

    return {
      props: {
        actions,
        blocks,
        company,
        meta,
        navigations,
      },
      revalidate: 86400, // 24h
    }
  } catch (e) {
    console.error(e)
    return {
      notFound: true,
      revalidate: 300, // 5min
    }
  }
}

export async function getStaticPaths() {
  return {
    fallback: 'blocking',
    paths: [],
  }
}

export default CompanyPage
