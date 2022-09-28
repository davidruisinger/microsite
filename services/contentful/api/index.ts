import { EntryCollection } from 'contentful'

import { createKey, getData, setData } from './cache'
import { appClient, badgeClient } from './client'

export async function getEntries<T>(
  client: 'app' | 'badge',
  query: Record<string, string | number | boolean>
) {
  // NextJS only uses 2 character locales but contentful requires a more specific locale for english
  if (query.locale === 'en') {
    query.locale = 'en-US'
  }

  const cacheKey = createKey(query)

  const cachedData = getData<EntryCollection<T>>(cacheKey)

  if (cachedData) {
    return cachedData
  } else {
    const response = await (client === 'app'
      ? appClient
      : badgeClient
    ).getEntries<T>(query)

    const stringifiedData = response.stringifySafe()
    const parsed = JSON.parse(stringifiedData) as typeof response

    setData(cacheKey, parsed)

    return parsed
  }
}
