import contentful from 'contentful'

import { ContentfulCategory } from './category'

export interface ContentfulCategoryTree {
  categoryId: string
  name: string
  isRootCategory?: boolean
  color?: 'blue' | 'yellow' | 'wine' | 'green'
  icon?: contentful.Asset
  elements?: (
    | contentful.Entry<ContentfulCategory>
    | contentful.Entry<ContentfulCategoryTree>
  )[]
}
