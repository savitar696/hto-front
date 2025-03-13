import { api } from "@shared/api"

export const fetchRankings = async () => {
  const response = await api.get("user/ranking")
  return response.data
}
