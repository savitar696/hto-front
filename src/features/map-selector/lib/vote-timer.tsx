import { useEffect, useState } from "react"
import { getRandomMap } from "./random-map"

export const VoteTimer = ({
  voteRightEnd,
  handleBan,
  availableMaps,
}: {
  voteRightEnd: number
  handleBan: (map: string) => void
  availableMaps: string[]
}) => {
  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, Math.floor((voteRightEnd - Date.now()) / 1000)),
  )

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now()
      const timeRemaining = voteRightEnd - now
      if (timeRemaining > 0) {
        setTimeLeft(Math.floor(timeRemaining / 1000))
      } else {
        setTimeLeft(0)
        const randomMap = getRandomMap(availableMaps)
        if (randomMap) handleBan(randomMap)
      }
    }
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [availableMaps, handleBan, voteRightEnd])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <>
      {minutes}:{seconds.toString().padStart(2, "0")}
    </>
  )
}