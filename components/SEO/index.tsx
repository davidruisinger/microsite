import Head from 'next/head'
import React from 'react'

import { siteConfig } from '../../utils'

export interface PostNode {
  body?: {
    childMarkdownRemark: {
      excerpt: string
    }
  }
  description: string
  heroImage?: {
    ogimg: {
      height: number
      src: string
      width: number
    }
  }
  metaDescription?: {
    internal: {
      content: string
    }
  }
  publishDateISO?: string
  title: string
}

export interface SchemaOrgJSONLD {
  '@context': string
  '@type': string
  alternateName?: string
  author?: {
    '@type': string
    name: string
    url: string
  }
  datePublished?: string
  headline?: string
  image?: {
    '@type': string
    height: number
    url: string
    width: number
  }
  itemListElement?: {
    '@type': string
    item: {
      '@id': string
      name: string
    }
    position: number
  }[]
  mainEntityOfPage?: string
  name?: string
  publisher?: {
    '@type': string
    name: string
    url: string
  }
  url?: string
}

interface SEOProps {
  customTitle?: boolean
  locale?: string
  ogImage?: string
  ogImageHeight?: number
  ogImageWidth?: number
  pagePath: string
  pageSEO?: boolean
  postNode: PostNode
  postSEO?: boolean
}

export const SEO = ({
  customTitle,
  locale = siteConfig.defaultLangKey,
  ogImage,
  ogImageHeight,
  ogImageWidth,
  pagePath,
  pageSEO,
  postNode,
  postSEO,
}: SEOProps) => {
  const isRoot = pagePath === '/'
  const isDefaultLanguage = locale === siteConfig.defaultLangKey

  let title
  let description
  let image
  let imgWidth
  let imgHeight
  let pageUrl

  // Set Default OpenGraph Parameters for Fallback
  title = siteConfig.siteTitle
  description = siteConfig.siteDescription
  image = ogImage || siteConfig.siteUrl + siteConfig.shareImage
  imgWidth = ogImageWidth || siteConfig.shareImageWidth
  imgHeight = ogImageHeight || siteConfig.shareImageHeight
  pageUrl = siteConfig.siteUrl

  // create pageUrl incl locale
  let pageUrlIntl = siteConfig.siteUrl
  // for the default language the root domain is / instead of en-US
  if (isRoot && isDefaultLanguage) {
    // domain should stay on normal canonical url
  } else {
    // for non default lang incl the locale
    if (!isDefaultLanguage) {
      pageUrlIntl = pageUrlIntl.concat('/', locale)
    }
    if (!isRoot) {
      // for non root domains add the path
      pageUrlIntl = pageUrlIntl.concat('/', pagePath, '/')
    }
  }

  pageUrl = pageUrlIntl

  if (customTitle) {
    title = postNode.title
  }

  // Replace with Page Parameters if post or page
  if (postSEO || pageSEO) {
    title = postNode.title
    description =
      postNode.metaDescription?.internal.content ||
      postNode.body?.childMarkdownRemark.excerpt ||
      ''
  }
  // Use Hero Image for OpenGraph
  if (postSEO && postNode.heroImage) {
    image = 'https:' + postNode.heroImage.ogimg.src
    imgWidth = postNode.heroImage.ogimg.width
    imgHeight = postNode.heroImage.ogimg.height
  }

  // Default Website Schema
  const schemaOrgJSONLD: SchemaOrgJSONLD[] = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      alternateName: siteConfig.siteTitleAlt ? siteConfig.siteTitleAlt : '',
      name: siteConfig.siteTitle,
      url: siteConfig.siteUrl,
    },
  ]

  // Blog Post Schema
  if (postSEO) {
    schemaOrgJSONLD.push(
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            item: {
              '@id': siteConfig.siteUrl,
              name: siteConfig.siteTitle,
            },
            position: 1,
          },
          {
            '@type': 'ListItem',
            item: {
              '@id': pageUrl,
              name: title,
            },
            position: 2,
          },
        ],
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        alternateName: siteConfig.siteTitleAlt ? siteConfig.siteTitleAlt : '',
        author: {
          '@type': 'Person',
          name: siteConfig.author,
          url: siteConfig.authorUrl,
        },
        datePublished: postNode.publishDateISO || '',
        headline: title,
        image: {
          '@type': 'ImageObject',
          height: imgHeight,
          url: image,
          width: imgWidth,
        },
        mainEntityOfPage: pageUrl,
        name: title,
        publisher: {
          '@type': 'Organization',
          name: siteConfig.publisher,
          url: siteConfig.siteUrl,
        },
        url: pageUrl,
      }
    )
  }

  // Page SEO Schema
  if (pageSEO) {
    schemaOrgJSONLD.push({
      '@context': 'http://schema.org',
      '@type': 'WebPage',
      name: title,
      url: pageUrl,
    })
  }

  return (
    <Head>
      {/* General tags */}
      <meta content={image} name="image" />
      <meta content={description} name="description" />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta content={title} property="og:title" />
      {postSEO ? (
        <meta content="article" property="og:type" />
      ) : (
        <meta content="website" property="og:type" />
      )}

      <meta content={pageUrl} property="og:url" />
      <meta content={image} property="og:image" />
      <meta content={`${imgWidth}`} property="og:image:width" />
      <meta content={`${imgHeight}`} property="og:image:height" />
      <meta content={description} property="og:description" />

      {/* Twitter Card tags */}
      <meta content="summary_large_image" name="twitter:card" />
      <meta
        content={siteConfig.userTwitter ? siteConfig.userTwitter : ''}
        name="twitter:creator"
      />
      <meta content={title} name="twitter:title" />
      <meta content={image} name="twitter:image" />
      <meta content={description} name="twitter:description" />
    </Head>
  )
}

export default SEO
