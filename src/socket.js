import { io } from "socket.io-client";

// Replace with your machine's local IP where the server is running
const socket = io("http://30.30.19.186:3001");

export default socket;
