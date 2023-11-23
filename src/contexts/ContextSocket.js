import { createContext } from "react";
import socketio from "socket.io-client";

const SOCKET_URL = `${process.env.REACT_APP_API_SERVER_DOMAIN}:${process.env.REACT_APP_API_SERVER_SOCKET_PORT}`;
let socketIo = null;

if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    socketIo = socketio.connect(SOCKET_URL, {auth: {token}});
} else {
    socketIo = socketio.connect(SOCKET_URL);
}

export const socket = socketIo;
export const SocketContext = createContext();