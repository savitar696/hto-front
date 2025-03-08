import { useQuery } from "@tanstack/react-query"
import { fetchSettings } from "../api"
import { useMemo } from "react"

type SettingsMap = {
  banner_url?: string
  discord_name?: string
  discord_id?: string
}

export const useSettings = (username: string) => {
  const { data, ...rest } = useQuery({
    enabled: !!username,
    queryKey: ["settings", username],
    queryFn: () => fetchSettings(username),
  })

  const properties = useMemo(() => {
    const defaults = {
      banner_url: "https://i.imgur.com/saiCDyI.jpeg",
      discord_name: "",
      discord_id: "",
    }

    if (!data) return defaults
    return data.reduce((acc, prop) => {
      if (prop.type in defaults) {
        acc[prop.type as keyof SettingsMap] =
          prop.value || defaults[prop.type as keyof SettingsMap]
      }
      return acc
    }, defaults as SettingsMap)
  }, [data])

  return { properties, ...rest }
}
