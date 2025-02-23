import { useEffect, useState, useCallback } from "react"
import { useTimer } from "use-timer"
import { useNavigate } from "react-router-dom"
import { queueIO } from "@entities/user/model/user.events"
import { toaster } from "@components/ui/toaster"
import music from "@shared/music/found.mp3"
import { QueueResponse } from "@entities/user/model/user.types"

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


  useEffect(() => {
    if (data.status !== "ready") return
    if (data.url === undefined) return

    const audio = new Audio(music)
    const isSoundEnabled = localStorage.getItem("sound") !== "false"

    if (isSoundEnabled) audio.play()

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
      audio.pause()
    }
  }, [data.url])

  return { search, time, joinQueue, outQueue }
}
