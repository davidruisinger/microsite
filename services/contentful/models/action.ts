import { Document } from '@contentful/rich-text-types'
import contentful from 'contentful'

import { ContentfulCategory } from './category'
import { ContentfulRequirement } from './requirement'

export interface ContentfulAction {
  aboutText: Document
  actionId: string
  badge: contentful.Asset
  benefits?: Document
  examples?: Document
  heroImage: contentful.Asset
  requirements: contentful.Entry<ContentfulRequirement>[]
  tags?: contentful.Entry<ContentfulCategory>[]
  title?: string
}
