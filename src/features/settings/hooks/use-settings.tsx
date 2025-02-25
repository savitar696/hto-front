import { useQuery } from "@tanstack/react-query"
import { fetchSettings } from "../api"
type SettingsMap = Record<string, string>

export const useSettings = (username: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["settings", username],
    queryFn: () => fetchSettings(username),
  })

  const properties: SettingsMap =
    data?.reduce((acc, prop) => {
      acc[prop.type] = prop.value
      return acc
    }, {} as SettingsMap) || {}

  return { properties, ...rest }
}
