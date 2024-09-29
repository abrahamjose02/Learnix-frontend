import sockerIO from "socket.io-client";
const EndPoint = "https://app.learnixelearn.shop";
export const socketId = sockerIO(EndPoint, {
  transports: ["websocket"],
  path: "/socket.io",
});