import { useEffect, useState, useCallback, SetStateAction } from "react"
import { useTimer } from "use-timer"
import { useNavigate } from "react-router-dom"
import { queueIO } from "@entities/user/model/user.events"
import { QueueResponse } from "@entities/user/model/user.types"
import { foundedSound, acceptedSound } from "@shared/static/music"
import toast from "react-hot-toast"
import { errorToast, successToast } from "@shared/lib/utils/theme"

export const useQueue = (payload: any) => {
  const [search, setSearch] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<QueueResponse<any[]>>({
    status: "searching",
    payload: [],
  })
  const [error, setError] = useState<string | null>(null)
  const errorMessages = new Set<string>()
  const { time, start, pause, reset } = useTimer({
    initialTime: 0,
    interval: 1000,
    timerType: "INCREMENTAL",
  })
  const navigate = useNavigate()

  const handleError = useCallback(
    (message: string) => {
      if (errorMessages.has(message)) return

      errorMessages.add(message)
      toast.error(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
          }}
        >
          <span
            style={{
              color: "var(--white100)",
              fontWeight: "var(--fontWeights-semibold)",
            }}
          >
            Ошибка
          </span>
          <span
            style={{
              color: "var(--white60)",
              fontWeight: "var(--fontWeights-medium)",
              fontSize: "var(--fontSizes-0)",
            }}
          >
            {message}
          </span>
        </div>,
        errorToast,
      )
      setError(message)
      setTimeout(() => errorMessages.delete(message), 5000)
    },
    [errorMessages, navigate],
  )

  const joinQueue = useCallback(() => {
    reset()
    start()
    setSearch(true)
    queueIO.connect()
  }, [reset, start])

  const outQueue = useCallback(() => {
    reset()
    pause()
    setSearch(false)
    queueIO.disconnect()
  }, [reset, pause])

  const handleServerError = useCallback(
    (errorData: { message: string }) => {
      const message = errorData.message || "Ошибка с сервера"
      handleError(message)
      queueIO.disconnect()
      setSearch(false)
    },
    [handleError],
  )

  const handleConnect = useCallback(() => {
    queueIO.emit(
      "join",
      { id: payload.id },
      (response: SetStateAction<QueueResponse<any[]>>) => {
        if (response) {
          setData(response)
        } else {
          handleError("Failed to join queue")
        }
      },
    )
  }, [handleError, payload.id])

  const handleJoinEvent = useCallback(
    (eventData: QueueResponse<any[]>) => {
      if (eventData) {
        if (eventData.url === undefined) return
        setData(eventData)
      } else {
        handleError("Received invalid join event data")
      }
    },
    [handleError],
  )

  useEffect(() => {
    const handleServerErrorWrapper = (errorData: {
      message: string
      url?: string
    }) => {
      handleServerError(errorData)
    }

    queueIO.on("error", handleServerErrorWrapper)
    return () => {
      queueIO.off("error", handleServerErrorWrapper)
    }
  }, [handleServerError])

  useEffect(() => {
    queueIO.on("connect", handleConnect)
    queueIO.on("join.event", handleJoinEvent)
    return () => {
      queueIO.off("connect", handleConnect)
      queueIO.off("join.event", handleJoinEvent)
    }
  }, [handleConnect, handleJoinEvent])

  useEffect(() => {
    const audio1 = new Audio(foundedSound)
    const audio2 = new Audio(acceptedSound)
    const playAudio = () => {
      if (data.status === "ready") {
        audio1.play()
        setLoading(true)
        toast.success(
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-1)",
            }}
          >
            <span
              style={{
                color: "var(--white100)",
                fontWeight: "var(--fontWeights-semibold)",
              }}
            >
              Ваша игра найдена
            </span>
          </div>,
          successToast,
        )
        setTimeout(() => {
          navigate(`/match/${data.url}`)
          audio2.play()
        }, 5000)
      }
    }
    audio1.addEventListener("canplaythrough", playAudio)
    return () => {
      audio1.pause()
      audio1.removeEventListener("canplaythrough", playAudio)
    }
  }, [data, navigate])

  return { search, time, loading, joinQueue, outQueue, error }
}
