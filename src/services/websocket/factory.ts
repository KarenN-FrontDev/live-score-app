import { WebSocketClient } from "./WebSocketClient";
import { MockWebSocketClient } from "./MockWebSocketClient";

export const createWebSocketClient = (url: string) => {
  if (process.env.NODE_ENV === "production") {
    return new WebSocketClient(url);
  } else {
    return new MockWebSocketClient(url);
  }
};
