import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchProfile } from "../api/user"
import { ProfileHeader } from "./header"
import { fetchProfileGames } from "../api/game"
import { Flex, Spinner, Text } from "@chakra-ui/react"
import { ContentProfile } from "./content"
import { StatsContent } from "./stats"
import { motion } from "framer-motion"

const MotionFlex = motion(Flex)
export const UserProfile = ({ username }: { username: string }) => {
  const { data, isLoading: isProfileLoading } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => fetchProfile(username),
    placeholderData: keepPreviousData,
    enabled: !!username,
  })

  const {
    data: matchesData,
    isLoading: isMatchesLoading,
    error: matchesError,
  } = useQuery({
    queryKey: ["userMatches", username],
    queryFn: () => fetchProfileGames(username),
    placeholderData: keepPreviousData,
    enabled: !!username,
  })

  const profileData = data?.data || null
  const payloadMatches = matchesData?.data || null

  if (isProfileLoading || isMatchesLoading) {
    return (
      <Flex
        py={36}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Spinner size="xl" color="blue.500" />
        <Text fontSize="xl" fontWeight={500} mt={4}>
          Загружаем данные...
        </Text>
      </Flex>
    )
  }

  if (!profileData.data || matchesError) {
    return (
      <MotionFlex
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        direction="column"
        gap={6}
        p={6}
      >
        <Flex
          py={36}
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Text fontSize="3xl" fontWeight={500} mt={4}>
            Пользователь не найден
          </Text>
        </Flex>
      </MotionFlex>
    )
  }
  console.log()
  return (
    <MotionFlex
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      direction="column"
      gap={6}
      p={6}
    >
      <>
        <ProfileHeader payload={profileData.data} />
        <StatsContent payload={profileData.data} />
        <ContentProfile payload={payloadMatches.data} username={username} />
      </>
    </MotionFlex>
  )
}
