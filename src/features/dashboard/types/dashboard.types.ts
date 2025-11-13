export interface DashboardStats {
  activeLeagues: number;
  totalPredictions: number;
  totalPoints: number;
}

export interface League {
  id: string;
  name: string;
  participants: number;
  status: "active" | "finished" | "upcoming";
}
