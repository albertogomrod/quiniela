import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../auth/types/auth.types";
import type { League } from "../../league/types/league.types";
import { LeagueCard } from "../../league/components/LeagueCard";
import { LeagueCardSkeleton } from "./SkeletonLoader";
import leagueService from "../../league/api/leagueService";

interface LeaguesListProps {
  user: User;
}

export const LeaguesList = ({ user }: LeaguesListProps) => {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLeagues();
  }, []);

  const loadLeagues = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await leagueService.getUserLeagues();
      setLeagues(data);
    } catch (err) {
      console.error("Error loading leagues:", err);
      setError("Error al cargar las ligas");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLeague = () => {
    navigate("/dashboard/create-league");
  };

  const handleJoinLeague = () => {
    navigate("/dashboard/join-league");
  };

  if (loading) {
    return (
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>
          <span role="img" aria-label="Trofeo">
            🏆
          </span>{" "}
          Mis Ligas
        </h3>
        <LeagueCardSkeleton count={2} />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>
          <span role="img" aria-label="Trofeo">
            🏆
          </span>{" "}
          Mis Ligas
        </h3>
        <div role="alert" style={{ textAlign: "center", padding: "20px" }}>
          <p style={{ color: "#dc3545", marginBottom: "15px" }}>{error}</p>
          <button
            onClick={loadLeagues}
            className="btn btn--primary"
            style={{ fontSize: "14px" }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>
        <span role="img" aria-label="Trofeo">
          🏆
        </span>{" "}
        Mis Ligas ({leagues.length})
      </h3>

      {leagues.length > 0 ? (
        <div
          style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {leagues.map((league) => (
            <LeagueCard
              key={league.id}
              league={league}
              isAdmin={league.adminId === user.id}
            />
          ))}
        </div>
      ) : (
        <div className="leagues-list__empty">
          <div
            className="leagues-list__empty-icon"
            role="img"
            aria-label="Sin ligas"
          >
            🏆
          </div>
          <h4 className="leagues-list__empty-title">
            Aún no participas en ninguna liga
          </h4>
          <p className="leagues-list__empty-description">
            Crea tu primera liga o únete a una existente con un código de
            invitación
          </p>
          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button onClick={handleCreateLeague} className="btn btn--primary">
              <span role="img" aria-hidden="true">
                ➕
              </span>{" "}
              Crear Liga
            </button>
            <button onClick={handleJoinLeague} className="btn btn--secondary">
              <span role="img" aria-hidden="true">
                🔗
              </span>{" "}
              Unirse a Liga
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
