import { Box, Flex, Text } from "@chakra-ui/react"
import { GamePayload } from "@entities/game"

interface MatchCardProps extends GamePayload {
  username: string
}

export const ContentProfile = ({
  payload,
  username,
}: {
  payload: GamePayload[]
  username: string
}) => {
  return (
    <Flex justifyContent="center" paddingY={2}>
      <Flex direction="column" minWidth={1200} gap="2">
        <Text fontWeight={600}>Последние матчи</Text>
        <Flex direction="row" gap="8">
          {payload
            .filter((match) => !["load", "temp"].includes(match.map_id))
            .sort((a, b) => b["ended_at"].localeCompare(a["ended_at"]))
            .map((match) => (
              <MatchCard key={match.id} {...match} username={username!} />
            ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

const MatchCard = ({ map_name, winners, username }: MatchCardProps) => {
  const response = JSON.parse(
    typeof winners === "string" ? winners : JSON.stringify(winners),
  )
  const result = response.winners.some((user: any) => user.name === username)
  return (
    <Box
      borderRadius="12px"
      backgroundImage="url(https://i.imgur.com/HA5Nhi0.jpeg)"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      width="200px"
      height="300px"
      position="relative"
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
