/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex, Grid, Text } from "@chakra-ui/react"
import { GamePayload } from "@entities/game"
import { MapImages, MapName } from "@shared/config"
import { getMapKey, isWinner } from "../model/map"
import { useNavigate } from "react-router-dom"

interface MatchCardProps extends GamePayload {
  username: string
  handleClick: () => void
}
export const ContentProfile = ({
  payload,
  username,
}: {
  payload: any
  username: string
}) => {
  const navigate = useNavigate()
  return (
    <Flex justifyContent="center" paddingY={2}>
      <Flex direction="column" gap="2">
        <Text fontWeight={600}>Последние матчи</Text>
        <Grid templateColumns="repeat(5, 1fr)" gap="20px" placeContent="center">
          {payload
            .filter(
              (match: GamePayload) => !["load", "temp"].includes(match.map_id),
            )
            .sort((a: any, b: any) =>
              b["created_at"].localeCompare(a["created_at"]),
            )
            .map((match: GamePayload) => (
              <MatchCard
                key={match.id}
                {...match}
                username={username!}
                handleClick={() => navigate("/match/" + match.id)}
              />
            ))}
        </Grid>
      </Flex>
    </Flex>
  )
}

const MatchCard = ({
  map_name,
  winners,
  username,
  handleClick,
}: MatchCardProps) => {
  const result = isWinner(winners, username)
  return (
    <Box
      borderRadius="12px"
      backgroundImage={`url(${MapImages[MapName[getMapKey(map_name)!]]})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      width="200px"
      height="300px"
      position="relative"
      cursor="pointer"
      onClick={handleClick}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="blackAlpha.600"
        borderRadius="12px"
      >
        {/* <Flex justify={"flex-end"} p={3}>
          <Box borderRadius="xl" bg="whiteAlpha.300" p={1} px={2}>
            <Text fontWeight={600} color="white" fontSize={"14px"}>
              +24
            </Text>
          </Box>
        </Flex> */}
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          p="4"
          py="6"
          bg="linear-gradient(transparent, rgba(0,0,0,0.7))" // Градиент для читаемости
          lineHeight={0.8}
        >
          <Text
            color="white"
            fontSize="20px"
            fontWeight="600"
            textShadow="0 2px 4px rgba(0,0,0,0.5)"
          >
            {map_name}
          </Text>
          <Text
            color={result ? "green.500" : "red.500"}
            fontWeight={500}
            mt="2"
            fontSize={"14px"}
          >
            {result ? "Победа" : "Поражение"}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
