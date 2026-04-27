import type { Match } from "@/shared/types/match";
import type {
  ScoreUpdatePayload,
  WebSocketMessageHandler,
} from "@/shared/types/websocket";

/**
 * Internal state of a match for a mock
 */
interface MatchState {
  home: number;
  away: number;
  status: { type: string };
}

export class MockWebSocketClient {
  private url: string;
  private isConnected = false;
  private handlers: Map<string, Set<WebSocketMessageHandler>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private reconnectTimeoutId: NodeJS.Timeout | null = null;
  private isIntentionalClose = false;
  private pingIntervalId: NodeJS.Timeout | null = null;
  private messageBuffer: unknown[] = [];
  private simulationInterval: NodeJS.Timeout | null = null;
  private matches: Map<string, MatchState> = new Map();

  constructor(url: string) {
    this.url = url;
  }

  /**
   * Method to initialize matches with current scores from API (for simulation purposes)
   */
  public setInitialMatches(matches: Match[]) {
    this.matches.clear();
    for (const match of matches) {
      this.matches.set(match.id, {
        home: match.homeScore?.current ?? 0,
        away: match.awayScore?.current ?? 0,
        status: { type: match.status.type },
      });
    }
    console.log(`[MockWS] Initialized ${this.matches.size} matches from API`);
  }

  /**
   * Connecting to WS (simulation)
   */
  public connect() {
    if (this.isConnected) return;
    this.isIntentionalClose = false;
    console.log(`[MockWS] Connecting to ${this.url}`);
    setTimeout(() => {
      if (this.isIntentionalClose) return;
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.reconnectDelay = 1000;
      console.log("[MockWS] Connected");
      this.startHeartbeat();
      this.flushBuffer();
      this.startMockDataSimulation();
    }, 100);
  }

  /**
   * Disconnecting from WS (simulation)
   */
  public disconnect() {
    this.isIntentionalClose = true;
    this.stopHeartbeat();
    this.stopMockDataSimulation();
    if (this.reconnectTimeoutId) clearTimeout(this.reconnectTimeoutId);
    this.isConnected = false;
    console.log("[MockWS] Disconnected");
  }

  /**
   * Subscribing to an event type
   */
  public subscribe(eventType: string, handler: WebSocketMessageHandler) {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    const handlersSet = this.handlers.get(eventType);
    if (handlersSet) {
      handlersSet.add(handler);
    }
    console.log(`[MockWS] Subscribed to ${eventType}`);

    // For "scoreUpdate", immediately send current scores to new subscriber
    if (
      eventType === "scoreUpdate" &&
      this.isConnected &&
      this.matches.size > 0
    ) {
      for (const [matchId, state] of this.matches.entries()) {
        if (state.status.type === "inprogress") {
          handler({
            matchId,
            homeScore: state.home,
            awayScore: state.away,
          } as ScoreUpdatePayload);
        }
      }
    }
  }

  /**
   * Unsubscribing from an event type
   */
  public unsubscribe(eventType: string, handler: WebSocketMessageHandler) {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.handlers.delete(eventType);
      }
      console.log(`[MockWS] Unsubscribed from ${eventType}`);
    }
  }

  /**
   * Sending a message
   */
  public send(data: unknown) {
    if (this.isConnected) {
      console.log("[MockWS] Sending (ignored in mock):", data);
    } else {
      this.bufferMessage(data);
    }
  }

  /**
   * Simulate a connection error to test reconnection logic
   */
  public simulateError() {
    console.log("[MockWS] Simulating connection error");
    this.isConnected = false;
    this.stopMockDataSimulation();
    this.stopHeartbeat();
    if (
      !this.isIntentionalClose &&
      this.reconnectAttempts < this.maxReconnectAttempts
    ) {
      const delay = Math.min(
        30000,
        this.reconnectDelay * Math.pow(1.5, this.reconnectAttempts),
      );
      console.log(
        `[MockWS] Reconnecting in ${delay}ms, attempt ${this.reconnectAttempts + 1}`,
      );
      this.reconnectTimeoutId = setTimeout(() => {
        this.reconnectAttempts++;
        this.connect();
      }, delay);
      this.reconnectDelay = delay;
    }
  }

  // ------------------- PRIVATE METHODS -------------------

  /**
   * Emit an event to all subscribed handlers
   */
  private emit(eventType: string, payload: unknown) {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      handlers.forEach((handler) => handler(payload));
    }
  }

  /**
   * Start simulating real-time score updates for matches in progress
   */
  private startMockDataSimulation() {
    if (this.simulationInterval) this.stopMockDataSimulation();
    this.simulationInterval = setInterval(() => {
      if (!this.isConnected || this.matches.size === 0) return;

      // Отбираем только матчи со статусом 'inprogress'
      const liveMatchIds = Array.from(this.matches.entries())
        .filter(([, state]) => state.status.type === 'inprogress')
        .map(([id]) => id);

      if (liveMatchIds.length === 0) return;

      const randomMatchId =
        liveMatchIds[Math.floor(Math.random() * liveMatchIds.length)];
      const currentState = this.matches.get(randomMatchId);
      if (!currentState) return;

      // Randomly decide to increment home or away score with a certain probability
      if (Math.random() < 0.5) {
        let newHome = currentState.home;
        let newAway = currentState.away;
        if (Math.random() < 0.6) newHome += 1;
        else newAway += 1;

        this.matches.set(randomMatchId, {
          ...currentState,
          home: newHome,
          away: newAway,
        });

        const update: ScoreUpdatePayload = {
          matchId: randomMatchId,
          homeScore: newHome,
          awayScore: newAway,
        };
        this.emit("scoreUpdate", update);
        this.emit("message", { type: "scoreUpdate", payload: update });
      }
    }, 3000);
  }

  /**
   * Stop simulating real-time score updates
   */
  private stopMockDataSimulation() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }

  /**
   * Start heartbeat (ping/pong)
   */
  private startHeartbeat() {
    this.stopHeartbeat();
    this.pingIntervalId = setInterval(() => {
      if (this.isConnected) {
        console.log("[MockWS] Ping");
        setTimeout(() => this.emit("pong", { timestamp: Date.now() }), 10);
      }
    }, 30000);
  }

  /**
   * Stop heartbeat
   */
  private stopHeartbeat() {
    if (this.pingIntervalId) {
      clearInterval(this.pingIntervalId);
      this.pingIntervalId = null;
    }
  }

  /**
   * Buffer messages when not connected, to be sent upon reconnection
   */
  private bufferMessage(msg: unknown) {
    this.messageBuffer.push(msg);
    if (this.messageBuffer.length > 1000) this.messageBuffer.shift();
  }

  /**
   * Flush buffered messages (called upon successful connection)
   */
  private flushBuffer() {
    if (this.messageBuffer.length === 0) return;
    console.log(
      `[MockWS] Flushing ${this.messageBuffer.length} buffered messages`,
    );
    const copy = [...this.messageBuffer];
    this.messageBuffer = [];
    copy.forEach((msg) => this.send(msg));
  }
}
