import React from "react";
import Helmet from "react-helmet";
import config from "../utils/siteConfig";
import useIntl from "../utils/useIntl";

const SEO = (props) => {
  const {
    postNode,
    pagePath,
    postSEO,
    pageSEO,
    customTitle,
    ogImage,
    ogImageWidth,
    ogImageHeight,
  } = props;
  const langKey = useIntl().isoCode;
  const isRoot = pagePath === "/";
  const isDefaultLanguage = langKey === config.defaultLangKey;

  let title;
  let description;
  let image;
  let imgWidth;
  let imgHeight;
  let pageUrl;

  // Set Default OpenGraph Parameters for Fallback
  title = config.siteTitle;
  description = config.siteDescription;
  image = ogImage || config.siteUrl + config.shareImage;
  imgWidth = ogImageWidth || config.shareImageWidth;
  imgHeight = ogImageHeight || config.shareImageHeight;
  pageUrl = config.siteUrl;

  // create pageUrl incl langKey
  let pageUrlIntl = config.siteUrl;
  // for the default language the root domain is / instead of en-US
  if (isRoot && isDefaultLanguage) {
    // domain should stay on normal canonical url
  } else {
    // for non default lang incl the langKey
    if (!isDefaultLanguage) {
      pageUrlIntl = pageUrlIntl.concat("/", langKey);
    }
    if (!isRoot) {
      // for non root domains add the path
      pageUrlIntl = pageUrlIntl.concat("/", pagePath, "/");
    }
  }

  pageUrl = pageUrlIntl;

  if (customTitle) {
    title = postNode.title;
  }

  // Replace with Page Parameters if post or page
  if (postSEO || pageSEO) {
    title = postNode.title;
    description =
      postNode.metaDescription === null
        ? postNode.body.childMarkdownRemark.excerpt
        : postNode.metaDescription.internal.content;
  }
  // Use Hero Image for OpenGraph
  if (postSEO) {
    image = "https:" + postNode.heroImage.ogimg.src;
    imgWidth = postNode.heroImage.ogimg.width;
    imgHeight = postNode.heroImage.ogimg.height;
  }

  // Default Website Schema
  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: config.siteUrl,
      name: config.siteTitle,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
    },
  ];

  // Blog Post Schema
  if (postSEO) {
    schemaOrgJSONLD.push(
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": config.siteUrl,
              name: config.siteTitle,
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@id": pageUrl,
              name: title,
            },
          },
        ],
      },
      {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        url: pageUrl,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
        headline: title,
        image: {
          "@type": "ImageObject",
          url: image,
          width: imgWidth,
          height: imgHeight,
        },
        author: {
          "@type": "Person",
          name: config.author,
          url: config.authorUrl,
        },
        publisher: {
          "@type": "Organization",
          name: config.publisher,
          url: config.siteUrl,
        },
        datePublished: postNode.publishDateISO,
        mainEntityOfPage: pageUrl,
      }
    );
  }

  // Page SEO Schema
  if (pageSEO) {
    schemaOrgJSONLD.push({
      "@context": "http://schema.org",
      "@type": "WebPage",
      url: pageUrl,
      name: title,
    });
  }

  return (
    <Helmet>
      {/* Language Tag */}
      <html lang={langKey.substring(0, 2)} />
      {/* General tags */}
      <meta name="image" content={image} />
      <meta name="description" content={description} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      {postSEO ? (
        <meta property="og:type" content="article" />
      ) : (
        <meta property="og:type" content="website" />
      )}

      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={imgWidth} />
      <meta property="og:image:height" content={imgHeight} />
      <meta property="og:description" content={description} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:creator"
        content={config.userTwitter ? config.userTwitter : ""}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
