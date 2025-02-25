import { Event, Player } from "@entities/game"
import {
  TimelineContent,
  TimelineItem,
  TimelineRoot,
} from "@components/ui/timeline"
import { Box } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { GradientText } from "@shared/ui/premium-text/ui"
import { findPlayerById } from "../../../features/match/api/lib"

interface EventLogProps {
  events: Event[]
  players: Player[]
}

export const EventLog = ({ events, players }: EventLogProps) => {
  const navigate = useNavigate()

  return (
    <TimelineRoot>
      {events.map((event, index) => (
        <TimelineItem key={index}>
          <TimelineContent>
            {event.type === "kill" ? (
              <Box flex={1} flexDirection="row">
                Игрок {findPlayerById(event.killer, players)?.username || "Unknown"} убил игрока{" "}
                <Box
                  as="span"
                  fontWeight="bold"
                  cursor="pointer"
                  onClick={() =>
                    navigate(
                      `/profile/${findPlayerById(event.target, players)?.username}`,
                    )
                  }
                >
                  {findPlayerById(event.target, players)?.username || "Unknown"}
                </Box>{" "}
                и у него осталось {event.killerHealth} HP
              </Box>
            ) : (
              <Box>
                [BED BREAK] Время: {event.time}, Команда: {event.team}, Игрок:{" "}
                <Box
                  as="span"
                  fontWeight="bold"
                  cursor="pointer"
                  onClick={() =>
                    navigate(
                      `/profile/${findPlayerById(event.player, players)?.username}`,
                    )
                  }
                >
                  {findPlayerById(event.player, players)?.username || "Unknown"}
                </Box>
              </Box>
            )}
          </TimelineContent>
        </TimelineItem>
      ))}
    </TimelineRoot>
  )
}
