import { getEntries } from './api'
import { ContentfulPageLocal } from './models'

export const fetchAllPageLocalSlugs = async () => {
  return await getEntries<Pick<ContentfulPageLocal, 'slug'>>('badge', {
    content_type: 'pageLocal',
    include: 0,
    select: 'fields.slug',
  })
}
