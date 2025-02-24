import { io } from "socket.io-client"

export const queueSocket = io(`${process.env.API_URL}/queue`)
