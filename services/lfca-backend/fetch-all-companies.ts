import { sdk } from './api'
import { CompanyListItemFragment } from './api/generated'

export const fetchAllCompanies = async () => {
  const allData: CompanyListItemFragment[] = []
  let nextCursor: string | undefined | null

  while (nextCursor !== null) {
    const response = await sdk.companies({
      input: {
        cursor: nextCursor,
        take: 500,
      },
    })
    const { cursor, items } = response.companies

    allData.push(...items)
    nextCursor = cursor
  }

  return allData
}
