import { Box, Flex, Text } from "@chakra-ui/react"
import { useUser } from "@entities/user"
import { useShallow } from "zustand/react/shallow"
import { MatchPick, useMapBan } from "../hooks"
import { VoteTimer } from "../lib/vote-timer"
import { Button } from "@components/ui/button"

export const MapSelector = ({
  picks,
  game_id,
}: {
  picks: MatchPick
  game_id: string
}) => {
  const { currentBan, isBanning, handleBan } = useMapBan(game_id)
  const { profile } = useUser(useShallow((state) => state.payload))
  const userPick = picks.vote_right
    ? picks.players[1].name
    : picks.players[0].name

  return (
    <Box borderRadius="md" p={6}>
      <Flex direction="column" align="center" mb={6}>
        <Text fontSize="md" fontWeight="semibold">
          Время для бана карты игроку {userPick}
        </Text>
        <Text fontSize="2xl" fontWeight="semibold" color="red.500">
          <VoteTimer voteRightEnd={picks.vote_right_end} />
        </Text>
      </Flex>

      <Flex direction="column" gap={4}>
        {picks.maps.map((map, i) => (
          <Flex
            key={i}
            bg="blackAlpha.50"
            p={2}
            borderRadius="md"
            justify="space-between"
            align="center"
          >
            <Text fontSize="md" fontWeight="semibold">
              {map}
            </Text>
            <Button
              colorScheme="blackAlpha"
              onClick={() => handleBan(map)}
              loading={isBanning && currentBan === map}
              disabled={profile?.name !== userPick}
            >
              Бан
            </Button>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}
