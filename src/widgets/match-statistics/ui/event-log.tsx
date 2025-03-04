import { Event, Player } from "@entities/game"
import { Box, Flex, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { findPlayerById } from "@features/match/api/lib"
import { Avatar } from "@shared/ui/avatar/Avatar"
import { useColorMode } from "@components/ui/color-mode"

interface EventLogProps {
  events: Event[]
  players: Player[]
}

export const EventLog = ({ events, players }: EventLogProps) => {
  const navigate = useNavigate()
  const { colorMode } = useColorMode()

  const bgColor = colorMode === "dark" ? "black" : "gray.50"
  const textColor = colorMode === "dark" ? "whiteAlpha.900" : "gray.700"
  const boxBgColor = colorMode === "dark" ? "gray.900" : "white"

  console.log(players, events)

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md" bg={bgColor}>
      {events.map((event, index) => (
        <Flex key={index} mb={4} p={3} borderWidth={1} borderRadius="md" alignItems="center" flexDirection="row" bg={boxBgColor} boxShadow="sm">
          {/* <Box flex={1} borderLeftWidth={4} borderLeftColor={event.type === "kill" ? "red.500" : "blue.500"} pl={3}> */}
            {event.type === "kill" ? (
              <Flex alignItems="flex-start" justifyContent="space-between" width="100%">
                <Box display="flex" alignItems="center">
                  <Avatar username={findPlayerById(event.killer, players)?.username} styles={{ width: "30px", height: "30px", borderRadius: "20%" }}  />
                  <Text ml={2} color={textColor}>
                    Игрок <Box
                      as="span"
                      fontWeight="bold"
                      cursor="pointer"
                      onClick={() =>
                        navigate(
                          `/profile/${findPlayerById(event.target, players)?.username}`,
                        )
                      }
                    >{findPlayerById(event.killer, players)?.username || "Unknown"}</Box> убил игрока {" "}
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
                      {findPlayerById(event.target, players)?.username || "Unknown"}{" "}    
                    </Box>
                    и у него осталось <Box as="span" color="#f83f37">{event.killerHealth} HP</Box>
                  </Text>
                </Box>
                <Text fontSize="sm" color="gray.500" ml="auto">
                  {Math.floor(event.time / 60)} мин. {event.time % 60} сек
                </Text>
              </Flex>
            ) : event.type === "bedBreak" ? (
              <Flex alignItems="flex-start" justifyContent="space-between" width="100%">
                <Box display="flex" alignItems="center">
                  <Avatar username={findPlayerById(event.player, players)?.username} styles={{ width: "30px", height: "30px", borderRadius: "20%" }}  />
                  <Text ml={2} color={textColor}>
                    Игрок 
                    <Box
                      as="span"
                      fontWeight="bold"
                      cursor="pointer"
                      onClick={() =>
                        navigate(
                          `/profile/${findPlayerById(event.player, players)?.username}`,
                        )
                      }
                    > {" "}
                      {findPlayerById(event.player, players)?.username || "Unknown"}
                    </Box> сломал кровать команде 
                    <Box as="span" fontWeight="bold" color={event.team === "blue" ? "blue.500" : "red.500"}> {" "}
                      {event.team === "blue" ? "Синие" : "Красные"}
                    </Box>
                  </Text>
                </Box>
                <Text fontSize="sm" color="gray.500" ml="auto">
                  {Math.floor(event.time / 60)} мин. {event.time % 60} сек
                </Text>
              </Flex>
            ) : event.type === "reconnect" ? (
              <Text color={textColor}>
                Игрок {findPlayerById(event.player, players)?.username || "Unknown"} переподключился.
              </Text>
            ) : event.type === "leave" ? (
              <Text color={textColor}>
                Игрок {findPlayerById(event.player, players)?.username || "Unknown"} вышел.
              </Text>
            ) : event.type === "kick" ? (
              <Text color={textColor}>
                Игрок {findPlayerById(event.player, players)?.username || "Unknown"} был кикнут ({findPlayerById(event.executor, players)?.username || "Unknown"}).
              </Text>
            ) : null}
          {/* </Box> */}
        </Flex>
      ))}
    </Box>
  )
}
