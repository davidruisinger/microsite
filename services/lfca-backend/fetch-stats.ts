import { sdk } from './api'

export const fetchStats = async () => {
  const response = await sdk.counterStats()

  return response.counterStats
}
