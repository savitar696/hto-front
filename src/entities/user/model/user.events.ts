import { io } from "socket.io-client";

export const queueIO = io("http://localhost:5000" + "/queue", {
    autoConnect: false,
  });
