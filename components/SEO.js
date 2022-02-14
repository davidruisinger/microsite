import Head from 'next/head'
import React from 'react'

import config from '../utils/siteConfig'

const SEO = (props) => {
  const {
    customTitle,
    ogImage,
    ogImageHeight,
    ogImageWidth,
    pagePath,
    pageSEO,
    postNode,
    postSEO,
  } = props
  const langKey = 'de'
  const isRoot = pagePath === '/'
  const isDefaultLanguage = langKey === config.defaultLangKey

  let title
  let description
  let image
  let imgWidth
  let imgHeight
  let pageUrl

  // Set Default OpenGraph Parameters for Fallback
  title = config.siteTitle
  description = config.siteDescription
  image = ogImage || config.siteUrl + config.shareImage
  imgWidth = ogImageWidth || config.shareImageWidth
  imgHeight = ogImageHeight || config.shareImageHeight
  pageUrl = config.siteUrl

  // create pageUrl incl langKey
  let pageUrlIntl = config.siteUrl
  // for the default language the root domain is / instead of en-US
  if (isRoot && isDefaultLanguage) {
    // domain should stay on normal canonical url
  } else {
    // for non default lang incl the langKey
    if (!isDefaultLanguage) {
      pageUrlIntl = pageUrlIntl.concat('/', langKey)
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
      postNode.metaDescription === null
        ? postNode.body.childMarkdownRemark.excerpt
        : postNode.metaDescription.internal.content
  }
  // Use Hero Image for OpenGraph
  if (postSEO) {
    image = 'https:' + postNode.heroImage.ogimg.src
    imgWidth = postNode.heroImage.ogimg.width
    imgHeight = postNode.heroImage.ogimg.height
  }

  // Default Website Schema
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
      name: config.siteTitle,
      url: config.siteUrl,
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
              '@id': config.siteUrl,
              name: config.siteTitle,
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
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
        author: {
          '@type': 'Person',
          name: config.author,
          url: config.authorUrl,
        },
        datePublished: postNode.publishDateISO,
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
          name: config.publisher,
          url: config.siteUrl,
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
      {/* Language Tag */}
      <html lang={langKey.substring(0, 2)} />
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
      <meta content={imgWidth} property="og:image:width" />
      <meta content={imgHeight} property="og:image:height" />
      <meta content={description} property="og:description" />

      {/* Twitter Card tags */}
      <meta content="summary_large_image" name="twitter:card" />
      <meta
        content={config.userTwitter ? config.userTwitter : ''}
        name="twitter:creator"
      />
      <meta content={title} name="twitter:title" />
      <meta content={image} name="twitter:image" />
      <meta content={description} name="twitter:description" />
    </Head>
  )
}

export default SEO
