import { Box, Flex, Text } from "@chakra-ui/react"
import { Avatar } from "@components/avatar"
import { useColorModeValue } from "@components/ui/color-mode"
import { Player } from "@features/match/hooks"
import { GradientText } from "@shared/ui/premium-text/ui"

export const PlayerCard = ({ player }: { player: Player }) => {
  const cardBg = useColorModeValue("white", "#121212") // Фон карточки
  const textColor = useColorModeValue("blackAlpha.900", "#ffffff") // Основной текст
  const borderColor = useColorModeValue("blackAlpha.100", "#333333") // Цвет границ
  const secondaryTextColor = useColorModeValue("blackAlpha.600", "#a0a0a0")

  return (
    <Box
      key={player.client_id}
      borderRadius="md"
      border="1px solid"
      borderColor={borderColor}
      bg={cardBg}
      cursor={"pointer"}
      _hover={{
        background: borderColor,
      }}
    >
      <Flex p={4} align="center" gap={4}>
        <Avatar
          username={player.name}
          styles={{ width: "36px", height: "36px" }}
          heightPremium={16}
          widthPremium={16}
        />
        {player.name === "YaClary" ? (
          <GradientText fontSize="md" fontWeight={600}>
            {player.name}
          </GradientText>
        ) : (
          <Text fontSize="md" fontWeight="semibold" color={textColor}>
            {player.name}
          </Text>
        )}
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
              0
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
            {["0%", "0", "0.0"].map((val, j) => (
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
                  {["Побед", "Убийств", "K/D"][j]}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
