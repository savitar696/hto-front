import { io } from "socket.io-client";

export const socket = io("localhost:5000/queue");
