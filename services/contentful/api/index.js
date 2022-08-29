import { createKey, getData, setData } from './cache'
import { appClient, badgeClient } from './client'
import { parseResponse } from './parse-response'

export const getAppEntry = async (id, query) => {
  const cacheKey = createKey({ ...query, id })

  const cachedData = getData(`app_${cacheKey}`)

  if (cachedData) {
    return cachedData
  } else {
    const response = await appClient.getEntry(id, query)

    const parsed = parseResponse(response)

    setData(cacheKey, parsed)

    return parsed
  }
}

export const getAppEntries = async (query) => {
  const cacheKey = createKey(query)

  const cachedData = getData(`app_${cacheKey}`)

  if (cachedData) {
    return cachedData
  } else {
    const response = await appClient.getEntries(query)

    const parsed = parseResponse({ fields: { items: response.items } })

    setData(cacheKey, parsed.items)

    return parsed.items
  }
}

export const getBadgeEntry = async (id, query) => {
  const cacheKey = createKey({ ...query, id })

  const cachedData = getData(`badge_${cacheKey}`)

  if (cachedData) {
    return cachedData
  } else {
    const response = await badgeClient.getEntry(id, query)

    const parsed = parseResponse(response)

    setData(cacheKey, parsed)

    return parsed
  }
}

export const getBadgeEntries = async (query) => {
  const cacheKey = createKey(query)

  const cachedData = getData(`badge_${cacheKey}`)

  if (cachedData) {
    return cachedData
  } else {
    const response = await badgeClient.getEntries(query)

    const parsed = parseResponse({ fields: { items: response.items } })

    setData(cacheKey, parsed.items)

    return parsed.items
  }
}
