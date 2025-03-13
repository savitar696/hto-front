import { api } from "@shared/api"

export const fetchProfileGames = async (username: string) => {
  return await api.get(`game/user/${username}`).then((data) => {
    return data
  })
}
