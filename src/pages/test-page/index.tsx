import { useUser } from "@entities/user"
import React, { useState, useEffect, useRef, useCallback } from "react"
import { io, Socket } from "socket.io-client"
import { useNavigate } from "react-router-dom"
import { MatchReadyModal } from "@features/play/ui/match-ready-modal"
import toast from "react-hot-toast"
import { acceptedSound, foundedSound } from "@shared/static/music"

const SERVER_URL = "http://localhost:5000"
const NAMESPACE = "/matchmaking/v2"

interface QueueJoinedData {
  gameType: string
  requeued?: boolean
}
interface QueueErrorData {
  message: string
}
interface MatchFoundData {
  proposalId: string
  gameType: string
  expiresAt: number
  acceptedCount?: number
  totalPlayers?: number
}
interface GameReadyData {
  proposalId: string
  gameType: string
  gameId: string
}
interface MatchDeclinedData {
  proposalId: string
  declinedBy?: string
}
interface MatchExpiredData {
  proposalId: string
  unanswered?: string[]
}
interface MatchCancelledData {
  proposalId: string
  reason?: string
}
interface PenaltyData {
  duration: number
}
interface GameCreationErrorData {
  proposalId: string
  message: string
}

export const MatchmakingClient = () => {
  const navigate = useNavigate()
  const profile = useUser((state) => state.payload)
  const [playerId, setPlayerId] = useState<string>("test")
  const [isConnected, setIsConnected] = useState(false)
  const [socketId, setSocketId] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState(
    "Enter Player ID to connect.",
  )
  const [isInQueue, setIsInQueue] = useState(false)
  const [currentProposal, setCurrentProposal] = useState<MatchFoundData | null>(
    null,
  )
  const [proposalTimer, setProposalTimer] = useState<number>(0)
  const [gameInfo, setGameInfo] = useState<GameReadyData | null>(null)
  const [isPenaltyActive, setIsPenaltyActive] = useState(false)

  const acceptSound = new Audio(acceptedSound)
  const foundSound = new Audio(foundedSound)

  const socketRef = useRef<Socket | null>(null)
  const proposalIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  )
  const penaltyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setPlayerId(profile.id)
  }, [profile])

  const clearProposalState = useCallback(() => {
    setCurrentProposal(null)
    setProposalTimer(0)
    if (proposalIntervalRef.current) {
      clearInterval(proposalIntervalRef.current)
      proposalIntervalRef.current = null
    }
  }, [])

  const cleanupPenalty = useCallback(() => {
    setIsPenaltyActive(false)
    if (penaltyTimeoutRef.current) {
      clearTimeout(penaltyTimeoutRef.current)
      penaltyTimeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!playerId) {
      if (socketRef.current) {
        console.log("Disconnecting due to empty Player ID...")
        socketRef.current.disconnect()
        socketRef.current = null
        setIsConnected(false)
        setSocketId(null)
        setIsInQueue(false)
        clearProposalState()
        setGameInfo(null)
        cleanupPenalty()
        setStatusMessage("Enter Player ID to connect.")
      }
      return
    }

    if (socketRef.current) return

    console.log(`Connecting as ${playerId}...`)
    setStatusMessage("Connecting...")
    const token = `Bearer ${localStorage.getItem("token")}`

    const socket = io(`${SERVER_URL}${NAMESPACE}`, {
      auth: { token },
      transports: ["websocket"],
      reconnectionAttempts: 3,
    })
    socketRef.current = socket

    socket.on("connect", () => {
      console.log(`Connected! Socket ID: ${socket.id}`)
      setIsConnected(true)
      setSocketId(socket.id || null)
      setStatusMessage("Connected. Idle.")
      cleanupPenalty()
    })

    socket.on("disconnect", (reason) => {
      console.log(`Disconnected: ${reason}`)
      setIsConnected(false)
      setSocketId(null)
      setIsInQueue(false)
      clearProposalState()
      setGameInfo(null)
      // Не сбрасываем штраф при дисконнекте
      setStatusMessage(`Disconnected: ${reason}. Enter Player ID to reconnect.`)
      socketRef.current = null // Очищаем ref
    })

    socket.on("connect_error", (err) => {
      console.error(`Connection Error: ${err.message}`)
      setIsConnected(false)
      setStatusMessage(`Connection Failed: ${err.message}. Check server/token.`)
      socketRef.current = null // Очищаем ref
    })

    // --- События Матчмейкинга ---
    socket.on("queue_joined", (data: QueueJoinedData) => {
      console.log("Event 'queue_joined':", data)
      setIsInQueue(true)
      setStatusMessage(`In Queue (${data.gameType})`)
      clearProposalState()
      setGameInfo(null)
    })

    socket.on("queue_left", () => {
      console.log("Event 'queue_left'")
      setIsInQueue(false)
      setStatusMessage("Left Queue. Idle.")
    })

    socket.on("queue_error", (data: QueueErrorData) => {
      console.error("Event 'queue_error':", data)
      setStatusMessage(`Queue Error: ${data.message}`)
      // Возможно, нужно сбросить isInQueue в зависимости от ошибки
    })

    socket.on("match_found", (data: MatchFoundData) => {
      foundSound.play()
      console.log("Event 'match_found':", data)
      setCurrentProposal(data)
      setIsInQueue(false) // Вышли из основной очереди
      setStatusMessage(`Match Found! (${data.gameType})`)
      const updateTimer = () => {
        const remaining = Math.max(
          0,
          Math.round((data.expiresAt - Date.now()) / 1000),
        )
        setProposalTimer(remaining)
        if (remaining <= 0 && proposalIntervalRef.current) {
          clearInterval(proposalIntervalRef.current)
          proposalIntervalRef.current = null
          // Статус обновится событием match_expired от сервера
        }
      }
      if (proposalIntervalRef.current)
        clearInterval(proposalIntervalRef.current)
      updateTimer() // Первый вызов
      proposalIntervalRef.current = setInterval(updateTimer, 1000)
    })

    socket.on("game_ready", (data: GameReadyData) => {
      console.log("Event 'game_ready':", data)
      setGameInfo(data)
      foundSound.pause()
      clearProposalState()
      navigate(`/match/${data.gameId}`)
      acceptSound.play()
      setStatusMessage(`Game Ready! ID: ${data.gameId}`)
    })

    socket.on("match_declined", (data: MatchDeclinedData) => {
      console.warn("Event 'match_declined':", data)
      setStatusMessage(`Match Declined by ${data.declinedBy || "player"}.`)
      clearProposalState()
      // Логика штрафа/возврата обрабатывается сервером
    })

    socket.on("match_expired", (data: MatchExpiredData) => {
      console.warn("Event 'match_expired':", data)
      toast.error(`Игру не приняли: ${data.unanswered?.join(", ") || "N/A"}`)
      setStatusMessage(
        `Match Expired. Unanswered: ${data.unanswered?.join(", ") || "N/A"}`,
      )
      clearProposalState()
    })

    socket.on("match_cancelled", (data: MatchCancelledData) => {
      console.warn("Event 'match_cancelled':", data)
      setStatusMessage(`Match Cancelled: ${data.reason || "Unknown"}`)
      clearProposalState()
    })

    socket.on("penalty_applied", (data: PenaltyData) => {
      console.warn("Event 'penalty_applied':", data)
      const durationSeconds = Math.round((data.duration || 0) / 1000)
      setIsPenaltyActive(true)
      setStatusMessage(`Penalty Active! Cannot queue for ${durationSeconds}s.`)
      // Таймер для снятия состояния штрафа локально
      if (penaltyTimeoutRef.current) clearTimeout(penaltyTimeoutRef.current)
      penaltyTimeoutRef.current = setTimeout(
        cleanupPenalty,
        data.duration || 60000,
      )
    })

    socket.on("penalty_removed", () => {
      console.log("Event 'penalty_removed'")
      cleanupPenalty()
      setStatusMessage("Penalty removed. Idle.")
    })

    socket.on("game_creation_error", (data: GameCreationErrorData) => {
      console.error("Event 'game_creation_error':", data)
      setStatusMessage(`Game Creation Error: ${data.message}`)
      clearProposalState() // Матч не состоялся
    })

    // Функция очистки при размонтировании или смене playerId
    return () => {
      console.log(
        `Cleaning up socket for ${playerId || "previous connection"}...`,
      )
      clearProposalState() // Очищаем таймер предложения
      cleanupPenalty() // Очищаем таймер штрафа
      if (socket.connected) {
        socket.disconnect()
      }
      socketRef.current = null
    }
  }, [playerId, clearProposalState, cleanupPenalty]) // Зависимости эффекта

  // --- Обработчики кнопок ---
  const handleConnectDisconnect = () => {
    if (isConnected) {
      setPlayerId("") // Это вызовет очистку и дисконнект в useEffect
    } else {
      // Пользователь вводит ID в поле, подключение происходит автоматически через useEffect
      if (!playerId) setStatusMessage("Please enter a Player ID first.")
    }
  }

  const handleJoinQueue = () => {
    if (
      socketRef.current &&
      isConnected &&
      !isInQueue &&
      !currentProposal &&
      !gameInfo &&
      !isPenaltyActive
    ) {
      const gameType = "Dev"
      console.log(`Emitting joinQueue for ${gameType}...`)
      socketRef.current.emit("joinQueue", { gameType })
      setStatusMessage("Joining queue...")
    } else {
      let reason = "Cannot join queue: "
      if (isPenaltyActive) reason += "Penalty active."
      else if (isInQueue) reason += "Already in queue."
      else if (currentProposal) reason += "Match proposal active."
      else if (gameInfo) reason += "Game is ready/in progress."
      else if (!isConnected) reason += "Not connected."
      else reason += "Unknown reason."
      setStatusMessage(reason)
      console.warn(reason)
    }
  }

  const handleAcceptMatch = () => {
    if (socketRef.current && isConnected && currentProposal) {
      console.log(`Emitting acceptMatch for ${currentProposal.proposalId}...`)
      socketRef.current.emit("acceptMatch", {
        proposalId: currentProposal.proposalId,
      })
      setStatusMessage("Accepted match. Waiting for others...")
      // Можно сделать кнопки неактивными после нажатия
    }
  }

  const handleDeclineMatch = () => {
    if (socketRef.current && isConnected && currentProposal) {
      console.log(`Emitting declineMatch for ${currentProposal.proposalId}...`)
      socketRef.current.emit("declineMatch", {
        proposalId: currentProposal.proposalId,
      })
      setStatusMessage("Declined match.")
      // Можно сделать кнопки неактивными после нажатия
      // clearProposalState(); // Состояние очистится по событию от сервера
    }
  }

  // --- Рендер компонента ---
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Matchmaking Test Client</h2>

      {/* --- Подключение --- */}
      <div style={styles.section}>
        <label htmlFor="playerIdInput" style={styles.label}>
          Player ID:
        </label>
        <input
          id="playerIdInput"
          type="text"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          placeholder="Enter Player ID"
          disabled={isConnected}
          style={styles.input}
        />
        <button onClick={handleConnectDisconnect} style={styles.button}>
          {isConnected ? "Disconnect" : "Connect"}
        </button>
      </div>

      {/* --- Статус --- */}
      <div style={{ ...styles.section, ...styles.statusBox }}>
        <p>
          <strong>Socket ID:</strong> {socketId || "N/A"}
        </p>
        <p>
          <strong>Status:</strong>
          <span
            style={{
              marginLeft: "5px",
              color: isConnected ? (isPenaltyActive ? "red" : "green") : "grey",
            }}
          >
            {statusMessage}
          </span>
        </p>
        {isInQueue && <p style={{ color: "blue" }}>Waiting in queue...</p>}
        {gameInfo && (
          <p style={{ color: "purple" }}>
            Game is ready! ID: {gameInfo.gameId}
          </p>
        )}
      </div>

      {/* --- Действия в очереди --- */}
      {isConnected && !currentProposal && !gameInfo && (
        <div style={styles.section}>
          <button
            onClick={handleJoinQueue}
            disabled={isInQueue || isPenaltyActive}
            style={{ ...styles.button, ...styles.joinButton }}
          >
            Join Queue (5v5)
          </button>
        </div>
      )}

      {/* --- Предложение Матча --- */}
      {currentProposal && (
        <MatchReadyModal
          isOpen={!!currentProposal}
          onClose={handleDeclineMatch}
          timeLeft={proposalTimer}
          maxTime={30}
          acceptedPlayers={currentProposal.acceptedCount || 0}
          totalPlayers={currentProposal.totalPlayers || 2}
          handleClick={handleAcceptMatch}
        />
      )}
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "500px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  section: {
    marginBottom: "15px",
    paddingBottom: "15px",
    borderBottom: "1px solid #eee",
  },
  label: {
    marginRight: "10px",
  },
  input: {
    padding: "8px",
    marginRight: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "8px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "5px",
    transition: "background-color 0.2s ease",
  },
  joinButton: {
    backgroundColor: "#5cb85c",
    color: "white",
  },
  leaveButton: {
    backgroundColor: "#f0ad4e",
    color: "white",
  },
  acceptButton: {
    backgroundColor: "#5bc0de",
    color: "white",
    marginRight: "10px",
  },
  declineButton: {
    backgroundColor: "#d9534f",
    color: "white",
  },
  statusBox: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #eee",
  },
  proposalBox: {
    backgroundColor: "#eef7ff",
    padding: "15px",
    borderRadius: "4px",
    border: "1px solid #bce8f1",
    textAlign: "center",
  },
  timer: {
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "#ff8c00",
    margin: "10px 0",
  },
}
