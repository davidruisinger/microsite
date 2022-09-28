import { getEntries } from './api'
import { ContentfulNavigation } from './models'

export const fetchAllNavigation = async (locale = 'en') => {
  return await getEntries<ContentfulNavigation>('badge', {
    content_type: 'navigation',
    include: 2,
    locale,
  })
}
