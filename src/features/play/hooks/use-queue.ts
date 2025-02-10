/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
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

  const joinQueue = () => {
    reset()
    start()
    setSearch(true)
    queueIO.connect()
  }

  const outQueue = () => {
    reset()
    pause()
    setSearch(false)
    queueIO.disconnect()
  }

  useEffect(() => {
    queueIO.on("connect", () => {
      queueIO.emit("join", { id: userId }, (data: any) => {
        setData(data)
      })
    })

    queueIO.on("join.event", (data) => {
      setData(data)
    })
  }, [])

  useEffect(() => {
    const audio1 = new Audio(music)
    audio1.addEventListener("canplaythrough", () => {
      if (data.status === "ready") {
        audio1.play()
        toaster.create({
          description: "Идет создание лобби",
          type: "success",
        })
        setTimeout(() => {
          navigate(`/match/${data.url}`)
        }, 2 * 1000)
      }
    })
    return () => {
      audio1.pause()
      audio1.removeEventListener("canplaythrough", () => {})
    }
  }, [data])

  return { search, time, joinQueue, outQueue }
}
