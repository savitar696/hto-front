import { API_URL } from "@shared/config"
import { io } from "socket.io-client"

export const queueSocket = io(`${API_URL}/queue`)
