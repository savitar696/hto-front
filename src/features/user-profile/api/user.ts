import { api } from "@shared/api"

export const fetchProfile = async (username: string) => {
  return await api.get(`user/stats/${username}`)
}
