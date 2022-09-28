import { Entry } from 'contentful'
import { GetStaticPaths } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'

import { ContentfulRichtext, DefaultLayout } from '../components'
import { fetchAllPageLocalSlugs, fetchPageLocal } from '../services/contentful'
import { ContentfulPageLocal } from '../services/contentful/models'
import { siteConfig } from '../utils'
import { ContentProps, staticPropsWithContent } from '../utils/server-only'

interface ContentPageParams extends ParsedUrlQuery {
  slug: string
}

interface ContentPageProps {
  pageData: Entry<ContentfulPageLocal>
}

const ContentPage = ({ pageData }: ContentPageProps & ContentProps) => {
  const { bodyRichText, title } = pageData.fields

  return (
    <DefaultLayout>
      <Head>
        <title>{`${title} - ${siteConfig.siteTitle}`}</title>
      </Head>
      <h1>{title}</h1>

      {bodyRichText ? <ContentfulRichtext content={bodyRichText} /> : null}
    </DefaultLayout>
  )
}

export const getStaticProps = staticPropsWithContent<
  ContentPageProps,
  ContentPageParams
>(async ({ params }) => {
  if (!params?.slug) {
    return {
      notFound: true,
    }
  }

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
})

export const getStaticPaths: GetStaticPaths<ContentPageParams> = async ({
  locales = [],
}) => {
  const pageSlugs = await fetchAllPageLocalSlugs()

  const paths = (pageSlugs?.items || []).reduce((allPaths, item) => {
    const pagePaths = locales.map((locale) => ({
      locale,
      params: { slug: item.fields.slug },
    }))

    return [...allPaths, ...pagePaths]
  }, [] as { locale: string; params: ContentPageParams }[])

  return {
    fallback: false,
    paths,
  }
}

export default ContentPage
