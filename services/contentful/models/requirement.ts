import { Document } from '@contentful/rich-text-types'

export interface ContentfulRequirement {
  howTo?: Document
  reqId: string
  title?: string
}
