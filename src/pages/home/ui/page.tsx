import { Box, Heading } from "@chakra-ui/react"
import { RainbowText } from "@shared/ui/rainbow-text"

export const HomePage = () => {
  return (
    <div style={{ minHeight: "calc(100vh - 333px)" }}>
      <Box pt="16px">
        <Heading
          fontSize="36px"
          lineHeight="68px"
          textAlign="center"
          fontWeight="medium"
        >
          <RainbowText blur={false}>Hard Tournament Organization</RainbowText>
        </Heading>
        <Heading textAlign="center">
          Турниры и лиги Bedwars на новом уровне
        </Heading>
      </Box>
    </div>
  )
}
