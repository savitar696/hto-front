import { Box, Grid, Skeleton, Text } from "@chakra-ui/react"
import { PlayerBoxProps, useLeaderboard } from "../api"
import { PlayerBox } from "./player-box"

export const RatingList = () => {
  const { users, isLoading, isError, error } = useLeaderboard()

  if (isLoading) return <SkeletonRatingList />
  if (isError) return <Text color="red.500">Ошибка: {error?.message}</Text>
  if (users.length === 0) return <EmptyRatingList />

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="20px" placeContent="center">
      {users.map((user: PlayerBoxProps, index: number) => (
        <PlayerBox
          key={user.id}
          index={index + 1}
          id={user.id}
          name={user.profile!.name}
          rating={user.rating}
          premium={user.premium}
        />
      ))}
    </Grid>
  )
}

const SkeletonRatingList = () => (
  <Grid templateColumns="repeat(3, 1fr)" gap="20px" placeContent="center">
    {[...Array(9)].map((_, i) => (
      <Skeleton key={i} borderRadius="xl">
        <Text>Hello</Text>
        <PlayerBox
          key={i}
          index={i}
          id={"asd"}
          name={"UnnamedUser"}
          rating={0}
        />
      </Skeleton>
    ))}
  </Grid>
)

const EmptyRatingList = () => (
  <Box textAlign="center" py={10}>
    <Text fontSize="xl">Рейтинг пуст</Text>
  </Box>
)
