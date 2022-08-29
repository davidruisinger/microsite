import * as contentful from 'contentful'

const accessToken = process.env.CF_ACCESS_TOKEN || ''
const previewAccessToken = process.env.CF_PREVIEW_ACCESS_TOKEN || ''
const spaceId = process.env.CF_SPACE_ID || ''

export const appClient = contentful.createClient({
  accessToken: process.env.NEXT_PUBLIC_CF_APP_ACCESS_TOKEN,
  host: 'cdn.contentful.com',
  space: process.env.NEXT_PUBLIC_CF_APP_SPACE_ID,
})

export const badgeClient = contentful.createClient({
  accessToken: process.env.NEXT_PUBLIC_CF_BADGE_ACCESS_TOKEN,
  host: 'cdn.contentful.com',
  space: process.env.NEXT_PUBLIC_CF_BADGE_SPACE_ID,
})
