// Type for score update event
export interface ScoreUpdatePayload {
  matchId: string;
  homeScore: number;
  awayScore: number;
}

// Type for ping-pong events
export interface PingPongPayload {
  timestamp: number;
}

// General WebSocket event types
export type WebSocketEvent =
  | { type: "scoreUpdate"; payload: ScoreUpdatePayload }
  | { type: "pong"; payload: PingPongPayload }
  | { type: "subscribed"; payload: { type: string } }
  | { type: "unsubscribed"; payload: { type: string } };

// Handler type for WebSocket messages
export type WebSocketMessageHandler<T = unknown> = (payload: T) => void;
