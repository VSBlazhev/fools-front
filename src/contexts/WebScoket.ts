import { createContext } from "react";
import { Socket, io } from "socket.io-client";

export const socket = io("https://fools-back.onrender.com");
export const WebSocketContext = createContext<Socket>(socket);
export const WebSocketProvider = WebSocketContext.Provider;
