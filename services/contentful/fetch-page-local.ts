import { getEntries } from './api'
import { ContentfulPageLocal } from './models'

export const fetchPageLocal = async (slug: string, locale = 'en') => {
  const res = await getEntries<ContentfulPageLocal>('badge', {
    content_type: 'pageLocal',
    'fields.slug': slug,
    include: 3,
    locale,
  })

  return res.items[0]
}
