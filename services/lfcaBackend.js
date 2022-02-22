import { GraphQLClient } from 'graphql-request'

const apiUrl = process.env.GQL_API_URL
const accessToken = process.env.ADMIN_ACCESS_TOKEN

const graphQLClient = new GraphQLClient(apiUrl, {
  headers: {
    authorization: `Bearer ${accessToken}`,
  },
})

export async function fetchData(query, variables) {
  try {
    const res = await graphQLClient.request(query, variables)
    return res
  } catch (error) {
    console.error(
      `There was a problem retrieving entries with the query ${query}`
    )
    console.error(error)
  }
}
