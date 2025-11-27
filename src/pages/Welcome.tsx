import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth";
import { useState, useEffect } from "react";
import "./Welcome.css";

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

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  useEffect(() => {
    // Anunciar página para screen readers
    const announcement = document.createElement("div");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", "polite");
    announcement.className = "sr-only";
    announcement.textContent = `Bienvenido ${user?.name}. Elige entre crear una nueva liga o unirte a una existente.`;
    document.body.appendChild(announcement);

    return () => {
      document.body.removeChild(announcement);
    };
  }, [user?.name]);

  return (
    <div className="welcome">
      <a href="#main-content" className="welcome__skip-link">
        Saltar al contenido principal
      </a>
      {/* Header */}
      <header className="welcome__header" role="banner">
        <div className="welcome__logo">
          <span className="welcome__logo-icon" role="img" aria-label="Trofeo">
            🏆
          </span>
          <h1 className="welcome__logo-text">Quiniela</h1>
        </div>
        <button
          onClick={handleSkip}
          className="welcome__skip-button"
          aria-label="Saltar bienvenida e ir al dashboard"
        >
          Saltar →
        </button>
      </header>

      {/* Main Content */}
      <main id="main-content" className="welcome__main" role="main">
        {/* Welcome Message */}
        <div className="welcome__message">
          <h2 className="welcome__title">
            ¡Bienvenido, {user?.name?.split(" ")[0]}!{" "}
            <span role="img" aria-label="celebración">
              🎉
            </span>
          </h2>
          <p className="welcome__subtitle">
            Estás a un paso de comenzar tu aventura en la quiniela
          </p>
        </div>

        {/* Options Cards */}
        <div
          className="welcome__options"
          role="group"
          aria-label="Opciones de inicio"
        >
          {/* Card: Crear Liga */}
          <article
            className={`welcome__card ${
              selectedOption === "create" ? "welcome__card--selected" : ""
            }`}
            onClick={() => setSelectedOption("create")}
            onKeyPress={(e) =>
              handleKeyPress(e, () => setSelectedOption("create"))
            }
            tabIndex={0}
            role="button"
            aria-pressed={selectedOption === "create"}
            aria-label="Seleccionar crear nueva liga"
          >
            {/* Badge "Recomendado" */}
            <div className="welcome__badge" aria-label="Opción recomendada">
              Recomendado
            </div>

            <div
              className="welcome__card-icon"
              role="img"
              aria-label="Objetivo"
            >
              🎯
            </div>
            <h3 className="welcome__card-title">Crear Nueva Liga</h3>
            <p className="welcome__card-description">
              Sé el administrador de tu propia liga privada. Configura las
              reglas e invita a tus amigos.
            </p>

            <ul className="welcome__features">
              <li className="welcome__feature">
                <span className="welcome__feature-icon" aria-hidden="true">
                  ✓
                </span>
                Tú eres el administrador
              </li>
              <li className="welcome__feature">
                <span className="welcome__feature-icon" aria-hidden="true">
                  ✓
                </span>
                Define tus propias reglas
              </li>
              <li className="welcome__feature">
                <span className="welcome__feature-icon" aria-hidden="true">
                  ✓
                </span>
                Invita con código único
              </li>
            </ul>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCreateLeague();
              }}
              className="welcome__card-button"
              aria-label="Continuar para crear nueva liga"
            >
              Crear Liga →
            </button>
          </article>

          {/* Card: Unirse a Liga */}
          <article
            className={`welcome__card ${
              selectedOption === "join"
                ? "welcome__card--selected welcome__card--join"
                : ""
            }`}
            onClick={() => setSelectedOption("join")}
            onKeyPress={(e) =>
              handleKeyPress(e, () => setSelectedOption("join"))
            }
            tabIndex={0}
            role="button"
            aria-pressed={selectedOption === "join"}
            aria-label="Seleccionar unirse a una liga"
          >
            <div
              className="welcome__card-icon"
              role="img"
              aria-label="Apretón de manos"
            >
              🤝
            </div>
            <h3 className="welcome__card-title">Unirse a una Liga</h3>
            <p className="welcome__card-description">
              ¿Ya te invitaron a una liga? Únete con el código de invitación.
            </p>

            <ul className="welcome__features">
              <li className="welcome__feature">
                <span className="welcome__feature-icon" aria-hidden="true">
                  ✓
                </span>
                Ingresa el código
              </li>
              <li className="welcome__feature">
                <span className="welcome__feature-icon" aria-hidden="true">
                  ✓
                </span>
                Comienza inmediatamente
              </li>
              <li className="welcome__feature">
                <span className="welcome__feature-icon" aria-hidden="true">
                  ✓
                </span>
                Compite con amigos
              </li>
            </ul>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleJoinLeague();
              }}
              className="welcome__card-button welcome__card-button--join"
              aria-label="Continuar para unirse a una liga"
            >
              Unirse →
            </button>
          </article>
        </div>

        {/* Help Text */}
        <p className="welcome__help">
          <span className="welcome__help-icon" role="img" aria-label="Idea">
            💡
          </span>
          No te preocupes, podrás crear o unirte a más ligas después desde tu
          dashboard
        </p>
      </main>

      {/* Footer */}
      <footer className="welcome__footer" role="contentinfo">
        <p className="welcome__footer-text">
          ¿Necesitas ayuda?{" "}
          <a href="#" className="welcome__footer-link">
            Contáctanos
          </a>
        </p>
      </footer>
    </div>
  );
};
