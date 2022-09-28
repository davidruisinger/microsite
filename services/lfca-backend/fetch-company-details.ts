import { sdk } from './api'

export const fetchCompanyDetails = async (companyMicrositeSlug: string) => {
  const response = await sdk.companyDetails({
    input: {
      companyMicrositeSlug,
    },
  })

  return response.company
}
