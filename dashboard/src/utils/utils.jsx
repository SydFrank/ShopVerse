// Styles for loading spinner
export const overrideStyle = {
  display: "flex",
  margin: "0 auto",
  height: "24px",
  justifyContent: "center",
  alignItems: "center",
};

import { io } from "socket.io-client";
// import io from "socket.io-client";
export const socket = io(
  "https://backend-shopverse-version-6-updated.onrender.com",
  {
    withCredentials: true,
    transports: ["websocket", "polling"],
  },
);
// export const socket = io("http://localhost:5000");
