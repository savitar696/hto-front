import { Container, Grid, Text } from "@chakra-ui/react"
import { useColorModeValue } from "@components/ui/color-mode"
import { RatingList } from "@features/leaderboard/ui"

export const LeaderboardPage = () => {
  const textColor = useColorModeValue("black", "white")

  return (
    <Container
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap="4"
      mt="2"
    >
      <Text fontSize="3xl" color={textColor}>
        Leaderboard
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap="20px" placeContent="center">
        <RatingList />
      </Grid>
    </Container>
  )
}
