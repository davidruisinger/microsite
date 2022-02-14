import { gql } from 'graphql-request'
import Head from 'next/head'
import React from 'react'

import { PageTitle } from '../components/Elements'
import Layout from '../components/Layout/Layout'
import PageBody from '../components/Layout/PageBody'
import { fetchContent } from '../services/contentfulBadge'
import config from '../utils/siteConfig'

// Simple pages aga Impressum etc.

const Page = ({ pageData }) => {
  const { bodyRichText, slug, title } = pageData

  return (
    <Layout>
      <Head>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Head>
      <PageTitle title={title} />
      <div className="container-fluid color-white">
        <div className="container core">
          <PageBody body={bodyRichText} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const query = gql`
    query getCollection($slug: String!) {
      pageLocalCollection(where: { slug: $slug }) {
        items {
          slug
          title
          bodyRichText {
            json
          }
          metaDescription
        }
      }
    }
  `

  try {
    const { pageLocalCollection } = await fetchContent(query, {
      slug: params.slug,
    })

    const item = pageLocalCollection?.items[0] || null

    if (!item) {
      return {
        notFound: true,
        revalidate: 86400, // 24h
      }
    }

    return {
      props: {
        pageData: item,
      },
      revalidate: 86400, // 24h
    }
  } catch (e) {
    return {
      notFound: true,
      revalidate: 86400, // 24h
    }
  }
}

export async function getStaticPaths() {
  const query = gql`
    query {
      pageLocalCollection {
        items {
          slug
        }
      }
    }
  `

  const { pageLocalCollection } = await fetchContent(query)
  const paths = pageLocalCollection.items.reduce((allPaths, item) => {
    const locales = ['en', 'de', 'tr']
    const pagePaths = locales.map((locale) => ({
      locale,
      params: { slug: item.slug },
    }))

    return [...allPaths, ...pagePaths]
  }, [])

  return {
    fallback: 'blocking',
    paths,
  }
}

export default Page
