import * as contentful from 'contentful'

export const appClient = contentful.createClient({
  accessToken: process.env.CONTENTFUL_APP_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST,
  space: process.env.CONTENTFUL_APP_SPACE_ID,
})

export const badgeClient = contentful.createClient({
  accessToken: process.env.CONTENTFUL_BADGE_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST,
  space: process.env.CONTENTFUL_BADGE_SPACE_ID,
})
