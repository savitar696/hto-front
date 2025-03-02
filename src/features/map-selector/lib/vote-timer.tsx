import { useEffect, useState } from "react"
import { getRandomMap } from "./random-map"

const getMoscowTime = (): number => {
  const now = new Date()

  const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000
  
  return utcTime + (3 * 60 * 60 * 1000)
}

export const VoteTimer = ({
  voteRightEnd,
  handleBan,
  availableMaps,
}: {
  voteRightEnd: number // Предполагается, что это время окончания в МСК
  handleBan: (map: string) => void
  availableMaps: string[]
}) => {
  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, Math.floor((voteRightEnd - getMoscowTime()) / 1000)),
  )

  useEffect(() => {
    const updateTimer = () => {
      const moscowNow = getMoscowTime()
      const timeRemaining = voteRightEnd - moscowNow
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
