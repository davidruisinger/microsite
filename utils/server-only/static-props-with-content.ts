import { Entry } from 'contentful'
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import { ParsedUrlQuery } from 'querystring'

import {
  fetchAllBlocks,
  fetchAllMetaData,
  fetchAllNavigation,
} from '../../services/contentful'
import {
  ContentfulBlock,
  ContentfulMetaData,
  ContentfulNavigation,
} from '../../services/contentful/models'

interface DefaultProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface ContentProps extends DefaultProps {
  blocks: Entry<ContentfulBlock>[]
  metaData: Entry<ContentfulMetaData>[]
  navigations: Entry<ContentfulNavigation>[]
}

export const staticPropsWithContent =
  <
    Props extends DefaultProps = DefaultProps,
    Query extends ParsedUrlQuery = ParsedUrlQuery
  >(
    func: GetStaticProps<Props, Query>
  ) =>
  async (
    context: GetStaticPropsContext<Query>
  ): Promise<GetStaticPropsResult<ContentProps>> => {
    try {
      const pageProps = await func(context)

      if ('props' in pageProps) {
        const { items: blocks } = await fetchAllBlocks(context.locale)
        const { items: metaData } = await fetchAllMetaData(context.locale)
        const { items: navigations } = await fetchAllNavigation(context.locale)

        return {
          ...pageProps,
          props: {
            blocks,
            metaData,
            navigations,
            ...pageProps.props,
          },
        }
      }

      return pageProps
    } catch (e) {
      console.error(e)
      return {
        notFound: true,
        revalidate: 86400, // 24h
      }
    }
  }
