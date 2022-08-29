const safeJsonStringify = require('safe-json-stringify')
import { getAppEntries } from './api'

export const fetchAllActions = async () => {
  const res = await getAppEntries({
    content_type: 'action',
    include: 3,
    locale: 'en-US',
  })

  const stringifiedData = safeJsonStringify(res)
  const parsed = JSON.parse(stringifiedData)

  return parsed
}
