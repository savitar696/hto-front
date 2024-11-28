import { queueIO } from "@entities/user/model/user.events";
import { QueueResponse } from "@entities/user/model/user.types";

export const connectToQueue = () => {
  queueIO.connect();
};

export const disconnectFromQueue = () => {
  queueIO.disconnect();
};

export const onJoinEvent = (callback: (data: QueueResponse<any[]>) => void) => {
  queueIO.on("join.event", callback);
};

export const offJoinEvent = () => {
  queueIO.off("join.event");
};

export const emitJoin = (
  payload: { id: string },
  callback: (data: QueueResponse<any[]>) => void
) => {
  queueIO.emit("join", payload, callback);
};
