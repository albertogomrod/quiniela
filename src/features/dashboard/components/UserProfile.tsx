import type { User } from "../../auth/types/auth.types";

interface UserProfileProps {
  user: User;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>📋 Tu Perfil</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <strong style={{ color: "#666", fontSize: "14px" }}>Nombre:</strong>
          <p style={{ margin: "5px 0 0 0", color: "#333" }}>{user.name}</p>
        </div>
        <div>
          <strong style={{ color: "#666", fontSize: "14px" }}>Email:</strong>
          <p style={{ margin: "5px 0 0 0", color: "#333" }}>{user.email}</p>
        </div>
        <div>
          <strong style={{ color: "#666", fontSize: "14px" }}>
            ID de Usuario:
          </strong>
          <p
            style={{
              margin: "5px 0 0 0",
              color: "#333",
              fontSize: "13px",
              fontFamily: "monospace",
            }}
          >
            {user.id}
          </p>
        </div>
        <div>
          <strong style={{ color: "#666", fontSize: "14px" }}>
            Miembro desde:
          </strong>
          <p style={{ margin: "5px 0 0 0", color: "#333" }}>
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Hoy"}
          </p>
        </div>
      </div>
    </div>
  );
};
