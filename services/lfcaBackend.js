import { gql, request } from 'graphql-request'

const apiUrl = process.env.GQL_API_URL
const accessToken = process.env.ADMIN_ACCESS_TOKEN

export async function fetchData(query, variables) {
  try {
    const res = await request({
      document: query,
      requestHeaders: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      url: apiUrl,
      variables,
    })
    return res
  } catch (error) {
    console.error(
      `There was a problem retrieving entries with the query ${query}`
    )
    console.error(error)
  }
}
