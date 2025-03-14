import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { Avatar } from "@shared/ui/avatar"
import { useColorModeValue } from "@components/ui/color-mode"
import { Player } from "@features/map-selector/model"
import { GradientText } from "@shared/ui/premium-text/ui.tsx"
import { PiCrownSimpleFill } from "react-icons/pi"

export const PlayerCard = ({ player }: { player: Player }) => {
  const cardBg = useColorModeValue("white", "#0F0F0F") // Фон карточки
  const textColor = useColorModeValue("blackAlpha.900", "#ffffff") // Основной текст
  const borderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.50") // Цвет границ
  const secondaryTextColor = useColorModeValue("blackAlpha.600", "#a0a0a0")

  return (
    <Box
      key={player.client_id}
      borderRadius="2xl"
      border="1px solid"
      borderColor={borderColor}
      bg={cardBg}
      cursor={"pointer"}
      _hover={{
        background: borderColor,
      }}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Flex p={3} align="center" gap={4}>
          <Avatar
            username={player.name}
            styles={{ width: "36px", height: "36px", borderRadius: "25%" }}
            permanentPremium={player.premium}
            heightPremium={12}
            widthPremium={12}
          />
          {player.premium ? (
            <GradientText fontSize="md" fontWeight={700}>
              {player.name}{" "}
              {player.captain && (
                <Icon
                  color="yellow.500"
                  marginBottom={1}
                  marginLeft={1}
                  width={4}
                  height={4}
                >
                  <PiCrownSimpleFill />
                </Icon>
              )}
            </GradientText>
          ) : (
            <Text fontSize="md" fontWeight="semibold" color={textColor}>
              {player.name}{" "}
              {player.captain && (
                <Icon color="yellow.500" marginBottom={1} marginLeft={1}>
                  <PiCrownSimpleFill />
                </Icon>
              )}
            </Text>
          )}
        </Flex>
        <Flex p={3} marginRight={5} align="center">
          <Text fontSize="sm" fontWeight="semibold" color={textColor}>
            {player.rating}
          </Text>
        </Flex>
      </Flex>

      <Flex borderTop="1px solid" borderColor={borderColor}>
        <Box width="30%" borderRight="1px solid" borderColor={borderColor}>
          <Text
            p={2}
            fontSize="sm"
            borderBottom="1px solid"
            borderColor={borderColor}
            color={textColor}
          >
            Всего
          </Text>
          <Box p={2}>
            <Text fontSize="md" color={textColor}>
              {player.stats.matches}
            </Text>
            <Text fontSize="xs" color={secondaryTextColor}>
              Матчи
            </Text>
          </Box>
        </Box>

        <Box width="70%">
          <Text
            p={2}
            fontSize="sm"
            borderBottom="1px solid"
            borderColor={borderColor}
            color={textColor}
          >
            Последние 10 матчей
          </Text>
          <Flex>
            {[
              player.stats.winrate,
              player.stats.killsPerMatch,
              player.stats.kd,
            ].map((val, j) => (
              <Box
                key={j}
                p={2}
                flex={1}
                borderRight={j < 2 ? "1px solid" : "none"}
                borderColor={borderColor}
              >
                <Text fontSize="md" color={textColor}>
                  {val}
                </Text>
                <Text fontSize="xs" color={secondaryTextColor}>
                  {["Побед", "KPM", "K/D"][j]}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
