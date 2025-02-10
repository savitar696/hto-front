import { useState, useCallback } from "react"
import { useUser } from "@entities/user"
import { useShallow } from "zustand/react/shallow"
import { socket } from "@features/match/hooks"

export const useMapBan = (game_id: string) => {
  const { profile } = useUser(useShallow((state) => state.payload))
  const [currentBan, setCurrentBan] = useState<string>("")
  const [isBanning, setIsBanning] = useState(false)

  const handleBan = useCallback(
    async (map: string) => {
      if (!map || !profile?.name) return

      try {
        setIsBanning(true)
        socket.emit("ban", {
          game_id: game_id,
          name: profile.name,
          ban_map: map,
        })
        setCurrentBan(map)
      } finally {
        setIsBanning(false)
      }
    },
    [game_id, profile?.name],
  )

  return { currentBan, isBanning, handleBan }
}
