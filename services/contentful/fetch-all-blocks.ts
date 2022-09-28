import { getEntries } from './api'
import { ContentfulBlock } from './models'

export const fetchAllBlocks = async (locale = 'en') => {
  return await getEntries<ContentfulBlock>('badge', {
    content_type: 'block',
    include: 0,
    locale,
  })
}
