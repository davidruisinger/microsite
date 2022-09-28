import { Document } from '@contentful/rich-text-types'

export interface ContentfulPageLocal {
  bodyRichText?: Document
  metaDescription?: string
  slug: string
  title?: string
}
