import { useEffect, useState, useCallback, useMemo } from "react"
import { useTimer } from "use-timer"
import { useNavigate } from "react-router-dom"
import { queueIO } from "@entities/user/model/user.events"
import { toaster } from "@components/ui/toaster"
import { QueueResponse } from "@entities/user/model/user.types"
import foundedGame from '@shared/music/found.mp3'

export const useQueue = (userId: string) => {
  const [search, setSearch] = useState(false)
  const [data, setData] = useState<QueueResponse<any[]>>({
    status: "searching",
    payload: [],
  })
  const { time, start, pause, reset } = useTimer({
    initialTime: 0,
    interval: 1000,
    timerType: "INCREMENTAL",
  })
  const navigate = useNavigate()

  // Мемоизация для предотвращения лишних вызовов
  const joinQueue = useCallback(() => {
    reset()
    start()
    setSearch(true)
    queueIO.connect()
    queueIO.emit("get.search.status")
  }, [reset, start])

  const outQueue = useCallback(() => {
    reset()
    pause()
    setSearch(false)
    queueIO.disconnect()
  }, [reset, pause])

  // Обработчики событий из WebSocket
  useEffect(() => {
    const handleConnect = () => {
      queueIO.emit("join", { id: userId }, (response: any) => setData(response))
    }

    const handleJoinEvent = (eventData: any) => setData(eventData)

    if (Notification.permission !== "granted") {
      Notification.requestPermission()
    }

    queueIO.on("connect", handleConnect)
    queueIO.on("join.event", handleJoinEvent)

    return () => {
      queueIO.off("connect", handleConnect)
      queueIO.off("join.event", handleJoinEvent)
    }
  }, [userId])

  // Мемоизация музыки (lazy loading)
  const audio = useMemo(() => new Audio(foundedGame), [])

  useEffect(() => {
    if (data.status !== "ready" || !data.url) return

    const isSoundEnabled = localStorage.getItem("sound") !== "false"

    // Если звук включен, воспроизводим его
    if (isSoundEnabled) {
      audio.play().catch(() => {}); // Игрек для предотвращения ошибок при попытке воспроизведения
    }

    // Отправка уведомления
    if (Notification.permission === "granted") {
      new Notification("Ваша игра нашлась")
    }

    toaster.create({ description: "Идет создание лобби", type: "success" })

    const navigateTimeout = setTimeout(() => {
      navigate(`/match/${data.url}`)
      window.location.reload()
    }, 2000)

    return () => {
      clearTimeout(navigateTimeout)
      audio.pause() // Останавливаем аудио после перехода
    }
  }, [data.url, audio])

  return { search, time, joinQueue, outQueue }
}
