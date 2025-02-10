import { useEffect, useState } from "react"

export const VoteTimer = ({ voteRightEnd }: { voteRightEnd: number }) => {
  const [timeLeft, setTimeleft] = useState(0)
  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now()
      const timeRemaining = voteRightEnd - now
      if (timeRemaining > 0) {
        setTimeleft(Math.floor(timeRemaining / 1000))
      } else {
        setTimeleft(0)
      }
    }
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [voteRightEnd])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </>
  )
}
