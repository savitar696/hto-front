import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { useMapBan } from "../model"
import { VoteTimer } from "../lib/vote-timer"
import { Button } from "@shared/ui/button"
import { getMapKey } from "@features/user-profile/model/map"
import { MapImages, MapName } from "@shared/config"
import { useColorModeValue } from "@components/ui/color-mode"
import { MatchPick } from "@features/match/hooks/types"

export const MapSelector = ({
  picks,
  game_id,
}: {
  picks: MatchPick
  game_id: string
}) => {
  const userPick = picks.vote_right
    ? picks.teams[1].players[0].name
    : picks.teams[0].players[0].name
  const { handleBan } = useMapBan(game_id)
  const bgColor = useColorModeValue("white", "#0d0d0d")

  return (
    <Box borderRadius="md" p={6}>
      <Flex direction="column" align="center" mb={6}>
        <Text fontSize="md" fontWeight="semibold">
          Время для бана карты игроку {userPick}
        </Text>
        <Text fontSize="2xl" fontWeight="semibold" color="red.500">
          <VoteTimer
            voteRightEnd={picks.vote_right_end}
            handleBan={handleBan}
            availableMaps={picks.maps}
          />
        </Text>
      </Flex>

      <Flex direction="column" gap={4}>
        {picks.maps.map((map, i) => (
          <Flex
            key={i}
            bg={bgColor}
            p={2}
            borderRadius="md"
            justify="space-between"
            align="center"
          >
            <Flex alignItems="center" gap="2">
              <Image
                src={MapImages[MapName[getMapKey(map)!]]}
                height="40px"
                width="90px"
                borderRadius="4px"
                backgroundPosition="center center"
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
              />
              <Text fontSize="md" fontWeight="semibold">
                {map}
              </Text>
            </Flex>
            <Button
              onClick={() => handleBan(map)}
              styles={{
                backgroundColor: "var(--black100)",
                color: "var(--white100)",
              }}
              //   loading={isBanning && currentBan === map}
              //   disabled={profile?.name !== userPick}
            >
              Бан
            </Button>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}
