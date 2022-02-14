import { request } from 'graphql-request'

const space = process.env.NEXT_PUBLIC_CF_APP_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CF_APP_ACCESS_TOKEN

export async function fetchContent(query, variables) {
  try {
    const res = await request({
      document: query,
      requestHeaders: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      url: `https://graphql.contentful.com/content/v1/spaces/${space}`,
      variables: variables,
    })
    return res
  } catch (error) {
    console.error(
      `There was a problem retrieving entries with the query ${query}`
    )
    console.error(error)
  }
}
