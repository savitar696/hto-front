import { api } from "@shared/lib/api"

export const fetchRankings = async () => {
  return await api.get("user/ranking")
}
