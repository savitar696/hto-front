import { Box, Flex, Text } from "@chakra-ui/react"
import { Avatar } from "@components/ui/avatar"
import { Player } from "@features/match/hooks"

export const PlayerCard = ({ player }: { player: Player }) => {
  return (
    <Box
      key={player.client_id}
      borderRadius="md"
      border="1px solid"
      borderColor="blackAlpha.100"
    >
      <Flex p={4} align="center" gap={4}>
        <Avatar
          name={player.name}
          src={`https://skin.vimeworld.com/helm/${player.name}.png`}
          size="md"
        />
        <Text fontSize="md" fontWeight="semibold">
          {player.name}
        </Text>
      </Flex>

      {/* <Flex borderTop="1px solid" borderColor="blackAlpha.100">
          <Box width="30%" borderRight="1px solid" borderColor="blackAlpha.100">
            <Text
              p={2}
              fontSize="sm"
              borderBottom="1px solid"
              borderColor="blackAlpha.100"
            >
              Всего
            </Text>
            <Box p={2}>
              <Text fontSize="md">0</Text>
              <Text fontSize="xs" color="blackAlpha.600">
                Матчи
              </Text>
            </Box>
          </Box>

          <Box width="70%">
            <Text
              p={2}
              fontSize="sm"
              borderBottom="1px solid"
              borderColor="blackAlpha.100"
            >
              Последние 10 матчей
            </Text>
            <Flex>
              {["0%", "0", "0.0"].map((val, j) => (
                <Box
                  key={j}
                  p={2}
                  flex={1}
                  borderRight={j < 2 ? "1px solid" : "none"}
                  borderColor="blackAlpha.100"
                >
                  <Text fontSize="md">{val}</Text>
                  <Text fontSize="xs" color="blackAlpha.600">
                    {["Побед", "Убийств", "K/D"][j]}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box>
        </Flex> */}
    </Box>
  )
}
