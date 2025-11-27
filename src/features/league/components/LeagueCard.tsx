import { useNavigate } from "react-router-dom";
import type { League } from "../types/league.types";
import { AVAILABLE_COMPETITIONS } from "../types/league.types";
import "./LeagueCard.css";

interface LeagueCardProps {
  league: League;
  isAdmin: boolean;
}

export const LeagueCard = ({ league, isAdmin }: LeagueCardProps) => {
  const navigate = useNavigate();

  const competition = AVAILABLE_COMPETITIONS.find(
    (comp) => comp.id === league.competition
  );

  const handleViewLeague = () => {
    navigate(`/league/${league.id}`);
  };

  const handleManageLeague = () => {
    navigate(`/league/${league.id}/settings`);
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <article
      className="league-card"
      onClick={handleViewLeague}
      onKeyPress={(e) => handleKeyPress(e, handleViewLeague)}
      tabIndex={0}
      role="button"
      aria-label={`Abrir liga ${league.name}`}
    >
      {/* Header */}
      <div className="league-card__header">
        <div className="league-card__info">
          <h3 className="league-card__name">{league.name}</h3>
          <p className="league-card__competition">
            <span
              className="league-card__icon"
              role="img"
              aria-label={competition?.name}
            >
              {competition?.icon}
            </span>
            {competition?.name} - {competition?.season}
          </p>
        </div>
        <span
          className={`league-card__badge ${
            isAdmin ? "league-card__badge--admin" : "league-card__badge--member"
          }`}
          aria-label={isAdmin ? "Eres administrador" : "Eres miembro"}
        >
          {isAdmin ? "👑 Admin" : "👤 Miembro"}
        </span>
      </div>

      {/* Stats */}
      <div
        className="league-card__stats"
        role="group"
        aria-label="Estadísticas de la liga"
      >
        <div className="league-card__stat">
          <span
            className="league-card__stat-value"
            aria-label="Número de participantes"
          >
            {league.participants?.length || 0}
          </span>
          <span className="league-card__stat-label">Jugadores</span>
        </div>
        <div className="league-card__stat">
          <span className="league-card__stat-value" aria-label="Tu posición">
            -
          </span>
          <span className="league-card__stat-label">Tu Posición</span>
        </div>
        <div className="league-card__stat">
          <span className="league-card__stat-value" aria-label="Tus puntos">
            0
          </span>
          <span className="league-card__stat-label">Puntos</span>
        </div>
      </div>

      {/* Description */}
      {league.description && (
        <p className="league-card__description">{league.description}</p>
      )}

      {/* Actions */}
      <div
        className="league-card__actions"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleViewLeague}
          className="league-card__button league-card__button--primary"
          aria-label="Ver detalles de la liga"
        >
          <span role="img" aria-hidden="true">
            👁️
          </span>
          Ver Liga
        </button>
        {isAdmin && (
          <button
            onClick={handleManageLeague}
            className="league-card__button league-card__button--secondary"
            aria-label="Administrar liga"
          >
            <span role="img" aria-hidden="true">
              ⚙️
            </span>
            Administrar
          </button>
        )}
      </div>
    </article>
  );
};
