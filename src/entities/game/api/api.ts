import { api } from "@shared/api"
import { useQuery } from "@tanstack/react-query"

export const fetchMatch = async (id: string) => {
  return await api.get(`game/${id}`)
}

export const useMatchQuery = (id: string) => {
  return useQuery({
    queryKey: ["match_game", id],
    queryFn: () => fetchMatch(id),
  })
}
