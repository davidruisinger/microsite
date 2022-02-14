import React from 'react'
import { CookiesProvider } from 'react-cookie'

import { TranslationProvider } from '../hooks/useTranslation'
import IsMobileProvider from '../utils/IsMobileProvider'

require('../assets/less/styles.less')

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <IsMobileProvider>
        <TranslationProvider>
          <Component {...pageProps} />
        </TranslationProvider>
      </IsMobileProvider>
    </CookiesProvider>
  )
}

export default MyApp
