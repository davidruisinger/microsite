import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

import { useBlockById } from '../../../hooks'
import { CompanyDetailsFragment } from '../../../services/lfca-backend/api/generated'
import { createCompanySharingImage, siteConfig } from '../../../utils'
import { SEO } from '../../'
import { CookieConsent } from '../../CookieConsent'
import { PageFooter, PageHeader } from '../'
import styles from './styles.module.less'

interface LayoutProps {
  company?: CompanyDetailsFragment
  children?: React.ReactNode
}

export const Layout = ({ children, company }: LayoutProps) => {
  const { locale } = useRouter()
  const pageTitle = `${company?.name} - ${siteConfig.siteTitle}`
  const sharingImage = createCompanySharingImage(company?.logoUrl || '')

  const t = {
    metaDescription: useBlockById('meta.default.description', {
      company: company?.name || '',
    }),
    metaTitle: useBlockById('meta.default.title'),
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{siteConfig.siteTitle}</title>
        <meta charSet="utf-8" />
      </Head>

      <SEO
        locale={locale}
        ogImage={sharingImage}
        ogImageHeight={630}
        ogImageWidth={1200}
        pagePath={`/e/${company?.micrositeSlug}`}
        pageSEO
        postNode={{
          description: t.metaTitle,
          metaDescription: {
            internal: {
              content: t.metaDescription,
            },
          },
          title: pageTitle,
        }}
      />

      <PageHeader company={company} />
      {children}
      <PageFooter />

      <CookieConsent />
    </div>
  )
}
