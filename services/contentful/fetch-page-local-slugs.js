import { getBadgeEntries } from './api'

export const fetchPageLocalSlugs = async () => {
  return await getBadgeEntries({
    content_type: 'pageLocal',
    include: 0,
    select: 'fields.slug',
  })
}
