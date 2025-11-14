import { useState } from "react";
import { AVAILABLE_COMPETITIONS } from "../../types/league.types";

interface ConfigurationProps {
  initialData: {
    competition: string;
    teamName: string;
    type: "public" | "private";
  };
  onNext: (data: {
    competition: string;
    teamName: string;
    type: "public" | "private";
  }) => void;
  onBack: () => void;
}

export const Configuration = ({
  initialData,
  onNext,
  onBack,
}: ConfigurationProps) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<{
    competition?: string;
    teamName?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { competition?: string; teamName?: string } = {};

    if (!formData.competition) {
      newErrors.competition = "Selecciona una competición";
    }

    if (!formData.teamName.trim()) {
      newErrors.teamName = "El nombre del equipo es obligatorio";
    }

    if (formData.teamName.length < 2) {
      newErrors.teamName = "El nombre debe tener al menos 2 caracteres";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onNext(formData);
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "40px",
        maxWidth: "600px",
        width: "100%",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "700",
              fontSize: "18px",
            }}
          >
            2
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "700",
              color: "#333",
            }}
          >
            Configuración
          </h2>
        </div>
        <p style={{ color: "#666", fontSize: "14px", margin: "5px 0 0 50px" }}>
          Paso 2 de 3
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Selección de Competición */}
        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "12px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            Selecciona la Competición *
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "12px",
            }}
          >
            {AVAILABLE_COMPETITIONS.map((comp) => (
              <div
                key={comp.id}
                onClick={() =>
                  setFormData({ ...formData, competition: comp.id })
                }
                style={{
                  padding: "16px",
                  border:
                    formData.competition === comp.id
                      ? "2px solid #667eea"
                      : "2px solid #e0e0e0",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textAlign: "center",
                  background:
                    formData.competition === comp.id
                      ? "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)"
                      : "white",
                }}
                onMouseEnter={(e) => {
                  if (formData.competition !== comp.id) {
                    e.currentTarget.style.borderColor = "#667eea";
                    e.currentTarget.style.background = "#f8f9ff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (formData.competition !== comp.id) {
                    e.currentTarget.style.borderColor = "#e0e0e0";
                    e.currentTarget.style.background = "white";
                  }
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>
                  {comp.icon}
                </div>
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "13px",
                    color: "#333",
                    marginBottom: "4px",
                  }}
                >
                  {comp.name}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#999",
                  }}
                >
                  {comp.season}
                </div>
              </div>
            ))}
          </div>
          {errors.competition && (
            <span
              style={{
                color: "#dc3545",
                fontSize: "13px",
                display: "block",
                marginTop: "8px",
              }}
            >
              {errors.competition}
            </span>
          )}
        </div>

        {/* Nombre del Equipo */}
        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            Nombre de tu Equipo/Apodo *
          </label>
          <input
            type="text"
            value={formData.teamName}
            onChange={(e) =>
              setFormData({ ...formData, teamName: e.target.value })
            }
            placeholder="Ej: Los Invencibles"
            maxLength={30}
            style={{
              width: "100%",
              padding: "14px 16px",
              border: errors.teamName
                ? "2px solid #dc3545"
                : "2px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "15px",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              if (!errors.teamName) {
                e.target.style.borderColor = "#667eea";
              }
            }}
            onBlur={(e) => {
              if (!errors.teamName) {
                e.target.style.borderColor = "#e0e0e0";
              }
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "5px",
            }}
          >
            {errors.teamName && (
              <span style={{ color: "#dc3545", fontSize: "13px" }}>
                {errors.teamName}
              </span>
            )}
            <span
              style={{
                marginLeft: "auto",
                color: "#999",
                fontSize: "13px",
              }}
            >
              {formData.teamName.length}/30
            </span>
          </div>
        </div>

        {/* Tipo de Liga */}
        <div style={{ marginBottom: "30px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "12px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            Tipo de Liga *
          </label>
          <div style={{ display: "flex", gap: "12px" }}>
            {/* Privada */}
            <div
              onClick={() => setFormData({ ...formData, type: "private" })}
              style={{
                flex: 1,
                padding: "20px",
                border:
                  formData.type === "private"
                    ? "2px solid #667eea"
                    : "2px solid #e0e0e0",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s",
                background:
                  formData.type === "private"
                    ? "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)"
                    : "white",
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>🔒</div>
              <div
                style={{
                  fontWeight: "700",
                  marginBottom: "5px",
                  color: "#333",
                }}
              >
                Privada
              </div>
              <div style={{ fontSize: "13px", color: "#666" }}>
                Solo con código de invitación
              </div>
            </div>

            {/* Pública */}
            <div
              onClick={() => setFormData({ ...formData, type: "public" })}
              style={{
                flex: 1,
                padding: "20px",
                border:
                  formData.type === "public"
                    ? "2px solid #667eea"
                    : "2px solid #e0e0e0",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s",
                background:
                  formData.type === "public"
                    ? "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)"
                    : "white",
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>🌍</div>
              <div
                style={{
                  fontWeight: "700",
                  marginBottom: "5px",
                  color: "#333",
                }}
              >
                Pública
              </div>
              <div style={{ fontSize: "13px", color: "#666" }}>
                Cualquiera puede unirse
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "space-between",
          }}
        >
          <button
            type="button"
            onClick={onBack}
            style={{
              padding: "14px 28px",
              background: "transparent",
              color: "#666",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f5f5f5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            ← Atrás
          </button>
          <button
            type="submit"
            style={{
              padding: "14px 28px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Crear Liga →
          </button>
        </div>
      </form>
    </div>
  );
};
