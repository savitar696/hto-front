import { Flex } from "@chakra-ui/react"
import { PlayerCard } from "@widgets/player-card"
import { Player } from "@features/map-selector/model"

export const TeamPlayers = ({ players }: { players: Player[] }) => {
  return (
    <Flex flexDirection={"column"} gap={2}>
      {players.map((player) => (
        <PlayerCard player={player} key={player.client_id} />
      ))}
    </Flex>
  )
}
