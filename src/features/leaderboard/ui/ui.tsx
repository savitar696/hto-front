import { Box, Text } from "@chakra-ui/react"
import { Avatar, AvatarGroup } from "@components/ui/avatar"
import { useColorModeValue } from "@components/ui/color-mode"
import { useNavigate } from "react-router-dom"
import { fetchRankings } from "../api"

export const RatingList = () => {
  const users: RankingData[] = fetchRankings().then((resp) => resp.data.data)
  return users.map((user, idx) => {})
}

interface Profile {
  id: string
  vime_id: string
  name: string
  user_id: string
  created_at: string
}

interface RankingData {
  id: string
  rating: number
  premium: boolean
  time_played: number
  created_at: string
  profile: Profile
}

export const PlayerBox = ({ id, name, rating, premium }: RankingData) => {
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
          <Text color={textColor}>#{id}</Text>
          <Text fontSize="18px" color={textColor}>
            {name}
          </Text>
        </Box>
        <AvatarGroup>
          <Avatar
            size="xl"
            name={name}
            shape="rounded"
            src={`https://skin.vimeworld.com/helm/${name}.png`}
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
