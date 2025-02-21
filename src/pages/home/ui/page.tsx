import { Box, Heading } from "@chakra-ui/react"
import { GradientText } from "@shared/ui/premium-text/ui"

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
          <GradientText
            fontSize="4xl"
            fontWeight="bold"
            colors={["teal.300", "purple.500", "blue.500"]}
            duration="3s"
            direction="45deg"
          >
            Hard Tournament Organization
          </GradientText>
        </Heading>
        <Heading textAlign="center">
          Турниры и лиги Bedwars на новом уровне
        </Heading>
      </Box>
    </div>
  )
}
