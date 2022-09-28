import { getEntries } from './api'
import { ContentfulAction } from './models'

export const fetchAllActions = async () => {
  return await getEntries<ContentfulAction>('app', {
    content_type: 'action',
    include: 3,
    locale: 'en-US',
  })
}
