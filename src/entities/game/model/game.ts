import { io } from "socket.io-client"

export const socket = io("http://26.187.148.14:5000/queue")