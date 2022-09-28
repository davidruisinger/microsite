import contentful from 'contentful'

import { ContentfulLanguage } from './language'

export interface ContentfulMetaData {
  defaultLangKey?: string
  languages?: contentful.Entry<ContentfulLanguage>[]
  name?: string
}
