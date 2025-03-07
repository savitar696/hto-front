import { Flex } from "@chakra-ui/react"
import { PlayerCard } from "@widgets/player-card"
import { Player } from "@features/map-selector/model"
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "@components/ui/menu"
import { useNavigate } from "react-router-dom"

export const TeamPlayers = ({ players }: { players: Player[] }) => {
  const navigate = useNavigate()
  return (
    <Flex flexDirection={"column"} gap={2} width={"100%"}>
      {players.map((player) => (
        <MenuRoot>
          <MenuTrigger flex="1">
            <PlayerCard player={player} key={player.client_id} />
          </MenuTrigger>
          <MenuContent>
            <MenuItem
              value="profile"
              onClick={() => navigate(`/profile/${player.name}`)}
            >
              Перейти на профиль
            </MenuItem>
            <MenuItem
              value="copy-name"
              onClick={() => navigator.clipboard.writeText(player.name)}
            >
              Скопировать ник
            </MenuItem>
            <MenuItem
              value="delete"
              color="fg.error"
              _hover={{ bg: "bg.error", color: "fg.error" }}
            >
              Пожаловаться
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      ))}
    </Flex>
  )
}
