const safeJsonStringify = require('safe-json-stringify')
import { getBadgeEntries } from './api'

export const fetchAllMeta = async (locale) => {
  const convertedLocale = locale === 'en' ? 'en-US' : locale

  const res = await getBadgeEntries({
    content_type: 'metaData',
    include: 1,
    locale: convertedLocale,
  })

  const stringifiedData = safeJsonStringify(res)
  const parsed = JSON.parse(stringifiedData)

  return parsed
}
