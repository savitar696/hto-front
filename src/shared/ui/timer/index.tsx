import { FC } from "react"
import { Text } from "@chakra-ui/react"

interface TimerProps {
  time: number
}

export const Timer: FC<TimerProps> = ({ time }) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`

  return (
    <Text
      fontSize="48px"
      fontWeight="bold"
      color="white"
      fontFamily="monospace"
    >
      {formattedTime}
    </Text>
  )
}
