import { useEffect, useState } from "react"
import { useUser } from "@entities/user"
import { useQuery } from "@tanstack/react-query"
import { GameState, GameStateText, MatchPick } from "./types"
import { api } from "@shared/lib/api"
import { GamePayload, socket } from "@entities/game"
import { queryClient } from "@app/providers/with-query"

const EVENTS = {
  JOIN: "ban.join",
  LISTENER: "ban.listener",
  RESPONSE: "ban.join.response",
}

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

      if (data.state === GameState.FINISHED) {
        socket.on(EVENTS.RESPONSE, handleMatchResponse)
        socket.off(EVENTS.RESPONSE, handleMatchResponse)
        socket.disconnect()
      }
    }

    const handleMatchResponse = (gameData: GamePayload) => {
      queryClient.setQueryData(["match_game", id], { data: gameData })
    }

    const gameSocket = socket.connect()
    gameSocket.emit(EVENTS.JOIN, { game_id: id, name: profile.name })
    gameSocket.on(EVENTS.LISTENER, handleBanListener)

    const interval = setInterval(() => {
      if (gameSocket.connect()) {
        gameSocket.emit("ban.listener", { game_id: id, name: profile.name })
      }
    }, 5000)

    return () => {
      gameSocket.off(EVENTS.LISTENER, handleBanListener)
      clearInterval(interval)
      gameSocket.disconnect()
    }
  }, [id, profile.name])

  return { picks, loading, state }
}

export const useMatchData = (id: string) => {
  return useQuery({
    queryKey: ["match_game", id],
    queryFn: () => fetchMatch(id),
    staleTime: 1000 * 60 * 60,
  })
}

const fetchMatch = async (id: string) => {
  return await api.get(`game/${id}`).then((r) => {
    return r.data
  })
}

