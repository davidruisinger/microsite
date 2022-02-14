import Head from 'next/head'
import React from 'react'

import { findLangKeyByUrl } from '../../utils'
import config from '../../utils/siteConfig'
import CookieConsent from '../CookieConsent'
import PageFooter from './PageFooter'
import PageHeader from './PageHeader'

const Template = ({ activeCompany, children }) => {
  return (
    <div className="siteRoot">
      <Head>
        <title>{config.siteTitle}</title>
        <meta charSet="utf-8" />
      </Head>

      <>
        <div className="siteContent">
          <PageHeader activeCompany={activeCompany} />
          {children}
          <CookieConsent
            buttonText="I accept"
            cookieName="cookie_consent"
            cookieValue="consent"
            declineButtonText="Decline"
            declineCookieValue="declined"
          >
            <div className="title">Cookie Settings </div>
            <div className="description">
              {`While Cookies won't save our planet, they do help us to measure
                our reach & impact. Can we set the following Cookies?`}
            </div>
          </CookieConsent>
        </div>
        <PageFooter />
      </>
    </div>
  )
}

export default Template
