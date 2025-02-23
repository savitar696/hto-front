import {
  Box,
  Flex,
  Grid,
  IconButton,
  Image,
  Text
} from "@chakra-ui/react"
import { MapSelector } from "@features/map-selector"
import { TeamPlayers } from "@widgets/team-players"
import { Avatar } from "@components/ui/avatar"
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@components/ui/popover"
import { useColorModeValue } from "@components/ui/color-mode"
import { getMapKey } from "@features/user-profile/model/map"
import { MapImages, MapName } from "@shared/config"
import { FiInfo } from "react-icons/fi"
import { MatchPick } from "@features/match/hooks"
import { Button } from "@components/ui/button.tsx"

interface Props {
  picks: MatchPick,
  state: string,
  loading: boolean;
  id: string;
}

export const MatchOverview = ({ picks, state, loading, id }: Props) => {
  const bgColor = useColorModeValue("white", "#0d0d0d")
  const textColor = useColorModeValue("#000", "#ffffff")
  const borderColor = useColorModeValue("gray.100", "#1a1a1a")
  if (loading) return <div>Loading...</div>
  return (
    <Flex direction="column" gap={6} p={6}>
      <Grid
        templateColumns={{ base: "1fr", md: "auto 200px auto" }}
        gap={6}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="2xl"
        p={6}
        bg={bgColor}
      >
        <Flex align="center" gap={4} justify="flex-end">
          <Text fontSize="md" fontWeight="semibold" color={textColor}>
            team_{picks.teams[0][0].name.toLowerCase()}
          </Text>
          <Avatar
            src={`https://skin.vimeworld.com/helm/3d/${picks.teams[0][0].name}.png`}
            size="xl"
            background={"none"}
          />
        </Flex>

        <Flex direction="column" align="center">
          <Text fontSize="sm" color={textColor}>
            4 vs 4
          </Text>
          <Text fontSize="md" fontWeight="semibold" color={textColor}>
            {state}
          </Text>
          <Text fontSize="sm" color={textColor}>
            Лучший из 1
          </Text>
        </Flex>

        <Flex align="center" gap={4}>
          <Avatar
            src={`https://skin.vimeworld.com/helm/3d/${picks.teams[1][0].name}.png`}
            size="xl"
            background={"none"}
          />
          <Text fontSize="md" fontWeight="semibold" color={textColor}>
            team_{picks.teams[1][0].name.toLowerCase()}
          </Text>
        </Flex>
      </Grid>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} alignItems={"start"}>
        <TeamPlayers players={picks.teams[0]} />
        {picks.maps.length > 1 ? (
          <MapSelector picks={picks} game_id={id} />
        ) : (
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            paddingTop="8px"
            gap={2}
          >
            <Flex alignItems="center" justifyContent="space-between" minWidth="400px">
              <Text fontWeight={600} fontSize="14px" color={textColor}>
                Карта:
              </Text>
              <PopoverRoot positioning={{ placement: "right"}}>
                <PopoverTrigger asChild>
                  <IconButton aria-label="Информация" size="xs" variant="ghost" cursor={"pointer"}><FiInfo /></IconButton>
                </PopoverTrigger>
                <PopoverContent minWidth={350} >
                  <PopoverBody>
                    <Text whiteSpace="pre-line" fontSize="sm" color={textColor}>
                      {picks.logs?.join("\n")}
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
            </Flex>
            <Box
              border="1px solid"
              borderColor={borderColor}
              p={2}
              borderRadius="8px"
              minWidth="400px"
              bg={bgColor}
            >
              <Flex alignItems="center" gap={3}>
                <Image
                  src={MapImages[MapName[getMapKey(picks.maps[0])!]]}
                  height="40px"
                  width="90px"
                  borderRadius="4px"
                  backgroundPosition="center center"
                  backgroundSize="cover"
                  backgroundRepeat="no-repeat"
                />
                <Text fontWeight={600} color={textColor}>
                  {picks.maps[0]}
                </Text>
              </Flex>
            </Box>
            <Flex direction="column" gap={4}>
              {/*<Text fontWeight={600} fontSize="14px" textAlign="center" color={textColor}>Если игру сразу не засчитало - не переживайте, ее скоро засчитают</Text>*/}
              <Button onClick={() => window.location.href = "https://discord.gg/EnyrgVHCQd"}>Discord</Button>
            </Flex>
          </Flex>
        )}

        <TeamPlayers players={picks.teams[1]} />
      </Grid>
    </Flex>
  )
}
