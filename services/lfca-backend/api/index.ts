import { GraphQLClient } from 'graphql-request'

import { getSdk } from './generated'

const client = new GraphQLClient(process.env.LFCA_GQL_API_URL, {
  headers: {
    authorization: `Bearer ${process.env.LFCA_GQL_API_ADMIN_TOKEN}`,
  },
})

export const sdk = getSdk(client)
