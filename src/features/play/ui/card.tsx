import { FC, useMemo } from "react"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { useUser } from "@entities/user"
import { useShallow } from "zustand/react/shallow"
import { JoinQueue } from "./ui"
import { useQueue } from "../hooks"

interface GameType {
  type: string
  image: string
  available: boolean
}

export const Card: FC<GameType> = ({ type, image, available }) => {
  const { payload } = useUser((state) => state)

  const cardStyles = useMemo(
    () => ({
      base: {
        height: "200px",
        maxW: "1200px",
        borderRadius: "16px",
        background: `url(${image}) center/cover no-repeat`,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        cursor: available ? "pointer" : "default",
        filter: available ? "grayscale(0)" : "grayscale(1)",
        transition: "all 0.2s ease-in-out",
      },
      hover: { filter: available ? "grayscale(0)" : "grayscale(1)" },
    }),
    [available, image],
  )

  return (
    <JoinQueue available={available} payload={payload}>
      <Box {...cardStyles.base} _hover={cardStyles.hover}>
        <Flex flexDirection="column" alignItems="center" mb={4}>
          <Heading color="white" fontWeight="semibold" fontSize="24px">
            {type}
          </Heading>
          <Text fontSize="14px" color="whiteAlpha.800" fontWeight="medium">
            {available ? `В очереди: 0` : "Недоступен"}
          </Text>
        </Flex>
      </Box>
    </JoinQueue>
  )
}
