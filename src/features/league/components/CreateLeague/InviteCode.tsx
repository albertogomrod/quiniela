import { useState } from "react";
import type { CreateLeagueResponse } from "../../types/league.types";

interface InviteCodeProps {
  leagueData: CreateLeagueResponse;
  onFinish: () => void;
  onSkip: () => void;
}

export const InviteCode = ({
  leagueData,
  onFinish,
  onSkip,
}: InviteCodeProps) => {
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(leagueData.inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(leagueData.inviteLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
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
      {/* Header con Animación de Éxito */}
      <div style={{ marginBottom: "30px", textAlign: "center" }}>
        <div
          style={{
            width: "80px",
            height: "80px",
            margin: "0 auto 20px",
            background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "bounce 0.5s ease",
          }}
        >
          <span style={{ fontSize: "40px" }}>✓</span>
        </div>
        <h2
          style={{
            margin: "0 0 10px 0",
            fontSize: "32px",
            fontWeight: "800",
            color: "#333",
          }}
        >
          ¡Liga Creada! 🎉
        </h2>
        <p style={{ color: "#666", fontSize: "16px", margin: 0 }}>
          Tu liga <strong>{leagueData.league.name}</strong> está lista
        </p>
      </div>

      {/* Info Box */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "25px",
          border: "2px solid #667eea30",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#666",
            lineHeight: "1.6",
          }}
        >
          💡 Comparte el código o el link con tus amigos para que puedan unirse
          a tu liga
        </p>
      </div>

      {/* Código de Invitación */}
      <div style={{ marginBottom: "25px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "10px",
            fontWeight: "600",
            color: "#333",
            fontSize: "14px",
          }}
        >
          Código de Invitación
        </label>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "16px 20px",
              background: "#f8f9fa",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              fontFamily: "monospace",
              fontSize: "24px",
              fontWeight: "700",
              color: "#667eea",
              textAlign: "center",
              letterSpacing: "2px",
            }}
          >
            {leagueData.inviteCode}
          </div>
          <button
            onClick={handleCopyCode}
            style={{
              padding: "16px 20px",
              background: copied
                ? "linear-gradient(135deg, #28a745 0%, #20c997 100%)"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
              minWidth: "100px",
            }}
          >
            {copied ? "✓ Copiado" : "📋 Copiar"}
          </button>
        </div>
      </div>

      {/* Link de Invitación */}
      <div style={{ marginBottom: "30px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "10px",
            fontWeight: "600",
            color: "#333",
            fontSize: "14px",
          }}
        >
          Link de Invitación
        </label>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "14px 16px",
              background: "#f8f9fa",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "13px",
              color: "#666",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {leagueData.inviteLink}
          </div>
          <button
            onClick={handleCopyLink}
            style={{
              padding: "14px 20px",
              background: copiedLink
                ? "linear-gradient(135deg, #28a745 0%, #20c997 100%)"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
              minWidth: "100px",
            }}
          >
            {copiedLink ? "✓ Copiado" : "🔗 Copiar"}
          </button>
        </div>
      </div>

      {/* Stats de la Liga */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            padding: "15px",
            background: "#f8f9fa",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "5px" }}>
            {leagueData.league.type === "private" ? "🔒" : "🌍"}
          </div>
          <div style={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>
            {leagueData.league.type === "private" ? "Privada" : "Pública"}
          </div>
        </div>
        <div
          style={{
            padding: "15px",
            background: "#f8f9fa",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "5px" }}>👥</div>
          <div style={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>
            {leagueData.league.participants.length} Participante
            {leagueData.league.participants.length !== 1 ? "s" : ""}
          </div>
        </div>
        <div
          style={{
            padding: "15px",
            background: "#f8f9fa",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "5px" }}>⚽</div>
          <div style={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>
            {leagueData.league.competition}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <button
          onClick={onFinish}
          style={{
            width: "100%",
            padding: "16px 24px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "700",
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
          Ir a Mi Liga →
        </button>
        <button
          onClick={onSkip}
          style={{
            width: "100%",
            padding: "14px 24px",
            background: "transparent",
            color: "#666",
            border: "2px solid #e0e0e0",
            borderRadius: "8px",
            fontSize: "14px",
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
          Invitar Después
        </button>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};
