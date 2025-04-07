import { FC, useMemo, useEffect, useState } from "react"
import {
  ModalBackDrop,
  ModalContent,
  ModalWrapper,
} from "@shared/ui/modal/Modal"
import { FiCheck } from "react-icons/fi"
import modalStyle from "@shared/ui/modal/Modal.module.scss"
import { Button } from "@shared/ui/button"

interface MatchReadyModalProps {
  isOpen: boolean
  onClose: () => void
  timeLeft: number
  maxTime: number
  acceptedPlayers: number
  totalPlayers: number
  handleClick: () => void
}

export const MatchReadyModal: FC<MatchReadyModalProps> = ({
  isOpen,
  onClose,
  timeLeft,
  maxTime,
  acceptedPlayers,
  totalPlayers,
  handleClick,
}) => {
  const [animatedTimeLeft, setAnimatedTimeLeft] = useState(timeLeft)

  useEffect(() => {
    if (Math.abs(timeLeft - animatedTimeLeft) > 3) {
      setAnimatedTimeLeft(timeLeft)
    } else {
      const timeout = setTimeout(() => {
        setAnimatedTimeLeft(timeLeft)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [timeLeft, animatedTimeLeft])

  const circleProgress = useMemo(() => {
    const progress = (animatedTimeLeft / maxTime) * 100
    const circumference = 2 * Math.PI * 45
    const offset = circumference - (progress / 100) * circumference
    return {
      circumference,
      offset,
    }
  }, [animatedTimeLeft, maxTime])

  const playerIndicators = useMemo(() => {
    const indicators = []
    for (let i = 0; i < totalPlayers; i++) {
      indicators.push(i < acceptedPlayers)
    }
    return indicators
  }, [acceptedPlayers, totalPlayers])

  return (
    <ModalBackDrop state={isOpen} setState={onClose}>
      <ModalWrapper setState={onClose}>
        <ModalContent width={470} setState={onClose}>
          <div
            className={modalStyle.header}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              fontWeight: "600",
              color: "#333333", // Dark text for light theme
            }}
          >
            <h1
              className={modalStyle.title}
              style={{ fontSize: "28px", marginBottom: "6px" }}
            >
              Матч готов
            </h1>
            <span
              className={modalStyle.text}
              style={{ opacity: 0.8, color: "#555555" }}
            >
              {" "}
              {/* Slightly lighter text */}
              Ожидание других игроков
            </span>
          </div>

          <div className={modalStyle.body}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "20px 0",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "110px",
                  height: "110px",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#333333", // Dark text for timer
                  }}
                >
                  {timeLeft}
                </div>

                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#E0E0E0" // Light gray for the background circle track
                    strokeWidth="5"
                  />

                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#FF5500" // Accent color for progress
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={circleProgress.circumference}
                    strokeDashoffset={circleProgress.offset}
                    transform="rotate(-90 50 50)"
                    style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                  />
                </svg>
                {/* Removed the text "Истекает в:" as it was overlapping with indicators below */}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "25px", // Adjusted margin to compensate for removed text
                  marginBottom: "20px",
                }}
              >
                {playerIndicators.map((accepted, index) => (
                  <div
                    key={index}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: accepted ? "#FF5500" : "transparent",
                      border: accepted ? "none" : "1px solid #CCCCCC", // Lighter border for inactive state
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white", // Keep checkmark white for contrast on orange bg
                    }}
                  >
                    {accepted && (
                      <FiCheck size={16} className="checkmark-animation" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <Button
              onClick={handleClick}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: "#FF5500", // Accent color for button
                color: "white", // White text on button
                borderRadius: "6px",
                border: "none", // Explicitly remove border
              }}
            >
              Принять
            </Button>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.9); }
              to { opacity: 1; transform: scale(1); }
            }

            @keyframes checkmarkAppear {
              0% { opacity: 0; transform: scale(0); }
              50% { opacity: 1; transform: scale(1.2); }
              100% { opacity: 1; transform: scale(1); }
            }

            .checkmark-animation {
              animation: checkmarkAppear 0.3s ease-out forwards;
            }
          `}</style>
        </ModalContent>
      </ModalWrapper>
    </ModalBackDrop>
  )
}
