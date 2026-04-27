/**
 * Match score.
 * Contains the current score and optionally period scores (e.g., for basketball) or regular time score.
 */
export interface Score {
  /** Current score (required field) */
  current: number;
  /** Score after the first period (optional) */
  period1?: number;
  /** Score in regular time (optional, for matches with overtime) */
  normaltime?: number;
}

/**
 * Team information.
 */
export interface Team {
  /** Unique team identifier in the system */
  id: number;
  /** Team name (e.g., "Liverpool") */
  name: string;
  /** URL-friendly identifier for routing */
  slug: string;
}

/**
 * Match status.
 */
export interface Status {
  /** Numeric status code (optional, depends on API) */
  code?: number;
  /**
   * Status type:
   * - notstarted: not started yet
   * - inprogress: ongoing in real time (live)
   * - finished: completed
   * - canceled: cancelled
   * - favorite: marked as favorite (used in UI)
   */
  type: "notstarted" | "inprogress" | "finished" | "canceled" | "favorite";
}

/**
 * Complete match information.
 */
export interface Match {
  /** Unique match identifier (string, e.g., "hbaffaf") */
  id: string;
  /** Match name (usually "Team A - Team B") */
  name: string;
  /** Tournament or league name */
  competition: string;
  /** Country where the tournament takes place */
  country: string;
  /** Match date (ISO or local format) */
  date?: string;
  /** Match start time (local) */
  time?: string;
  /** Current match status (inprogress, finished, etc.) */
  status: Status;
  /** Home team */
  homeTeam: Team;
  /** Away team */
  awayTeam: Team;
  /** Home team score (Score object) */
  homeScore: Score;
  /** Away team score (Score object) */
  awayScore: Score;
  /** String representation of live status (e.g., "LIVE", "HT", "FT") */
  liveStatus: string;
}
