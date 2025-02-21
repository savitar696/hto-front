import { io } from "socket.io-client"

export const queueSocket = io("http://26.187.148.14:5000/queue")
