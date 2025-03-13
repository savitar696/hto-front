import { Box, Text, Flex } from "@chakra-ui/react"
import { useColorModeValue } from "@components/ui/color-mode"
import { useNavigate } from "react-router-dom"
import { PlayerBoxProps } from "../api"
import { GradientText } from "@shared/ui/premium-text/ui"
import { Avatar } from "@shared/ui/avatar"
import { memo } from "react"

export const PlayerBox = memo(
  ({ index, name, rating, premium }: PlayerBoxProps) => {
    const bg = useColorModeValue("white", "gray.950")
    const borderColor = useColorModeValue("gray.200", "gray.600")
    const hoverBg = useColorModeValue("gray.100", "gray.900")
    const textColor = useColorModeValue("black", "white")
    const navigate = useNavigate()

    return (
      <Box
        transition="all 200ms ease"
        cursor="pointer"
        bg={bg}
        p="15px"
        borderRadius="15px"
        width="100%"
        outline={`2px solid ${borderColor}`}
        _hover={{ bg: hoverBg, transform: "scale(1.02)" }}
        boxShadow="md"
        onClick={() => navigate(`/profile/${name}`)}
      >
        <Flex alignItems="center" justifyContent="space-between" gap="16">
          <Flex alignItems="center" gap="2">
            <Text color={textColor}>#{index}</Text>
            {premium ? (
              <GradientText fontSize="18px" fontWeight={600}>
                {name}
              </GradientText>
            ) : (
              <Text fontSize="18px" color={textColor} fontWeight={600}>
                {name}
              </Text>
            )}
          </Flex>
          <Avatar
            username={name}
            styles={{ width: 48, height: 48 }}
            permanentPremium={premium}
            heightPremium={18}
            widthPremium={18}
          />
        </Flex>
        <Flex alignItems="center" gap="2" mt={2}>
          <Text color="gray.400">Игрок</Text>
          <Text color={textColor}>{rating}</Text>
        </Flex>
      </Box>
    )
  },
)
