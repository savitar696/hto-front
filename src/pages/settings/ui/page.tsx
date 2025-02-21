import { Button, Flex, Group, Input, InputAddon, Text } from "@chakra-ui/react"
import { Switch } from "@components/ui/switch"
import { useState, useEffect } from "react"
import { SiDiscord } from "react-icons/si"
import { useUser } from "@entities/user"
import { useQuery } from "@tanstack/react-query"
import { api } from "@shared/lib/api"

interface SettingProps {
  id: number;
  type: string;
  value: string;
}

const fetchSettings = async (username: string) => {
  const response = await api.get<SettingProps[]>(`user/properties/${username}`, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return response.data
}

export const SettingsPage = () => {
  const { profile } = useUser((state) => state.payload)
  const { data } = useQuery({
    queryKey: ['settings'],
    queryFn: () => fetchSettings(profile.name),
  })
  const initialSound = localStorage.getItem("sound") !== "false"
  const [soundEnabled, setSoundEnabled] = useState(initialSound)

  const handleSoundToggle = (checked: boolean) => {
    setSoundEnabled(checked)
    localStorage.setItem("sound", checked.toString())
  }

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "sound") {
        setSoundEnabled(event.newValue !== "false")
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])
  const discordId = data?.find((item) => item.type === "discord_name")?.value || "";

  const LinkDiscord = () => {
    if (!discordId) {
      return <Button size={"xs"} variant="ghost" onClick={() => window.open(`https://discord.com/oauth2/authorize?client_id=1342539311181987941&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fdiscord%2Fauth%2Fcallback&scope=identify&state=${profile.name}`)}>Привязать</Button>
    }
    return <Button size={"xs"} variant="ghost" disabled>Привязано</Button>
  }

  return (
    <Flex direction="column" gap={4} p={4}>
      <Text fontSize="xl" fontWeight="bold">
        Настройки пользователя
      </Text>
      <Flex direction="row" gap={6} align="center">
        <Switch
          name="sound-toggle"
          checked={soundEnabled}
          onChange={() => handleSoundToggle(!soundEnabled)}
        >
          Включить звук в игре
        </Switch>
      </Flex>
      <Group flex="1" maxWidth={400} attached>
        <InputAddon><SiDiscord /></InputAddon>
        <Input
          flex={"1"}
          placeholder={"Привяжите аккаунт"}
          value={discordId}
        />
        <InputAddon><LinkDiscord /></InputAddon>
      </Group>
    </Flex>
  )
}
