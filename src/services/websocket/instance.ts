import { createWebSocketClient } from "./factory";

export const webSocketClient = createWebSocketClient(
  process.env.NEXT_PUBLIC_WS_URL || "wss://echo.websocket.org",
);
