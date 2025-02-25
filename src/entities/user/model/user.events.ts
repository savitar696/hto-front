import { API_URL } from "@shared/config"
import { io } from "socket.io-client"

export const queueIO = io(`${API_URL}/queue`, {
  autoConnect: false,
})
