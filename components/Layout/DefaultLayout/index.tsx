import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

import { useBlockById } from '../../../hooks'
import { siteConfig } from '../../../utils'
import { SEO } from '../../'
import { CookieConsent } from '../../CookieConsent'
import { PageFooter, PageHeader } from '../'
import styles from './styles.module.less'

interface LayoutProps {
  children?: React.ReactNode
}

export const DefaultLayout = ({ children }: LayoutProps) => {
  const { locale } = useRouter()

  const t = {
    metaDescription: useBlockById('meta.overview.description'),
    metaTitle: useBlockById('meta.overview.title'),
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{siteConfig.siteTitle}</title>
        <meta charSet="utf-8" />
      </Head>

      <SEO
        locale={locale}
        pagePath="/"
        pageSEO
        postNode={{
          description: t.metaTitle,
          metaDescription: {
            internal: {
              content: t.metaDescription,
            },
          },
          title: siteConfig.siteTitle,
        }}
      />

      <PageHeader />
      {children}
      <PageFooter />

      <CookieConsent />
    </div>
  )
}
