import { Button } from "@components/ui/button"
import { useSettings } from "../hooks"
import { api } from "@shared/api"
import { successToast } from "@shared/lib/utils"
import toast from "react-hot-toast"

export const DiscordLink = ({ username }: { username: string }) => {
  const { properties } = useSettings(username)

  const handleUnlink = async () => {
    try {
      await api.post(
        "/discord/unlink",
        { username },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      return toast.success(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
          }}
        >
          <span
            style={{
              color: "var(--white100)",
              fontWeight: "var(--fontWeights-semibold)",
            }}
          >
            Успех
          </span>
          <span
            style={{
              color: "var(--white60)",
              fontWeight: "var(--fontWeights-medium)",
              fontSize: "var(--fontSizes-0)",
            }}
          >
            Вы успешно отвязали свой аккаунт Discord
          </span>
        </div>,
        successToast,
      )
    } catch (error) {
      console.error("Unlink error:", error)
    }
  }

  if (!properties?.discord_name) {
    return (
      <Button
        size="xs"
        variant="ghost"
        fontSize="14px"
        onClick={() =>
          (window.location.href = `https://discord.com/oauth2/authorize?client_id=1342539311181987941&response_type=code&redirect_uri=https%3A%2F%2Fapi.hardtournaments.space%2Fapi%2Fdiscord%2Fauth%2Fcallback&scope=identify&state=${username}`)
        }
      >
        Привязать
      </Button>
    )
  }

  return (
    <Button size="xs" variant="ghost" onClick={handleUnlink} fontSize="14px">
      Отвязать
    </Button>
  )
}
