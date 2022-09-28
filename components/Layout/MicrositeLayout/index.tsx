import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

import { useBlockById } from '../../../hooks'
import { CompanyDetailsFragment } from '../../../services/lfca-backend/api/generated'
import { createCompanySharingImage, siteConfig } from '../../../utils'
import { CookieConsent, PageFooter, SEO } from '../../'
import { LeftNav, RightNav } from '../PageHeader'
import { StaticNavContainer } from '../PageHeader/StaticNavContainer'
import styles from './styles.module.less'

interface LayoutProps {
  children?: React.ReactNode
  scrollableContent?: React.ReactNode
  staticContent?: React.ReactNode
  company: CompanyDetailsFragment
}

export const MicrositeLayout = ({
  children,
  company,
  scrollableContent,
  staticContent,
}: LayoutProps) => {
  const pageTitle = `${company.name} - ${siteConfig.siteTitle}`
  const sharingImage = createCompanySharingImage(company.logoUrl || '')
  const { locale } = useRouter()

  const t = {
    metaDescription: useBlockById('meta.default.description', {
      company: company.name || '',
    }),
    metaTitle: useBlockById('meta.default.title'),
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet="utf-8" />
      </Head>
      <SEO
        locale={locale}
        ogImage={sharingImage}
        ogImageHeight={630}
        ogImageWidth={1200}
        pagePath={`/e/${company.micrositeSlug}`}
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

      <StaticNavContainer type="absolute">
        <RightNav />
      </StaticNavContainer>

      <div className="scroll-effect">
        <div className="static-content">
          <LeftNav />
          {staticContent}
        </div>
        <div className="scrollable-content">{scrollableContent}</div>
      </div>

      {children}
      <PageFooter />

      <CookieConsent />
    </div>
  )
}
