import { useQuery } from "@tanstack/react-query"
import { fetchRankings } from "./api"

export const useLeaderboard = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["rankings"],
    queryFn: fetchRankings,
    staleTime: 1000 * 60 * 15,
  })

  return {
    users: data?.data || [],
    isLoading,
    isError,
    error,
  }
}
