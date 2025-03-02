import { useEffect, useState, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useUser } from "@entities/user"
import { socket } from "@entities/game"
import { Box, Flex, Text } from "@chakra-ui/react"
import { useColorModeValue } from "@components/ui/color-mode"

export const MatchStatusWidget = () => {
  const location = useLocation()
  const { profile } = useUser((state) => state.payload)
  const [match, setMatch] = useState<any>()
  const [visible, setVisible] = useState(false)
  const bgColor = useColorModeValue("white", "#1a1a1a");
  const textColor = useColorModeValue("gray.800", "#e0e0e0");
  const navigate = useNavigate()

  useEffect(() => {
    if (!profile || !profile.name) return

    socket.emit("match:update", { name: profile.name })

    socket.on("match:update", (updatedMatch) => {
      setMatch(updatedMatch.status === "in_match" ? updatedMatch : null)
    })

    return () => {
      socket.off("match:update")
    }
  }, [profile])

  useEffect(() => {
    setVisible(!!match && !location.pathname.startsWith(`/match/${match.id}`))
  }, [match, location])

  const renderContent = useCallback(() => {
    if (!match) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: "fixed", bottom: "20px", left: "20px", zIndex: 999 }}
      >
        <Box
          bg={bgColor}
          border="1px solid"
          borderColor={useColorModeValue("gray.100", "#1a1a1a")}
          borderRadius="8px"
          width="auto"
          maxWidth="500px"
        >
          <Flex alignItems="center" p="3" onClick={() => navigate(`/match/${match.id}`)} cursor="pointer">
              <Text fontWeight="bold" color={textColor} mr="2">
                Текущий матч
              </Text>
          </Flex>
        </Box>
      </motion.div>
    );
  }, [match, navigate, bgColor, textColor]);

  return visible ? renderContent() : null;
}
