import type { WebSocketMessageHandler } from "@/shared/types/websocket";

export class WebSocketClient {
  private url: string;
  private ws: WebSocket | null = null;
  private handlers: Map<string, Set<WebSocketMessageHandler>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 1000;
  private reconnectTimeoutId: NodeJS.Timeout | null = null;
  private isIntentionalClose = false;
  private pingIntervalId: NodeJS.Timeout | null = null;
  private messageBuffer: unknown[] = [];

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;
    this.isIntentionalClose = false;
    this.ws = new WebSocket(this.url);
    this.ws.onopen = this.handleOpen.bind(this);
    this.ws.onmessage = this.handleMessage.bind(this);
    this.ws.onerror = this.handleError.bind(this);
    this.ws.onclose = this.handleClose.bind(this);
  }

  private handleOpen() {
    console.log("WebSocket connected");
    this.reconnectAttempts = 0;
    this.reconnectDelay = 1000;
    this.startHeartbeat();
    this.flushBuffer();
  }

  private handleMessage(event: MessageEvent) {
    try {
      const data = JSON.parse(event.data) as {
        type: string;
        payload?: unknown;
      };
      const eventType = data.type || "message";
      const handlers = this.handlers.get(eventType);
      if (handlers) {
        handlers.forEach((handler) => handler(data.payload ?? data));
      }
    } catch (e) {
      console.error("Failed to parse WebSocket message", e);
    }
  }

  private handleError(error: Event) {
    console.error("WebSocket error", error);
  }

  private handleClose() {
    console.log("WebSocket closed");
    this.stopHeartbeat();
    if (
      !this.isIntentionalClose &&
      this.reconnectAttempts < this.maxReconnectAttempts
    ) {
      const delay = Math.min(
        30000,
        this.reconnectDelay * Math.pow(1.5, this.reconnectAttempts),
      );
      const jitter = delay * 0.2 * Math.random();
      const finalDelay = delay + jitter;
      console.log(
        `Reconnecting in ${Math.round(finalDelay)}ms, attempt ${this.reconnectAttempts + 1}`,
      );
      this.reconnectTimeoutId = setTimeout(() => {
        this.reconnectAttempts++;
        this.connect();
      }, finalDelay);
      this.reconnectDelay = delay;
    } else if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnect attempts reached");
    }
  }

  subscribe(eventType: string, handler: WebSocketMessageHandler) {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    const handlersSet = this.handlers.get(eventType);
    if (handlersSet) {
      handlersSet.add(handler);
    }
    this.send({ action: "subscribe", type: eventType });
  }

  unsubscribe(eventType: string, handler: WebSocketMessageHandler) {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.handlers.delete(eventType);
        this.send({ action: "unsubscribe", type: eventType });
      }
    }
  }

  send(data: unknown) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      this.bufferMessage(data);
    }
  }

  disconnect() {
    this.isIntentionalClose = true;
    this.stopHeartbeat();
    if (this.reconnectTimeoutId) clearTimeout(this.reconnectTimeoutId);
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.pingIntervalId = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: "ping" }));
      }
    }, 30000);
  }

  private stopHeartbeat() {
    if (this.pingIntervalId) {
      clearInterval(this.pingIntervalId);
      this.pingIntervalId = null;
    }
  }

  private bufferMessage(msg: unknown) {
    this.messageBuffer.push(msg);
    if (this.messageBuffer.length > 1000) this.messageBuffer.shift();
  }

  private flushBuffer() {
    if (this.messageBuffer.length === 0) return;
    console.log(`Flushing ${this.messageBuffer.length} buffered messages`);
    const copy = [...this.messageBuffer];
    this.messageBuffer = [];
    copy.forEach((msg) => this.send(msg));
  }
}
