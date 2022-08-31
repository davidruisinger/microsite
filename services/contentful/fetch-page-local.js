const safeJsonStringify = require('safe-json-stringify')
import { getBadgeEntries } from './api'

export const fetchPageLocal = async (slug) => {
  const res = await getBadgeEntries({
    content_type: 'pageLocal',
    'fields.slug': slug,
    include: 3,
  })

  const stringifiedData = safeJsonStringify(res)
  const parsed = JSON.parse(stringifiedData)

  return parsed[0]
}
