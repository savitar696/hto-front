import { API_URL } from "@shared/config";
import { io } from "socket.io-client";

const token = `Bearer ${localStorage.getItem("token")}`

export const socket = io(`${API_URL}/matchmaking/v2`, {
    reconnection: false,
    transports: ["websocket"],
    auth: { token },
})
