import { API_URL } from "@shared/config";
import { io } from "socket.io-client";

export const socket = io(`${API_URL}/queue`)