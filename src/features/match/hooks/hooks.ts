import { useUser } from "@entities/user"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { GameState, GameStateText, MatchPick } from "./types"

export const socket = io("http://26.187.148.14:5000/queue")

export const useMatch = (id: string) => {
  const { profile } = useUser((state) => state.payload)
  const [picks, setPicks] = useState<MatchPick | null>(null)
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState<string | null>(null)

  useEffect(() => {
    const handleBanListener = (data: MatchPick) => {
      setPicks(data)
      setLoading(false)
      setState(
        GameStateText[data.state.toUpperCase() as keyof typeof GameStateText] ||
          null,
      )
      if (data.state == GameState.FINISHED) {
        gameSocket.disconnect()
        return
      }
    }

    const gameSocket = socket.connect()
    gameSocket.emit("ban.join", { game_id: id, name: profile.name })
    gameSocket.on("ban.listener", handleBanListener)

    const interval = setInterval(() => {
      if (gameSocket.connect()) {
        gameSocket.emit("ban.listener", { game_id: id, name: profile.name })
      }
    }, 5000)

    return () => {
      gameSocket.off("ban.listener", handleBanListener)
      clearInterval(interval)
      gameSocket.disconnect()
    }
  }, [id, profile.name])
  return { picks, loading, state }
}
