import { Box, Skeleton, Stack, Text } from "@chakra-ui/react"
import { useLeaderboard } from "../api"
import { PlayerBox } from "./player-box"

export const RatingList = () => {
  const { users, isLoading, isError, error } = useLeaderboard()

  if (isLoading) return <SkeletonRatingList />
  if (isError) return <Text color="red.500">Ошибка: {error?.message}</Text>
  if (users.length === 0) return <EmptyRatingList />

  return (
    <>
      {users.map((user, index) => (
        <PlayerBox
          key={user.id}
          index={index + 1}
          id={user.id}
          name={user.profile.name}
          rating={user.rating}
          premium={user.premium}
        />
      ))}
    </>
  )
}

const SkeletonRatingList = () => (
  <Stack spaceX={3}>
    {[...Array(5)].map((_, i) => (
      <Skeleton key={i} height="80px" borderRadius="xl" />
    ))}
  </Stack>
)

const EmptyRatingList = () => (
  <Box textAlign="center" py={10}>
    <Text fontSize="xl">Рейтинг пуст</Text>
  </Box>
)
