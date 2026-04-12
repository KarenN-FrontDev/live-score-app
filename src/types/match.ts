export interface Score {
  current: number;
  period1?: number;
  normaltime?: number;
}

export interface Team {
  id: number;
  name: string;
  slug: string;
}

export interface Status {
  code: number;
  type: "notstarted" | "inprogress" | "finished" | "canceled";
}

export interface Match {
  id: string;
  name: string;
  competition: string;
  country: string;
  status: Status;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: Score;
  awayScore: Score;
  liveStatus: string;
  date?: string;
  time?: string;
}
