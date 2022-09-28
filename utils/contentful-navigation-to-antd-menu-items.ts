import { MenuProps } from 'antd'
import { Entry } from 'contentful'

import {
  ContentfulNavigation,
  ContentfulNavigationElement,
} from '../services/contentful/models'
import { replaceVars } from './replace-vars'

export const contentfulNavigationToAntdMenuItems = (
  navigation: Entry<ContentfulNavigation>,
  vars?: Record<string, string>
): NonNullable<MenuProps['items']> => {
  return (
    navigation.fields.elements?.map((item) => {
      if ('elements' in item.fields) {
        const { menuId, title } = item.fields
        return {
          children: contentfulNavigationToAntdMenuItems(item),
          key: menuId || '',
          label: vars ? replaceVars(title || '', vars) : title,
        }
      } else {
        const { slug, title, url } = (
          item as Entry<ContentfulNavigationElement>
        ).fields
        return {
          key: slug || url || '',
          label: vars ? replaceVars(title || '', vars) : title,
        }
      }
    }) || []
  )
}
