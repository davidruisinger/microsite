import 'antd/dist/antd.less'
import '../styles/global.less'

import type { AppProps } from 'next/app'

import { ContentProvider } from '../hooks'
import { ContentProps } from '../utils/server-only'

function MyApp({ Component, pageProps }: AppProps<ContentProps>) {
  const { blocks, metaData, navigations } = pageProps

  return (
    <ContentProvider
      blocks={blocks}
      metaData={metaData}
      navigations={navigations}
    >
      <Component {...pageProps} />
    </ContentProvider>
  )
}

export default MyApp
