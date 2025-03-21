import { useEffect, useState } from "react"
import { DateTime } from 'luxon';

export const VoteTimer = ({
  voteRightEnd,
  handleBan,
  availableMaps,
}: {
  voteRightEnd: number
  handleBan: (map: string) => void
  availableMaps: string[]
}) => {

  const getMoscowTime = () => {
    return DateTime.now().setZone('Europe/Moscow')
  }

  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, Math.floor((voteRightEnd - getMoscowTime().toMillis()) / 1000)),
  )

  useEffect(() => {
    const updateTimer = () => {
      const now = getMoscowTime().toMillis()

      const newTimeLeft = Math.max(0, Math.floor((voteRightEnd - now) / 1000))
      setTimeLeft(newTimeLeft)
    }
    const interval = setInterval(updateTimer, 1000)
    updateTimer()

    return () => clearInterval(interval)
  }, [availableMaps, handleBan, voteRightEnd])

  const formatTimeLeft = () => {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0')
    const seconds = String(timeLeft > 0 ? (timeLeft % 60) + 1 : 0).padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  return (
    <>
      {formatTimeLeft()}
    </>
  )
}