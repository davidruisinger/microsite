import Link from 'next/link'
import React from 'react'
import { Link as ScrollLink } from 'react-scroll'

import { useLocalePrefix } from '../../../hooks/useTranslation'

const CustomLink = ({ children, slug, url }) => {
  const urlPrefix = useLocalePrefix()
  const isInternal = slug && slug.length > 0

  // if the slug links to an element on this page
  const isOnPage = slug && slug.indexOf('#') === 0
  if (isOnPage) {
    const element = slug.substring(1)
    return (
      <ScrollLink smooth to={element}>
        {children}
      </ScrollLink>
    )
  }

  let customSlug = slug
  if (slug === '/') {
    customSlug = ''
  }

  const urlFirstPart = !urlPrefix ? '' : `/${urlPrefix}`
  const linkTo = `${urlFirstPart}/${customSlug}`

  if (isInternal) {
    return (
      <Link href={linkTo} prefetch={false}>
        <a>{children}</a>
      </Link>
    )
  } else return <a href={url}>{children}</a>
}

export default CustomLink
