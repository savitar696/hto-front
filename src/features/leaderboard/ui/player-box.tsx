import { Box, Text } from "@chakra-ui/react"
import { useColorModeValue } from "@components/ui/color-mode"
import { useNavigate } from "react-router-dom"
import { PlayerBoxProps } from "../api"
import { AvatarGroup, Avatar } from "@components/ui/avatar"

export const PlayerBox = ({ index, name, rating }: PlayerBoxProps) => {
  const bg = useColorModeValue("gray.100", "#0F0E14")
  const hoverBg = useColorModeValue("gray.200", "#07060a")
  const borderColor = useColorModeValue("gray.300", "#252332")
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
      _hover={{ bg: hoverBg, transform: "scale(0.9)" }}
      onClick={() => navigate(`/profile/${name}`)}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="16"
      >
        <Box display="flex" alignItems="center" gap="2">
          <Text color={textColor}>#{index}</Text>
          <Text fontSize="18px" color={textColor}>
            {name}
          </Text>
        </Box>
        <AvatarGroup>
          <Avatar
            size="xl"
            name={name}
            src={`https://skin.vimeworld.com/helm/${name}.png`}
            bg={useColorModeValue("gray.200", "gray.700")}
          />
        </AvatarGroup>
      </Box>
      <Box display="flex" alignItems="center" gap="2">
        <Text color="gray.400">Игрок</Text>
        <Text color={textColor}>{rating}</Text>
      </Box>
    </Box>
  )
}
