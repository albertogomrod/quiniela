export interface League {
  id: string;
  name: string;
  description?: string;
  competition: string;
  type: "public" | "private";
  inviteCode: string;
  adminId: string;
  participants: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeagueData {
  name: string;
  description?: string;
  competition: string;
  teamName: string;
  type: "public" | "private";
}

export interface CreateLeagueResponse {
  message: string;
  league: League;
  inviteCode: string;
  inviteLink: string;
}

export interface Competition {
  id: string;
  name: string;
  icon: string;
  season: string;
}

// Competiciones hardcodeadas
export const AVAILABLE_COMPETITIONS: Competition[] = [
  {
    id: "premier-league",
    name: "Premier League",
    icon: "⚽",
    season: "2024/25",
  },
  {
    id: "la-liga",
    name: "La Liga",
    icon: "🇪🇸",
    season: "2024/25",
  },
  {
    id: "serie-a",
    name: "Serie A",
    icon: "🇮🇹",
    season: "2024/25",
  },
  {
    id: "bundesliga",
    name: "Bundesliga",
    icon: "🇩🇪",
    season: "2024/25",
  },
  {
    id: "ligue-1",
    name: "Ligue 1",
    icon: "🇫🇷",
    season: "2024/25",
  },
  {
    id: "champions-league",
    name: "Champions League",
    icon: "🏆",
    season: "2024/25",
  },
];
