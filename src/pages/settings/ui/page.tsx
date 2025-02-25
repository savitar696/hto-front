import { Flex, Group, Input, InputAddon, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { SiDiscord } from "react-icons/si"
import { useUser } from "@entities/user"
import { useSearchParams } from "react-router-dom"
import { toaster } from "@components/ui/toaster.tsx"
import {
  Banner,
  DiscordLink,
  SoundToggle,
  useSettings,
} from "@features/settings"

export const SettingsPage = () => {
  const { profile } = useUser((state) => state.payload)
  const { properties } = useSettings(profile.name)
  const [searchParams] = useSearchParams()

  const discordLinkStatus = searchParams.get("discord_link_status")
  const message = searchParams.get("message")

  useEffect(() => {
    if (!discordLinkStatus || !message) return

    const statusMap: Record<string, "success" | "info" | "error"> = {
      ok: "success",
      info: "info",
      error: "error",
    }

    const type = statusMap[discordLinkStatus]

    if (type) {
      toaster.create({ type, description: message })
    }

    window.history.replaceState({}, document.title, window.location.pathname)
  }, [discordLinkStatus, message])

  return (
    <Flex direction="column" gap={4} p={4}>
      <Text fontSize="xl" fontWeight="bold">
        Настройки пользователя
      </Text>
      <Banner username={profile.name} />
      <Flex direction="row" gap={6} align="center">
        <SoundToggle />
      </Flex>
      <Group flex="1" maxWidth={400} attached>
        <InputAddon>
          <SiDiscord />
        </InputAddon>
        <Input
          flex="1"
          placeholder="Привяжите аккаунт"
          aria-label="Привязка аккаунта Discord"
          value={properties.discord_name}
          readOnly
        />
        <InputAddon>
          <DiscordLink username={profile.name} />
        </InputAddon>
      </Group>
    </Flex>
  )
}
