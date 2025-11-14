import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth";
import { useState } from "react";

export const Welcome = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<
    "create" | "join" | null
  >(null);

  const handleCreateLeague = () => {
    if (user) {
      updateUser({ isFirstTime: false });
    }
    // TODO: Navegar a crear liga
    navigate("/dashboard/create-league");
  };

  const handleJoinLeague = () => {
    if (user) {
      updateUser({ isFirstTime: false });
    }
    // TODO: Navegar a unirse a liga
    navigate("/dashboard/join-league");
  };

  const handleSkip = () => {
    if (user) {
      updateUser({ isFirstTime: false });
    }
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          padding: "20px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "32px" }}>🏆</span>
          <h1
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "700",
              color: "white",
            }}
          >
            Quiniela
          </h1>
        </div>
        <button
          onClick={handleSkip}
          style={{
            padding: "10px 20px",
            background: "rgba(255, 255, 255, 0.2)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            backdropFilter: "blur(10px)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
          }}
        >
          Saltar →
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          padding: "40px 0",
        }}
      >
        {/* Welcome Message */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "60px",
            color: "white",
          }}
        >
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "800",
              marginBottom: "15px",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            ¡Bienvenido, {user?.name?.split(" ")[0]}! 🎉
          </h2>
          <p
            style={{
              fontSize: "22px",
              opacity: 0.95,
              fontWeight: "400",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Estás a un paso de comenzar tu aventura en la quiniela
          </p>
        </div>

        {/* Options Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "30px",
            width: "100%",
            maxWidth: "900px",
            marginBottom: "40px",
          }}
        >
          {/* Card: Crear Liga */}
          <div
            onClick={() => setSelectedOption("create")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 20px 60px rgba(0, 0, 0, 0.4)";
            }}
            onMouseLeave={(e) => {
              if (selectedOption !== "create") {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 40px rgba(0, 0, 0, 0.3)";
              }
            }}
            style={{
              background:
                selectedOption === "create"
                  ? "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)"
                  : "white",
              borderRadius: "20px",
              padding: "50px 40px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
              border:
                selectedOption === "create"
                  ? "3px solid #667eea"
                  : "3px solid transparent",
              transform:
                selectedOption === "create"
                  ? "translateY(-8px)"
                  : "translateY(0)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Badge "Recomendado" */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "700",
                boxShadow: "0 4px 10px rgba(102, 126, 234, 0.4)",
              }}
            >
              Recomendado
            </div>

            <div style={{ fontSize: "80px", marginBottom: "20px" }}>🎯</div>
            <h3
              style={{
                fontSize: "28px",
                fontWeight: "800",
                marginBottom: "15px",
                color: "#333",
              }}
            >
              Crear Nueva Liga
            </h3>
            <p
              style={{
                color: "#666",
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "30px",
              }}
            >
              Sé el administrador de tu propia liga privada. Configura las
              reglas e invita a tus amigos.
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 30px 0",
                textAlign: "left",
              }}
            >
              <li
                style={{
                  padding: "10px 0",
                  color: "#333",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ color: "#28a745", fontSize: "18px" }}>✓</span>
                Tú eres el administrador
              </li>
              <li
                style={{
                  padding: "10px 0",
                  color: "#333",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ color: "#28a745", fontSize: "18px" }}>✓</span>
                Define tus propias reglas
              </li>
              <li
                style={{
                  padding: "10px 0",
                  color: "#333",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ color: "#28a745", fontSize: "18px" }}>✓</span>
                Invita con código único
              </li>
            </ul>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCreateLeague();
              }}
              style={{
                width: "100%",
                padding: "16px 24px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Crear Liga →
            </button>
          </div>

          {/* Card: Unirse a Liga */}
          <div
            onClick={() => setSelectedOption("join")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 20px 60px rgba(0, 0, 0, 0.4)";
            }}
            onMouseLeave={(e) => {
              if (selectedOption !== "join") {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 40px rgba(0, 0, 0, 0.3)";
              }
            }}
            style={{
              background:
                selectedOption === "join"
                  ? "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)"
                  : "white",
              borderRadius: "20px",
              padding: "50px 40px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
              border:
                selectedOption === "join"
                  ? "3px solid #28a745"
                  : "3px solid transparent",
              transform:
                selectedOption === "join"
                  ? "translateY(-8px)"
                  : "translateY(0)",
            }}
          >
            <div style={{ fontSize: "80px", marginBottom: "20px" }}>🤝</div>
            <h3
              style={{
                fontSize: "28px",
                fontWeight: "800",
                marginBottom: "15px",
                color: "#333",
              }}
            >
              Unirse a una Liga
            </h3>
            <p
              style={{
                color: "#666",
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "30px",
              }}
            >
              ¿Ya te invitaron a una liga? Únete con el código de invitación.
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 30px 0",
                textAlign: "left",
              }}
            >
              <li
                style={{
                  padding: "10px 0",
                  color: "#333",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ color: "#28a745", fontSize: "18px" }}>✓</span>
                Ingresa el código
              </li>
              <li
                style={{
                  padding: "10px 0",
                  color: "#333",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ color: "#28a745", fontSize: "18px" }}>✓</span>
                Comienza inmediatamente
              </li>
              <li
                style={{
                  padding: "10px 0",
                  color: "#333",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ color: "#28a745", fontSize: "18px" }}>✓</span>
                Compite con amigos
              </li>
            </ul>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleJoinLeague();
              }}
              style={{
                width: "100%",
                padding: "16px 24px",
                background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(40, 167, 69, 0.4)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Unirse →
            </button>
          </div>
        </div>

        {/* Help Text */}
        <p
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "14px",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          💡 No te preocupes, podrás crear o unirte a más ligas después desde tu
          dashboard
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "20px 0",
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: "13px",
        }}
      >
        <p style={{ margin: 0 }}>
          ¿Necesitas ayuda?{" "}
          <a href="#" style={{ color: "white", textDecoration: "underline" }}>
            Contáctanos
          </a>
        </p>
      </div>
    </div>
  );
};
