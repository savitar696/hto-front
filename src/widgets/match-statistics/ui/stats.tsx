import { Box, Flex, Text, Table } from "@chakra-ui/react"
import { Avatar } from "@components/avatar"
import { Event, Player } from "@entities/game"
import { countStatsPlayer } from "@features/match/api/lib"
import { GradientText } from "@shared/ui/premium-text/ui"
import { useNavigate } from "react-router-dom"
import { sortPlayersByKills } from "../lib"

export const MatchStats = ({
  winners = [],
  losers = [],
  events = [],
}: {
  winners: Player[]
  losers: Player[]
  events: Event[]
}) => {
  const { kills, deaths } = countStatsPlayer(events)
  const sortedWinners = sortPlayersByKills(winners, kills)
  const sortedLosers = sortPlayersByKills(losers, kills)
  return (
    <>
      {winners.length > 0 && (
        <TableItem
          team={sortedWinners}
          isWinner={true}
          kills={kills}
          deaths={deaths}
        />
      )}
      {losers.length > 0 && (
        <TableItem
          team={sortedLosers}
          isWinner={false}
          kills={kills}
          deaths={deaths}
        />
      )}
    </>
  )
}

const TableItem = ({
  team,
  isWinner,
  kills,
  deaths,
}: {
  team: Player[]
  isWinner: boolean
  kills: Record<number, number>
  deaths: Record<number, number>
}) => {
  const navigate = useNavigate()
  if (team.length === 0) return null

  return (
    <Flex direction="column" gap={6}>
      <Box>
        <Flex justify="space-between" align="center" px={6} py={6}>
          <Flex align="center" gap={3}>
            <Avatar
              username={team[0].username}
              styles={{ width: "35px", height: "35px", borderRadius: "8px" }}
              widthPremium={12}
              heightPremium={12}
            />
            <Text fontWeight="semibold" fontSize="lg">
              team_{team[0].username}
            </Text>
          </Flex>
          <Text
            fontWeight="semibold"
            textTransform="uppercase"
            color={isWinner ? "green.500" : "red.500"}
          >
            {isWinner ? "Победители" : "Проигравшие"}
          </Text>
        </Flex>
        <Box>
          <Table.Root variant="outline" size="md" borderRadius="12px">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader width="20%">Игрок</Table.ColumnHeader>
                <Table.ColumnHeader width="17%">Убийств</Table.ColumnHeader>
                <Table.ColumnHeader width="17%">Смертей</Table.ColumnHeader>
                <Table.ColumnHeader width="17%">Рейтинг</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {team.map((player) => (
                <Table.Row key={player.id}>
                  <Table.Cell>
                    <Flex gap={2} alignItems="center">
                      <Avatar
                        username={player.username}
                        styles={{
                          borderRadius: "4px",
                          width: "24px",
                          height: "24px",
                        }}
                        widthPremium={8}
                        heightPremium={8}
                      />
                      {player.username === "YaClary" ? (
                        <GradientText
                          fontWeight={700}
                          onClick={() =>
                            navigate(`/profile/${player.username}`)
                          }
                          cursor="pointer"
                        >
                          YaClary
                        </GradientText>
                      ) : (
                        <Text
                          fontWeight={600}
                          onClick={() =>
                            navigate(`/profile/${player.username}`)
                          }
                          cursor="pointer"
                        >
                          {player.username}
                        </Text>
                      )}
                    </Flex>
                  </Table.Cell>
                  <Table.Cell>{kills[player.id] || 0}</Table.Cell>
                  <Table.Cell>{deaths[player.id] || 0}</Table.Cell>
                  <Table.Cell>{player.rating}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>
    </Flex>
  )
}
