import { createContext } from "react";
import { io } from "socket.io-client";

const { clientHeight, clientWidth } = document.documentElement;

export const socket = io(
  new URL("/", window.location.href).href.replace("http", "ws"),
  {
    query: {
      device: clientHeight > 900 || clientWidth > 900 ? "display" : "phone",
    },
  }
);
export const SocketContext = createContext();
