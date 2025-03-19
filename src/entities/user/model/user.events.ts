import { io } from "socket.io-client";

export const queueIO = io("https://api.hardtournaments.space" + "/queue", {
  autoConnect: false,
});
