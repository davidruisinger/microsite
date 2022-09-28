import contentful from 'contentful'

import { ContentfulNavigationElement } from './navigation-element'

export interface ContentfulNavigation {
  elements?: contentful.Entry<
    ContentfulNavigation | ContentfulNavigationElement
  >[]
  menuId?: string
  title?: string
}
