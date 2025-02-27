import { useEffect, useState, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useUser } from "@entities/user"
import { socket } from "@entities/game"
import { Box, Flex } from "@chakra-ui/react"
import { Button } from "@components/ui/button"

export const MatchStatusWidget = () => {
  const location = useLocation()
  const { profile } = useUser((state) => state.payload)
  const [match, setMatch] = useState<any>()
  const [visible, setVisible] = useState(false)
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
    setVisible(!!match && !location.pathname.startsWith("/match/"))
  }, [match, location])

  const renderContent = useCallback(() => {
    if (!match) return "Нет активного матча"
    return (
      <Box position="fixed" bottom="0" padding="1rem">
        <Flex flexDirection="column">
          <span className="font-bold">Вы в матче!</span>
          <Button onClick={() => navigate(`/match/${match.id}`)}>
            Перейти
          </Button>
        </Flex>
      </Box>
    )
  }, [match])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }}>
      {renderContent()}
    </motion.div>
  )
}

export default MatchStatusWidget
