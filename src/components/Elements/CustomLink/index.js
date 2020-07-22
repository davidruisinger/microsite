import React from 'react'
import { Link } from 'gatsby'
import { useIntl } from 'react-intl'
import { defaultLangKey } from '../../../data/languages'

const CustomLink = ({ slug, url, children }) => {
  const intl = useIntl()
  const urlPrefix = intl.locale
  const isInternal = slug && slug.length > 0
  // make sure that root links to en-US go to root
  const isDefaultLang = urlPrefix === defaultLangKey
  let customSlug = slug
  if (slug === '/') {
    customSlug = ''
  }
  const linkTo = isDefaultLang
    ? `/${customSlug}`
    : `/${urlPrefix}/${customSlug}`

  if (isInternal) {
    return <Link to={linkTo}>{children}</Link>
  } else return <a href={url}>{children}</a>
}

export default CustomLink
