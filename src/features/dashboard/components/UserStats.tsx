import type { DashboardStats } from "../types/dashboard.types";

interface UserStatsProps {
  stats: DashboardStats;
}

export const UserStats = ({ stats }: UserStatsProps) => {
  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>📊 Estadísticas</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px",
            background: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <span style={{ color: "#666" }}>Ligas activas</span>
          <strong style={{ fontSize: "24px", color: "#667eea" }}>
            {stats.activeLeagues}
          </strong>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px",
            background: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <span style={{ color: "#666" }}>Predicciones</span>
          <strong style={{ fontSize: "24px", color: "#28a745" }}>
            {stats.totalPredictions}
          </strong>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px",
            background: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <span style={{ color: "#666" }}>Puntos totales</span>
          <strong style={{ fontSize: "24px", color: "#ffc107" }}>
            {stats.totalPoints}
          </strong>
        </div>
      </div>
    </div>
  );
};
