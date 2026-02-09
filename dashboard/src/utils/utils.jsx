// import io from "socket.io-client";

// Styles for loading spinner
export const overrideStyle = {
  display: "flex",
  margin: "0 auto",
  height: "24px",
  justifyContent: "center",
  alignItems: "center",
};

import { io } from "socket.io-client";

const socket = io("https://backend-shopverse-version-1.onrender.com", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

export default socket;
