import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import { UserProfile } from "./UserProfile";
import { UserStats } from "./UserStats";
import { LeaguesList } from "./LeaguesList";
import { QuickActions } from "./QuickActions";
import { useDashboard } from "../hooks/useDashboard";

export const DashboardLayout = () => {
  const { logout } = useAuth();
  const { user, stats, loading } = useDashboard();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading || !user) {
    return <div>Cargando...</div>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1 style={{ margin: 0, color: "#333", fontSize: "24px" }}>
              🏆 Quiniela
            </h1>
            <p style={{ margin: "5px 0 0 0", color: "#666", fontSize: "14px" }}>
              Panel de Control
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontWeight: 600, color: "#333" }}>
                {user.name}
              </p>
              <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
                {user.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: "10px 24px",
                background: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* Welcome Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "40px",
            borderRadius: "16px",
            color: "white",
            marginBottom: "30px",
            boxShadow: "0 10px 40px rgba(102, 126, 234, 0.3)",
          }}
        >
          <h2 style={{ margin: "0 0 10px 0", fontSize: "32px" }}>
            ¡Bienvenido, {user.name.split(" ")[0]}! 👋
          </h2>
          <p style={{ margin: 0, fontSize: "18px", opacity: 0.9 }}>
            Estás listo para comenzar tu quiniela
          </p>
        </div>

        {/* Grid de Información */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <UserProfile user={user} />
          <LeaguesList user={user} />
          <UserStats stats={stats} />
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </main>
    </div>
  );
};
