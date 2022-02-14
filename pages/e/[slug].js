import { Col, Row } from 'antd'
import cloudinary from 'cloudinary-core'
import { gql } from 'graphql-request'
import Head from 'next/head'
import { useRouter } from 'next/router'
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
import { fetchContent } from '../../services/contentfulApp'
import { fetchQualifiedCompanies } from '../../services/lfcaBackend'
import { replaceVars } from '../../utils'
import config from '../../utils/siteConfig'

const getImageName = (image) => {
  const imageUrlParts = image.split('/')
  return imageUrlParts[imageUrlParts.length - 1] || image
}

const IMAGE_URL = 'Backgrounds/linkedin-microsite-placeholder_bxzknd.jpg'

const CompanyPage = ({ actionsContent, company: qualifiedCompany }) => {
  const { company, completedCompanyActions } = qualifiedCompany
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
        height: 1200,
        width: 1200,
      },
      {
        crop: 'fill',
        height: 160,
        overlay: new cloudinary.Layer().publicId(`logos/${imageName}`),
      },
      {
        flags: 'layer_apply',
        gravity: 'north_east',
        radius: 20,
        x: 50,
        y: 70,
      },
    ],
  })

  const postNode = {
    description: 'We take Climate Action.',
    heroImage: '',
    metaDescription: {
      internal: {
        content:
          'We encourage organizations to take climate action. By making their efforts transparent, we inspire others to follow!',
      },
    },
    title: pageTitle,
  }
  console.log(aboutSections)
  return (
    <Layout activeCompany={name}>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <SEO
        ogImage={image}
        ogImageHeight={1200}
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
        <CardsCarousel actionsContent={actionsContent} />
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

export async function getStaticProps({ params }) {
  const query = gql`
    query {
      actionCollection {
        items {
          actionId
          title
          icon {
            url
          }
          about
          explanation {
            json
          }
        }
      }
    }
  `

  try {
    const { actionCollection } = await fetchContent(query)
    const items = actionCollection?.items
    const asObject = items.reduce((acc, item) => {
      acc[item.actionId] = item
      return acc
    }, {})

    const filteredQualifiedCompanies = await fetchQualifiedCompanies({
      input: {
        filter: {
          companyMicrositeSlugs: [params.slug],
        },
      },
    })

    const company = filteredQualifiedCompanies[0]

    if (!company) {
      return {
        notFound: true,
        revalidate: 300, // 5min
      }
    }
    return {
      props: {
        actionsContent: {
          list: items,
          object: asObject,
        },
        company: filteredQualifiedCompanies[0] || null,
      },
      revalidate: 86400, // 24h
    }
  } catch (e) {
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
