import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth";

export const Welcome = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const handleStart = () => {
    // Marcar que ya no es primera vez
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
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "60px 40px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
          🎉 ¡Bienvenido, {user?.name?.split(" ")[0]}!
        </h1>

        <p style={{ fontSize: "20px", marginBottom: "40px", opacity: 0.9 }}>
          Estás a punto de comenzar tu aventura en la quiniela
        </p>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: "12px",
            padding: "30px",
            marginBottom: "40px",
            textAlign: "left",
          }}
        >
          <h3 style={{ fontSize: "24px", marginBottom: "20px" }}>
            ¿Qué puedes hacer?
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              fontSize: "16px",
              lineHeight: "2",
            }}
          >
            <li>✅ Crear tu propia liga</li>
            <li>✅ Unirte a ligas existentes</li>
            <li>✅ Hacer predicciones de partidos</li>
            <li>✅ Competir con tus amigos</li>
            <li>✅ Ver clasificaciones en tiempo real</li>
          </ul>
        </div>

        <button
          onClick={handleStart}
          style={{
            padding: "18px 48px",
            background: "white",
            color: "#667eea",
            border: "none",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-3px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          Comenzar →
        </button>

        <p
          style={{
            marginTop: "30px",
            fontSize: "14px",
            opacity: 0.7,
          }}
        >
          Podrás crear o unirte a ligas desde el dashboard
        </p>
      </div>
    </div>
  );
};
