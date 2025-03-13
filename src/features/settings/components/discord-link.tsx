import { Button } from "@components/ui/button"
import { useSettings } from "../hooks"
import { api } from "@shared/api"
import { toaster } from "@components/ui/toaster"

export const DiscordLink = ({ username }: { username: string }) => {
  const { properties } = useSettings(username)

  const handleUnlink = async () => {
    try {
      const unlinkPromise = api.post(
        "/discord/unlink",
        { username },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )

      await toaster.promise(unlinkPromise, {
        loading: {
          title: "Отвязка...",
        },
        success: {
          title: "Отвязка прошла успешно",
          description: "Вы отвязали свой аккаунт Discord",
        },
        error: (error: any) => ({
          title: "Ошибка при отвязке",
          description: error.response?.data?.message || "Попробуйте позже",
        }),
      })
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
