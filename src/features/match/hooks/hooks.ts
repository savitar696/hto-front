import { useEffect, useState } from "react"
import { useUser } from "@entities/user"
import { useQuery } from "@tanstack/react-query"
import { GameState, GameStateText, MatchPick } from "./types"
import { api } from "@shared/api"
import { socket } from "@entities/game"
import { useSocketEvent } from "./socket.event"

const EVENTS = {
  JOIN: "ban.join",
  LISTENER: "ban.listener",
  RESPONSE: "ban.join.response",
  TICKER: "ban.ticker",
}

export const useMatch = (id: string) => {
  const { profile } = useUser((state) => state.payload)
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState<string | null>(null)

  const picks = useSocketEvent<MatchPick>({ event: EVENTS.LISTENER })
  console.log(picks)
  useEffect(() => {
    if (picks) {
      setLoading(false)
      setState(
        GameStateText[
          picks.state.toUpperCase() as keyof typeof GameStateText
        ] || null,
      )
      if (picks.state === GameState.FINISHED) {
        socket.off(EVENTS.RESPONSE)
        socket.disconnect()
      }
    }
  }, [picks])

  useEffect(() => {
    socket.connect()
    socket.emit(EVENTS.JOIN, { game_id: id, name: profile.name })
    socket.emit(EVENTS.LISTENER, { game_id: id, name: profile.name })

    return () => {
      socket.disconnect()
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
