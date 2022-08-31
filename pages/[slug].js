import Head from 'next/head'
import React from 'react'

import { PageTitle } from '../components/Elements'
import Layout from '../components/Layout/Layout'
import PageBody from '../components/Layout/PageBody'
import {
  fetchAllBlocks,
  fetchAllMeta,
  fetchAllNavigations,
  fetchPageLocal,
  fetchPageLocalSlugs,
} from '../services/contentful'
import config from '../utils/siteConfig'

// Simple pages like Impressum etc.
const Page = ({ pageData }) => {
  const { bodyRichText, title } = pageData

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

export async function getStaticProps({ locale, params }) {
  const blocks = await fetchAllBlocks(locale)
  const meta = await fetchAllMeta(locale)
  const navigations = await fetchAllNavigations(locale)

  try {
    const pageData = await fetchPageLocal(params.slug)

    if (!pageData) {
      return {
        notFound: true,
        revalidate: 86400, // 24h
      }
    }

    return {
      props: {
        blocks,
        meta,
        navigations,
        pageData,
      },
      revalidate: 86400, // 24h
    }
  } catch (e) {
    console.error(e)
    return {
      notFound: true,
      revalidate: 86400, // 24h
    }
  }
}

export async function getStaticPaths({ locales }) {
  const pageSlugs = await fetchPageLocalSlugs()

  const paths = pageSlugs.reduce((allPaths, item) => {
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
