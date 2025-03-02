import { useState, useCallback } from "react"
import { useSocket } from "@features/match/api"

export const useMapBan = (game_id: string, name: string) => {
  const [currentBan, setCurrentBan] = useState<string>("")
  const [isBanning, setIsBanning] = useState(false)
  const socket = useSocket()


  const handleBan = useCallback(
    async (map: string) => {
      if (!map) return

      try {
        setIsBanning(true)
        socket.emit("ban", {
          game_id: game_id,
          name: name,
          ban_map: map,
        })
        setCurrentBan(map)
      } finally {
        setIsBanning(false)
      }
    },
    [game_id, name, socket],
  )

  return { currentBan, isBanning, handleBan }
}
