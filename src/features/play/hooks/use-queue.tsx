import { useEffect, useCallback, useState, useMemo, CSSProperties } from "react"
import { useTimer } from "use-timer"
import { useNavigate } from "react-router-dom"
import { queueIO } from "@entities/user/model/user.events"
import { QueueResponse } from "@entities/user/model/user.types"
import { foundedSound, acceptedSound } from "@shared/static/music"
import toast from "react-hot-toast"
import { errorToast, successToast } from "@shared/lib/utils/theme"

type QueueState<T> = QueueResponse<T[]> & {
  loading: boolean
  error: string | null
  search: boolean
  time: number
}

const TOAST_STYLES: {
  container: CSSProperties
  title: CSSProperties
  subtitle: CSSProperties
} = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-1)",
  },
  title: {
    color: "var(--white100)",
    fontWeight: "var(--fontWeights-semibold)",
  },
  subtitle: {
    color: "var(--white60)",
    fontWeight: "var(--fontWeights-medium)",
    fontSize: "var(--fontSizes-0)",
  },
}

export const useQueue = <T,>(payload: { id: string }) => {
  const navigate = useNavigate()
  const [state, setState] = useState<QueueState<T>>({
    status: "searching",
    payload: [],
    loading: false,
    error: null,
    search: false,
    time: 0,
  })

  const { time, start, pause, reset } = useTimer({
    initialTime: 0,
    interval: 1000,
    timerType: "INCREMENTAL",
  })

  const audio = useMemo(
    () => ({
      found: new Audio(foundedSound),
      accepted: new Audio(acceptedSound),
    }),
    [],
  )

  const handleError = useCallback((message: string) => {
    setState((prev) => ({ ...prev, error: message }))

    toast.error(
      <div style={TOAST_STYLES.container}>
        <span style={TOAST_STYLES.title}>Ошибка</span>
        <span style={TOAST_STYLES.subtitle}>{message}</span>
      </div>,
      errorToast,
    )
  }, [])

  const queueActions = useMemo(
    () => ({
      join: () => {
        reset()
        start()
        setState((prev) => ({ ...prev, search: true }))
        queueIO.connect()
      },
      leave: () => {
        reset()
        pause()
        setState((prev) => ({ ...prev, search: false }))
        queueIO.disconnect()
      },
    }),
    [reset, start, pause],
  )

  const handleServerResponse = useCallback(
    (response: QueueResponse<T[]>) => {
      if (!response) {
        handleError("Ошибка подключения к очереди")
        return
      }

      setState((prev) => ({
        ...prev,
        status: response.status,
        payload: response.payload,
      }))

      if (response.url) {
        navigate(`/match/${response.url}`)
      }
    },
    [handleError, navigate],
  )

  const setupEventHandlers = useCallback(() => {
    const handleConnect = () => {
      queueIO.emit(
        "joinQueue",
        { userId: payload.id, gameType: "Dev" },
        handleServerResponse,
      )
    }

    const handleErrorEvent = (errorData: { message: string }) => {
      handleError(errorData.message || "Ошибка сервера")
      queueActions.leave()
    }

    queueIO.on("queue_joined", handleConnect)
    queueIO.on("join.event", handleServerResponse)
    queueIO.on("error", handleErrorEvent)

    return () => {
      queueIO.off("queue_joined", handleConnect)
      queueIO.off("join.event", handleServerResponse)
      queueIO.off("error", handleErrorEvent)
    }
  }, [handleServerResponse, handleError, queueActions, payload.id])

  useEffect(() => {
    const cleanup = setupEventHandlers()
    return cleanup
  }, [setupEventHandlers])

  useEffect(() => {
    const handleReadyStatus = () => {
      if (state.status !== "ready") return

      audio.found.play()
      setState((prev) => ({ ...prev, loading: true }))

      toast.success(
        <div style={TOAST_STYLES.container}>
          <span style={TOAST_STYLES.title}>Игра найдена!</span>
        </div>,
        successToast,
      )

      const navigationTimer = setTimeout(() => {
        audio.accepted.play()
        navigate(`/match/${state.url}`)
      }, 5000)

      return () => clearTimeout(navigationTimer)
    }

    audio.found.addEventListener("canplaythrough", handleReadyStatus)

    return () => {
      audio.found.pause()
      audio.found.removeEventListener("canplaythrough", handleReadyStatus)
    }
  }, [state.status, state.url, navigate, audio])

  return {
    search: state.search,
    time,
    loading: state.loading,
    joinQueue: queueActions.join,
    outQueue: queueActions.leave,
    error: state.error,
  }
}
