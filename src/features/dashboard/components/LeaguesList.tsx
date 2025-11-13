import type { User } from "../../auth/types/auth.types";

interface LeaguesListProps {
  user: User;
}

export const LeaguesList = ({ user }: LeaguesListProps) => {
  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>🏆 Mis Ligas</h3>
      {user.ligas && user.ligas.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {user.ligas.map((liga, index) => (
            <li
              key={index}
              style={{
                padding: "15px",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Liga #{liga}</span>
              <button
                style={{
                  padding: "6px 12px",
                  background: "#667eea",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Ver
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ textAlign: "center", padding: "20px", color: "#999" }}>
          <p>Aún no participas en ninguna liga</p>
          <button
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              background: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Crear o Unirse a una Liga
          </button>
        </div>
      )}
    </div>
  );
};
