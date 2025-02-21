import { queueIO } from "@entities/user/model/user.events"
import { useEffect, useRef } from "react"
import { Socket } from "socket.io-client"

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null)

  if (!socketRef.current) {
    socketRef.current = queueIO
  }

  useEffect(() => {
    if (!socketRef.current) return

    socketRef.current.connect()

    return () => {
      socketRef.current?.disconnect()
    }
  }, [])

  return socketRef.current
}
