import {
  Flex,
  Box,
  Text,
  Input,
  InputAddon,
  Group,
  Skeleton,
} from "@chakra-ui/react"
import { SiDiscord } from "react-icons/si"
import { useEffect } from "react"
import { useUser } from "@entities/user"
import { useSearchParams } from "react-router-dom"
import { toaster } from "@components/ui/toaster.tsx"
import { Banner, DiscordLink, useSettings } from "@features/settings"
import { useColorModeValue } from "@components/ui/color-mode"

export const SettingsPage = () => {
  const { profile } = useUser((state) => state.payload)
  const { properties, isLoading: isSettingsLoading } = useSettings(profile.name)
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

  const bgColor = useColorModeValue("white", "#000000")
  const textColor = useColorModeValue("black", "#e0e0e0")
  const cardBgColor = useColorModeValue("white", "#1a1a1a")

  return (
    <Flex
      direction="column"
      gap={6}
      p={6}
      bg={bgColor}
      borderRadius="md"
      boxShadow="md"
    >
      <Text fontSize="2xl" fontWeight="bold" color={textColor}>
        Настройки профиля
      </Text>
      <Flex direction="row" gap={6} align="center">
        <Banner username={profile.name} />
      </Flex>
      <Box bg={cardBgColor} p={4} borderRadius="md" boxShadow="sm">
        <Text fontSize="lg" fontWeight="bold" mb={2} color={textColor}>
          Социальные сети
        </Text>
        {isSettingsLoading ? (
          <Skeleton height="40px" width="100%" />
        ) : (
          <Group mb={4} attached>
            <InputAddon>
              <SiDiscord />
            </InputAddon>
            <Input
              placeholder="Привяжите аккаунт"
              aria-label="Привязка аккаунта Discord"
              value={properties.discord_name}
              readOnly
            />
            <InputAddon>
              <DiscordLink username={profile.name} />{" "}
            </InputAddon>
          </Group>
        )}
      </Box>
      {/* <Box
        bg={cardBgColor}
        p={4}
        borderRadius="md"
        boxShadow="sm"
        textAlign="center"
      >
        <Text fontSize="lg" fontWeight="bold" mb={2} color={textColor}>
          Платная подписка Premium
        </Text>
        <Text color="gray.500">
          Получите новые впечатления от игры и уникальные функции на нашем сайте
          с временной подпиской.
        </Text>
      </Box> */}
    </Flex>
  )
}
