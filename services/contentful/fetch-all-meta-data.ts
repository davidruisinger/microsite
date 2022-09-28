import { getEntries } from './api'
import { ContentfulMetaData } from './models'

export const fetchAllMetaData = async (locale = 'en') => {
  return await getEntries<ContentfulMetaData>('badge', {
    content_type: 'metaData',
    include: 1,
    locale,
  })
}
