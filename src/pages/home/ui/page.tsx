import { Box, Heading } from "@chakra-ui/react"

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
          Hard Tournament Organization
        </Heading>
        <Heading textAlign="center">
          Турниры и лиги Bedwars на новом уровне
        </Heading>
      </Box>
    </div>
  )
}
