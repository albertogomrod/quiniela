import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BasicInfo } from "./BasicInfo";
import { Configuration } from "./Configuration";
import { InviteCode } from "./InviteCode";
import type {
  CreateLeagueData,
  CreateLeagueResponse,
} from "../../types/league.types";
import leagueService from "../../api/leagueService";

export const CreateLeagueWizard = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<"basic" | "config" | "invite">(
    "basic"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdLeague, setCreatedLeague] =
    useState<CreateLeagueResponse | null>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<CreateLeagueData>({
    name: "",
    description: "",
    competition: "",
    teamName: "",
    type: "private",
  });

  const handleBasicInfoComplete = (data: {
    name: string;
    description: string;
  }) => {
    setFormData({ ...formData, ...data });
    setCurrentView("config");
  };

  const handleConfigurationComplete = async (data: {
    competition: string;
    teamName: string;
    type: "public" | "private";
  }) => {
    const finalData = { ...formData, ...data };
    setFormData(finalData);
    setError("");
    setLoading(true);

    try {
      const response = await leagueService.createLeague(finalData);
      setCreatedLeague(response);
      setCurrentView("invite");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la liga");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToBasicInfo = () => {
    setCurrentView("basic");
  };

  // Focus management when view changes
  useEffect(() => {
    if (mainContentRef.current) {
      const firstInput = mainContentRef.current.querySelector<HTMLElement>(
        'input, button, [tabindex="0"]'
      );
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }, [currentView]);

  const handleGoToLeague = () => {
    if (createdLeague) {
      navigate(`/league/${createdLeague.league.id}`);
    }
  };

  const handleInviteLater = () => {
    navigate("/dashboard");
  };

  const handleCancelCreation = () => {
    navigate("/dashboard");
  };

  const getProgressStep = () => {
    switch (currentView) {
      case "basic":
        return 1;
      case "config":
        return 2;
      case "invite":
        return 3;
      default:
        return 1;
    }
  };

  const progressStep = getProgressStep();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 20px",
      }}
    >
      {/* Progress Bar */}
      {currentView !== "invite" && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            maxWidth: "600px",
          }}
          role="navigation"
          aria-label="Progreso de creación de liga"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
            role="progressbar"
            aria-valuenow={progressStep}
            aria-valuemin={1}
            aria-valuemax={3}
            aria-label={`Paso ${progressStep} de 3`}
          >
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                style={{
                  flex: 1,
                  height: "4px",
                  background:
                    stepNumber <= progressStep
                      ? "white"
                      : "rgba(255, 255, 255, 0.3)",
                  marginRight: stepNumber < 3 ? "10px" : "0",
                  borderRadius: "2px",
                  transition: "background 0.3s",
                }}
                aria-label={`Paso ${stepNumber} ${
                  stepNumber <= progressStep ? "completo" : "pendiente"
                }`}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "white",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            <span aria-current={progressStep === 1 ? "step" : undefined}>
              Información
            </span>
            <span aria-current={progressStep === 2 ? "step" : undefined}>
              Configuración
            </span>
            <span aria-current={progressStep === 3 ? "step" : undefined}>
              Código
            </span>
          </div>
        </div>
      )}

      {/* Live Region for Screen Readers */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {currentView === "basic" &&
          "Paso 1 de 3: Información básica de la liga"}
        {currentView === "config" && "Paso 2 de 3: Configuración de la liga"}
        {currentView === "invite" &&
          "Paso 3 de 3: Código de invitación generado"}
      </div>

      {/* Error Message */}
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "#dc3545",
            color: "white",
            padding: "15px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 15px rgba(220, 53, 69, 0.3)",
            zIndex: 1000,
            animation: "slideIn 0.3s ease",
          }}
        >
          ❌ {error}
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div
          role="status"
          aria-live="polite"
          aria-label="Creando liga, por favor espere"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px 40px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #667eea",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 20px",
              }}
              aria-hidden="true"
            />
            <p style={{ margin: 0, color: "#333", fontWeight: "600" }}>
              Creando tu liga...
            </p>
          </div>
        </div>
      )}

      {/* Views */}
      <div ref={mainContentRef}>
        {currentView === "basic" && (
          <BasicInfo
            initialData={{
              name: formData.name,
              description: formData.description || "",
            }}
            onNext={handleBasicInfoComplete}
            onCancel={handleCancelCreation}
          />
        )}

        {currentView === "config" && (
          <Configuration
            initialData={{
              competition: formData.competition,
              teamName: formData.teamName,
              type: formData.type,
            }}
            onNext={handleConfigurationComplete}
            onBack={handleBackToBasicInfo}
          />
        )}

        {currentView === "invite" && createdLeague && (
          <InviteCode
            leagueData={createdLeague}
            onFinish={handleGoToLeague}
            onSkip={handleInviteLater}
          />
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
