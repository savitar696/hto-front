import { useEffect, useState, useCallback, useMemo } from "react"
import { useTimer } from "use-timer"
import { useNavigate } from "react-router-dom"
import { queueIO } from "@entities/user/model/user.events"
import { toaster } from "@components/ui/toaster"
import { QueueResponse } from "@entities/user/model/user.types"
import foundedGame from '@shared/music/found.mp3'
import afterFoundedGame from '@shared/music/accepted.wav'
import { useUser } from "@entities/user"

export const useQueue = (userId: string) => {
  const [search, setSearch] = useState(false)
  const { profile } = useUser((state) => state.profile)
  const [loading, setLoading] = useState(false)
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
    if (!profile || !profile.properties[0].discord_id) {
      toaster.create({ description: "Необходимо привязать Discord", type: "error" })
      return
    }
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

  const audio = useMemo(() => new Audio(foundedGame), [])
  const audio2 = useMemo(() => new Audio(afterFoundedGame), [])

  useEffect(() => {
    if (data.status !== "ready" || !data.url) return
    setLoading(true)

    audio.play().catch(() => {});

    if (Notification.permission === "granted") {
      new Notification("Ваша игра нашлась")
    }

    toaster.create({ description: "Идет создание лобби", type: "success" })

    const navigateTimeout = setTimeout(() => {
      navigate(`/match/${data.url}`)
      audio2.play()
    }, 6000)

    return () => {
      clearTimeout(navigateTimeout)
      audio.pause()
    }
  }, [data.url, audio])

  return { search, time, loading, joinQueue, outQueue }
}
