import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react"
import { MapSelector } from "@features/map-selector"
import { TeamPlayers } from "@widgets/team-players"
import { Avatar } from "@components/ui/avatar"
import { useMatch } from "../hooks"
import { Unona } from "@shared/static/images"
import { Button } from "@components/ui/button"

export const Match = ({ id }: { id: string }) => {
  const { picks, state, loading } = useMatch(id)

  if (loading) return <div>Loading...</div>
  if (!picks || picks.players.length !== 2) return <div>Loading users</div>

  return (
    <Flex direction="column" gap={6} p={6}>
      <Grid
        templateColumns={{ base: "1fr", md: "auto 200px auto" }}
        gap={6}
        border="1px solid"
        borderColor="blackAlpha.100"
        borderRadius="md"
        p={6}
      >
        <Flex align="center" gap={4} justify="flex-end">
          <Text fontSize="md" fontWeight="semibold">
            team_{picks.teams[0][0].name.toLowerCase()}
          </Text>
          <Avatar
            src={`https://skin.vimeworld.com/helm/${picks.teams[0][0].name}.png`}
            size="md"
          />
        </Flex>

        <Flex direction="column" align="center">
          <Text fontSize="sm">4 vs 4</Text>
          <Text fontSize="md" fontWeight="semibold">
            {state}
          </Text>
          <Text fontSize="sm">Лучший из 1</Text>
        </Flex>

        <Flex align="center" gap={4}>
          <Avatar
            src={`https://skin.vimeworld.com/helm/${picks.teams[1][0].name}.png`}
            size="md"
          />
          <Text fontSize="md" fontWeight="semibold">
            team_{picks.teams[1][0].name.toLowerCase()}
          </Text>
        </Flex>
      </Grid>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        <TeamPlayers players={picks.teams[0]} />
        {picks.maps.length > 1 ? (
          <MapSelector picks={picks} game_id={id} />
        ) : (
          <Flex
            justifyContent="center"
            alignItems={"center"}
            flexDirection="column"
            paddingTop="8px"
            gap={6}
          >
            <Box
              border={"1px solid"}
              borderColor="#F3F3F3"
              p={2}
              borderRadius="8px"
              minWidth="400px"
            >
              <Flex alignItems="center" gap={4}>
                <Image
                  src={Unona}
                  height="40px"
                  width="70px"
                  borderRadius="6px"
                />
                <Text fontWeight={600}>{picks.maps[0]}</Text>
              </Flex>
            </Box>
            <Flex direction="row" gap={4}>
              <Button>Скопировать команды</Button>
            </Flex>
          </Flex>

          /* <Flex
alignItems="center"
gap={2}
justifyContent={"end"}
minWidth={"400px"}
>
<LuInfo />
<Text fontWeight={500}>Информация</Text>
</Flex> */
        )}

        <TeamPlayers players={picks.teams[1]} />
      </Grid>
    </Flex>
  )
}
