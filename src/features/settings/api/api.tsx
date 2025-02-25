import { api } from "@shared/lib/api"
import { SettingProps } from "../types"

export const fetchSettings = async (username: string) => {
  const token = localStorage.getItem("token")

  const response = await api.get<SettingProps[]>(
    `user/properties/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
