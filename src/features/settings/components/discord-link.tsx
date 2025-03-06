import { Button } from "@components/ui/button"
import { useSettings } from "../hooks"

export const DiscordLink = ({ username }: { username: string }) => {
  const { properties } = useSettings(username)

  if (!properties?.discord_name) {
    return (
      <Button
        size="xs"
        variant="ghost"
        onClick={() =>
          (window.location.href = `https://discord.com/oauth2/authorize?client_id=1342539311181987941&response_type=code&redirect_uri=https%3A%2F%2Fapi.hardtournaments.space%2Fapi%2Fdiscord%2Fauth%2Fcallback&scope=identify&state=${username}`)
        }
      >
        Привязать
      </Button>
    )
  }
  return (
    <Button size="xs">
      Привязано
    </Button>
  )
}
