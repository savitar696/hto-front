import { Flex } from "@chakra-ui/react"
import { Player } from "@features/match/hooks"
import { PlayerCard } from "@widgets/player-card"

export const TeamPlayers = ({ players }: { players: Player[] }) => {
  return (
    <Flex flexDirection={"column"} gap={2}>
      {players.map((player) => (
        <PlayerCard player={player} key={player.client_id} />
      ))}
    </Flex>
  )
}
