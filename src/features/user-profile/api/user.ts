import { api } from "@shared/lib/api"

export const fetchProfile = async (username: string) => {
  return await api.get(`user/stats/${username}`)
}
