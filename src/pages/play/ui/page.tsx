import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { useColorMode } from "@components/ui/color-mode"
import { PlayCards } from "@features/play"
import { useTitle } from "@shared/lib/hooks/use-title"
import { useEffect } from "react"

export const PlayPage = () => {
  const { set } = useTitle()
  const { colorMode } = useColorMode()
  useEffect(() => {
    set({ text: "Поиск игры" })
  }, [set])
  return (
    <Flex justifyContent="center" pt="16" gap="8" flexDirection="column">
      <Box display="flex" flexDirection="column" alignItems="center" gap="6">
        <Heading fontSize="46px" fontWeight="semibold">
          Выберите формат
        </Heading>
        <Text
          fontSize="18px"
          color={
            colorMode === "dark" ? "whiteAlpha.800" : "rgba(22, 22, 26, 0.6);"
          }
          fontWeight="medium"
        >
          Выберите формат для начала рейтинговой игры
        </Text>
      </Box>
      <Box>
        <PlayCards />
      </Box>
    </Flex>
  )
}
