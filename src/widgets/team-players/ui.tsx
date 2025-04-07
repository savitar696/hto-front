import { Flex } from "@chakra-ui/react"
import { GamePlayer } from "@features/match/hooks"
import { PlayerCard } from "@widgets/player-card"

export const TeamPlayers = ({ players }: { players: GamePlayer[] }) => {
  return (
    <Flex flexDirection={"column"} gap={2} width={"100%"}>
      {players.map((player) => (
        <PlayerCard player={player} key={player.client_id} />
      ))}
    </Flex>
  )
}
