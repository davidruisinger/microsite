import { GraphQLClient } from 'graphql-request'

import { getSdk } from './generated'

const client = new GraphQLClient(process.env.LFCA_GQL_API_URL || '', {
  headers: {
    authorization: `Bearer ${process.env.LFCA_GQL_API_ADMIN_TOKEN}`,
    'x-graphql-client-name': 'lfca-badge',
    'x-graphql-client-version':
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'local',
  },
})

export const sdk = getSdk(client)
