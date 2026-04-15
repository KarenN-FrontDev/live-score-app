import type { Match } from "@/types/match";

export class MockWebSocket {
  private listeners: ((data: Match) => void)[] = [];
  private interval: NodeJS.Timeout | null = null;
  private isConnected = false;

  connect() {
    this.isConnected = true;
    console.log(
      "%c[MockWebSocket] Connected – simulating third-party live feed",
      "color:#00ff99",
    );

    this.interval = setInterval(() => {
      if (!this.isConnected) return;

      // Simulation of a real update on a random LIVE match
      const message: Partial<Match> & { id: string } = {
        id: "hbaffaf", // example ID from provided sample.json
        homeScore: { current: Math.floor(Math.random() * 5) },
        awayScore: { current: Math.floor(Math.random() * 4) },
        liveStatus: `${45 + Math.floor(Math.random() * 45)}+`,
        status: { code: 100, type: "inprogress" as const },
      };

      this.listeners.forEach((cb) => cb(message as Match));
    }, 8000);
  }

  onMessage(callback: (data: Match) => void) {
    this.listeners.push(callback);
  }

  close() {
    this.isConnected = false;
    if (this.interval) clearInterval(this.interval);
    console.log("%c[MockWebSocket] Disconnected", "color:#ff4d6d");
  }
}

export const mockWebSocket = new MockWebSocket();
