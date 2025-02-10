import { Box, Icon, Skeleton, Stack, Text } from "@chakra-ui/react"
import { Avatar, AvatarGroup } from "@components/ui/avatar"
import { useColorModeValue } from "@components/ui/color-mode"
import { useNavigate } from "react-router-dom"
import { fetchRankings } from "../api"
import { useQuery } from "@tanstack/react-query"
import { PlayerBoxProps, RankingData } from "../api/types"

export const RatingList = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["rankings"],
    queryFn: fetchRankings,
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) return <SkeletonRatingList />
  if (isError) return <Text color="red.500">Ошибка: {error.message}</Text>
  const users = data?.data.data || []

  if (users.length === 0) return <EmptyRatingList />

  return (
    <>
      {users.map((user: RankingData, index) => (
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

export const PlayerBox = ({
  index,
  id,
  name,
  rating,
  premium,
}: PlayerBoxProps) => {
  const bg = useColorModeValue("gray.100", "#0F0E14")
  const hoverBg = useColorModeValue("gray.200", "#07060a")
  const borderColor = useColorModeValue("gray.300", "#252332")
  const textColor = useColorModeValue("black", "white")

  const navigate = useNavigate()

  return (
    <Box
      transition="all 200ms ease"
      cursor="pointer"
      bg={bg}
      p="15px"
      borderRadius="15px"
      width="100%"
      outline={`2px solid ${borderColor}`}
      _hover={{ bg: hoverBg, transform: "scale(0.9)" }}
      onClick={() => navigate(`/profile/${name}`)}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        gap="16"
      >
        <Box display="flex" flexDirection="row" alignItems="center" gap="2">
          <Text color={textColor}>#{index}</Text>
          <Text fontSize="18px" color={textColor}>
            {name}
          </Text>
        </Box>
        <AvatarGroup radius="full   ">
          <Avatar
            size="xl"
            name={name}
            src={`https://skin.vimeworld.com/helm/${name}.png`}
            bg={useColorModeValue("gray.200", "gray.700")}
          />
        </AvatarGroup>
      </Box>
      <Box display="flex" alignItems="center" flexDirection="row" gap="2">
        <Text color="gray.400">Игрок</Text>
        <Text color={textColor}>{rating}</Text>
      </Box>
    </Box>
  )
}
