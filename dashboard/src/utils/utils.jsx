import io from "socket.io-client";

// Styles for loading spinner
export const overrideStyle = {
  display: "flex",
  margin: "0 auto",
  height: "24px",
  justifyContent: "center",
  alignItems: "center",
};

// Initialize socket connection
export const socket = io("http://localhost:5000");
