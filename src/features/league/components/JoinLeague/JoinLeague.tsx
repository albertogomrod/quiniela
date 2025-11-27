import { useState } from "react";
import { useNavigate } from "react-router-dom";
import leagueService from "../../api/leagueService";
import type { League } from "../../types/league.types";
import { AVAILABLE_COMPETITIONS } from "../../types/league.types";
import "./JoinLeague.css";

export const JoinLeague = () => {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState("");
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [joinedLeague, setJoinedLeague] = useState<League | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación
    if (!inviteCode.trim()) {
      setError("Por favor ingresa un código de invitación");
      return;
    }

    if (inviteCode.length < 6) {
      setError("El código debe tener al menos 6 caracteres");
      return;
    }

    if (!teamName.trim()) {
      setError("Por favor ingresa el nombre de tu equipo");
      return;
    }

    if (teamName.length < 2 || teamName.length > 30) {
      setError("El nombre del equipo debe tener entre 2 y 30 caracteres");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await leagueService.joinLeague(
        inviteCode.trim().toUpperCase(),
        teamName.trim()
      );
      setJoinedLeague(response.league);
      setSuccess(true);
    } catch (err) {
      console.error("Error joining league:", err);
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message ||
          "Código inválido o ya eres miembro de esta liga"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLeague = () => {
    if (joinedLeague) {
      navigate(`/league/${joinedLeague.id}`);
    }
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleCreateInstead = () => {
    navigate("/dashboard/create-league");
  };

  if (success && joinedLeague) {
    const competition = AVAILABLE_COMPETITIONS.find(
      (comp) => comp.id === joinedLeague.competition
    );

    return (
      <div className="join-league">
        <div className="join-league__card">
          <div
            className="join-league__success"
            role="status"
            aria-live="polite"
          >
            <span
              className="join-league__success-icon"
              role="img"
              aria-label="Éxito"
            >
              🎉
            </span>
            <h2 className="join-league__success-title">
              ¡Te has unido exitosamente!
            </h2>
            <p className="join-league__success-description">
              Ya formas parte de la liga. Comienza a hacer tus predicciones.
            </p>

            <div className="join-league__league-info">
              <h3 className="join-league__league-name">{joinedLeague.name}</h3>
              <p className="join-league__league-competition">
                <span role="img" aria-label={competition?.name}>
                  {competition?.icon}
                </span>
                {competition?.name} - {competition?.season}
              </p>
            </div>

            <div className="join-league__actions">
              <button
                onClick={handleGoToLeague}
                className="join-league__button join-league__button--primary"
                aria-label="Ir a la liga"
              >
                <span role="img" aria-hidden="true">
                  👁️
                </span>
                Ver Liga
              </button>
              <button
                onClick={handleGoToDashboard}
                className="join-league__button join-league__button--secondary"
                aria-label="Volver al dashboard"
              >
                Ir al Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="join-league">
      <div className="join-league__card">
        {/* Header */}
        <div className="join-league__header">
          <span
            className="join-league__icon"
            role="img"
            aria-label="Unirse a liga"
          >
            🤝
          </span>
          <h1 className="join-league__title">Unirse a una Liga</h1>
          <p className="join-league__subtitle">
            Ingresa el código de invitación que te compartió el administrador de
            la liga
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="join-league__form" noValidate>
          <div className="join-league__field">
            <label
              htmlFor="inviteCode"
              className="join-league__label join-league__label--required"
            >
              Código de Invitación
            </label>
            <input
              type="text"
              id="inviteCode"
              value={inviteCode}
              onChange={(e) => {
                setInviteCode(e.target.value.toUpperCase());
                setError("");
              }}
              placeholder="Ej: ABC123"
              className="join-league__input"
              aria-invalid={!!error}
              aria-describedby={error ? "join-error" : undefined}
              maxLength={20}
              autoComplete="off"
              autoFocus
              disabled={loading}
            />
          </div>

          <div className="join-league__field">
            <label
              htmlFor="teamName"
              className="join-league__label join-league__label--required"
            >
              Nombre de tu Equipo
            </label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => {
                setTeamName(e.target.value);
                setError("");
              }}
              placeholder="Ej: Los Invencibles"
              className="join-league__input"
              style={{ textTransform: "none", letterSpacing: "normal" }}
              aria-invalid={!!error}
              aria-describedby={error ? "join-error" : undefined}
              maxLength={30}
              autoComplete="off"
              disabled={loading}
            />
          </div>

          {error && (
            <div id="join-error" className="join-league__error" role="alert">
              <span className="join-league__error-icon" aria-hidden="true">
                ⚠️
              </span>
              {error}
            </div>
          )}

          <div className="join-league__actions">
            <button
              type="submit"
              disabled={loading || !inviteCode.trim() || !teamName.trim()}
              className="join-league__button join-league__button--primary"
              aria-label={loading ? "Uniéndose a la liga" : "Unirse a la liga"}
            >
              {loading ? (
                <>
                  <span
                    className="join-league__spinner"
                    aria-hidden="true"
                  ></span>
                  Uniéndose...
                </>
              ) : (
                <>
                  <span role="img" aria-hidden="true">
                    ✓
                  </span>
                  Unirse
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleBack}
              disabled={loading}
              className="join-league__button join-league__button--secondary"
              aria-label="Cancelar y volver"
            >
              Cancelar
            </button>
          </div>
        </form>

        {/* Help Section */}
        <div className="join-league__help">
          <p className="join-league__help-text">
            ¿No tienes un código?{" "}
            <button
              type="button"
              onClick={handleCreateInstead}
              className="join-league__help-link"
              disabled={loading}
            >
              Crea tu propia liga
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
