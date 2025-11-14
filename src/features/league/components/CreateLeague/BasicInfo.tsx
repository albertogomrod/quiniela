import { useState } from "react";

interface BasicInfoProps {
  initialData: {
    name: string;
    description: string;
  };
  onNext: (data: { name: string; description: string }) => void;
  onCancel: () => void;
}

export const BasicInfo = ({
  initialData,
  onNext,
  onCancel,
}: BasicInfoProps) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<{ name?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrors({ name: "El nombre de la liga es obligatorio" });
      return;
    }

    if (formData.name.length < 3) {
      setErrors({ name: "El nombre debe tener al menos 3 caracteres" });
      return;
    }

    if (formData.name.length > 50) {
      setErrors({ name: "El nombre no puede exceder 50 caracteres" });
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
            1
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "700",
              color: "#333",
            }}
          >
            Información Básica
          </h2>
        </div>
        <p style={{ color: "#666", fontSize: "14px", margin: "5px 0 0 50px" }}>
          Paso 1 de 3
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Nombre de Liga */}
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
            Nombre de la Liga *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej: Liga de Amigos 2025"
            maxLength={50}
            style={{
              width: "100%",
              padding: "14px 16px",
              border: errors.name ? "2px solid #dc3545" : "2px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "15px",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              if (!errors.name) {
                e.target.style.borderColor = "#667eea";
              }
            }}
            onBlur={(e) => {
              if (!errors.name) {
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
            {errors.name && (
              <span style={{ color: "#dc3545", fontSize: "13px" }}>
                {errors.name}
              </span>
            )}
            <span
              style={{
                marginLeft: "auto",
                color: "#999",
                fontSize: "13px",
              }}
            >
              {formData.name.length}/50
            </span>
          </div>
        </div>

        {/* Descripción */}
        <div style={{ marginBottom: "30px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            Descripción (Opcional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe tu liga... (opcional)"
            maxLength={200}
            rows={4}
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "15px",
              outline: "none",
              transition: "border-color 0.2s",
              resize: "vertical",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
            onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
          />
          <span
            style={{
              display: "block",
              textAlign: "right",
              marginTop: "5px",
              color: "#999",
              fontSize: "13px",
            }}
          >
            {formData.description.length}/200
          </span>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            onClick={onCancel}
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
              e.currentTarget.style.borderColor = "#ccc";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "#e0e0e0";
            }}
          >
            Cancelar
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
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(102, 126, 234, 0.3)";
            }}
          >
            Siguiente →
          </button>
        </div>
      </form>
    </div>
  );
};
