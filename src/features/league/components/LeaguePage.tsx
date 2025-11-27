import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../auth";
import leagueService from "../api/leagueService";
import type {
  League,
  LeagueStanding,
  Match,
  Prediction,
  CreatePredictionData,
} from "../types/league.types";
import { AVAILABLE_COMPETITIONS } from "../types/league.types";
import "./LeaguePage.css";

type TabType = "standings" | "matches" | "predictions";

export const LeaguePage = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [league, setLeague] = useState<League | null>(null);
  const [standings, setStandings] = useState<LeagueStanding[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [userPredictions, setUserPredictions] = useState<Prediction[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("standings");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [predictionLoading, setPredictionLoading] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (leagueId) {
      loadLeagueData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueId]);

  const loadLeagueData = async () => {
    if (!leagueId) return;

    try {
      setLoading(true);
      setError("");

      const [leagueData, standingsData, matchesData, predictionsData] =
        await Promise.all([
          leagueService.getLeague(leagueId),
          leagueService.getLeagueStandings(leagueId),
          leagueService.getLeagueMatches(leagueId),
          leagueService.getUserPredictions(leagueId),
        ]);

      setLeague(leagueData);
      setStandings(standingsData);
      setMatches(matchesData);
      setUserPredictions(predictionsData);
    } catch (err) {
      console.error("Error loading league data:", err);
      setError("Error al cargar la liga");
    } finally {
      setLoading(false);
    }
  };

  const handlePredictionSubmit = async (
    matchId: string,
    homeScore: number,
    awayScore: number
  ) => {
    if (!leagueId) return;

    try {
      setPredictionLoading(matchId);

      const existingPrediction = userPredictions.find(
        (p) => p.matchId === matchId
      );
      const data: CreatePredictionData = { matchId, homeScore, awayScore };

      if (existingPrediction) {
        await leagueService.updatePrediction(
          leagueId,
          existingPrediction.id,
          data
        );
      } else {
        await leagueService.createPrediction(leagueId, data);
      }

      // Reload predictions
      const predictionsData = await leagueService.getUserPredictions(leagueId);
      setUserPredictions(predictionsData);
    } catch (err) {
      console.error("Error saving prediction:", err);
      alert("Error al guardar la predicción");
    } finally {
      setPredictionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="league-page">
        <div className="league-main">
          <p style={{ textAlign: "center", padding: "3rem" }}>Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !league) {
    return (
      <div className="league-page">
        <div className="league-main">
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <p style={{ color: "var(--accent-600)", marginBottom: "1rem" }}>
              {error || "Liga no encontrada"}
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="btn btn--primary"
            >
              Volver al Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const competition = AVAILABLE_COMPETITIONS.find(
    (c) => c.id === league.competition
  );
  const isAdmin = league.adminId === user?.id;
  const userStanding = standings.find((s) => s.userId === user?.id);

  return (
    <div className="league-page">
      {/* Header Banner */}
      <header className="league-header" role="banner">
        <div className="league-header__container">
          <Link to="/dashboard" className="league-header__back">
            <span aria-hidden="true">←</span> Volver al Dashboard
          </Link>

          <div className="league-header__top">
            <div className="league-header__info">
              <h1 className="league-header__title">{league.name}</h1>
              <div className="league-header__meta">
                <span className="league-header__meta-item">
                  <span role="img" aria-label={competition?.name}>
                    {competition?.icon}
                  </span>
                  {competition?.name}
                </span>
                <span className="league-header__meta-item">
                  <span role="img" aria-hidden="true">
                    👥
                  </span>
                  {league.participants?.length || 0} jugadores
                </span>
                {isAdmin && (
                  <span className="league-header__meta-item">
                    <span role="img" aria-hidden="true">
                      👑
                    </span>
                    Eres administrador
                  </span>
                )}
              </div>
            </div>

            <div className="league-header__actions">
              <button
                className="btn btn--secondary"
                onClick={() => {
                  navigator.clipboard.writeText(league.inviteCode);
                  alert("Código copiado: " + league.inviteCode);
                }}
              >
                <span role="img" aria-hidden="true">
                  📋
                </span>{" "}
                Copiar Código
              </button>
              {isAdmin && (
                <button
                  className="btn btn--accent"
                  onClick={() => navigate(`/league/${leagueId}/settings`)}
                >
                  <span role="img" aria-hidden="true">
                    ⚙️
                  </span>{" "}
                  Configuración
                </button>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="league-stats">
            <div className="league-stat">
              <span className="league-stat__value">
                {userStanding?.position || "-"}
              </span>
              <span className="league-stat__label">Tu Posición</span>
            </div>
            <div className="league-stat">
              <span className="league-stat__value">
                {userStanding?.points || 0}
              </span>
              <span className="league-stat__label">Tus Puntos</span>
            </div>
            <div className="league-stat">
              <span className="league-stat__value">
                {userStanding?.correctPredictions || 0}
              </span>
              <span className="league-stat__label">Aciertos</span>
            </div>
            <div className="league-stat">
              <span className="league-stat__value">
                {userStanding?.accuracy
                  ? `${Math.round(userStanding.accuracy)}%`
                  : "0%"}
              </span>
              <span className="league-stat__label">Precisión</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="league-main" role="main">
        {/* Tabs */}
        <div className="league-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === "standings"}
            aria-controls="standings-panel"
            className={`league-tabs__tab ${
              activeTab === "standings" ? "league-tabs__tab--active" : ""
            }`}
            onClick={() => setActiveTab("standings")}
          >
            <span role="img" aria-hidden="true">
              🏆
            </span>{" "}
            Clasificación
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "matches"}
            aria-controls="matches-panel"
            className={`league-tabs__tab ${
              activeTab === "matches" ? "league-tabs__tab--active" : ""
            }`}
            onClick={() => setActiveTab("matches")}
          >
            <span role="img" aria-hidden="true">
              ⚽
            </span>{" "}
            Partidos
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "predictions"}
            aria-controls="predictions-panel"
            className={`league-tabs__tab ${
              activeTab === "predictions" ? "league-tabs__tab--active" : ""
            }`}
            onClick={() => setActiveTab("predictions")}
          >
            <span role="img" aria-hidden="true">
              📊
            </span>{" "}
            Mis Predicciones
          </button>
        </div>

        {/* Tab Panels */}
        {activeTab === "standings" && (
          <StandingsPanel standings={standings} currentUserId={user?.id} />
        )}

        {activeTab === "matches" && (
          <MatchesPanel
            matches={matches}
            userPredictions={userPredictions}
            onPredictionSubmit={handlePredictionSubmit}
            predictionLoading={predictionLoading}
          />
        )}

        {activeTab === "predictions" && (
          <PredictionsPanel predictions={userPredictions} matches={matches} />
        )}
      </main>
    </div>
  );
};

// Standings Panel Component
interface StandingsPanelProps {
  standings: LeagueStanding[];
  currentUserId?: string;
}

const StandingsPanel = ({ standings, currentUserId }: StandingsPanelProps) => {
  if (standings.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          background: "var(--neutral-50)",
          borderRadius: "var(--radius-xl)",
        }}
      >
        <p>No hay clasificación disponible aún</p>
      </div>
    );
  }

  return (
    <div role="tabpanel" id="standings-panel" className="standings-table">
      <div className="standings-table__wrapper">
        <table className="standings-table__table">
          <thead className="standings-table__header">
            <tr>
              <th className="standings-table__th standings-table__th--center">
                Pos
              </th>
              <th className="standings-table__th">Jugador</th>
              <th className="standings-table__th standings-table__th--center">
                Puntos
              </th>
              <th className="standings-table__th standings-table__th--center">
                Aciertos
              </th>
              <th className="standings-table__th standings-table__th--center">
                Total
              </th>
              <th className="standings-table__th standings-table__th--center">
                Precisión
              </th>
            </tr>
          </thead>
          <tbody>
            {standings.map((standing) => (
              <tr
                key={standing.userId}
                className={`standings-table__row ${
                  standing.userId === currentUserId
                    ? "standings-table__row--current"
                    : ""
                }`}
              >
                <td className="standings-table__td standings-table__td--center">
                  <span
                    className={`standings-table__position ${
                      standing.position <= 3
                        ? "standings-table__position--podium"
                        : ""
                    }`}
                  >
                    {standing.position}
                  </span>
                </td>
                <td className="standings-table__td">
                  <div className="standings-table__name">
                    {standing.userName}
                    {standing.userId === currentUserId && (
                      <span style={{ fontSize: "0.875rem" }}>(Tú)</span>
                    )}
                  </div>
                </td>
                <td className="standings-table__td standings-table__td--center">
                  <strong>{standing.points}</strong>
                </td>
                <td className="standings-table__td standings-table__td--center">
                  {standing.correctPredictions}
                </td>
                <td className="standings-table__td standings-table__td--center">
                  {standing.totalPredictions}
                </td>
                <td className="standings-table__td standings-table__td--center">
                  {Math.round(standing.accuracy)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Matches Panel Component
interface MatchesPanelProps {
  matches: Match[];
  userPredictions: Prediction[];
  onPredictionSubmit: (
    matchId: string,
    homeScore: number,
    awayScore: number
  ) => Promise<void>;
  predictionLoading: string | null;
}

const MatchesPanel = ({
  matches,
  userPredictions,
  onPredictionSubmit,
  predictionLoading,
}: MatchesPanelProps) => {
  const [predictions, setPredictions] = useState<
    Record<string, { home: string; away: string }>
  >({});

  const handleInputChange = (
    matchId: string,
    team: "home" | "away",
    value: string
  ) => {
    setPredictions((prev) => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [team]: value,
      },
    }));
  };

  const handleSubmit = async (matchId: string) => {
    const pred = predictions[matchId];
    if (!pred || pred.home === "" || pred.away === "") return;

    await onPredictionSubmit(matchId, parseInt(pred.home), parseInt(pred.away));

    // Clear inputs
    setPredictions((prev) => {
      const newPreds = { ...prev };
      delete newPreds[matchId];
      return newPreds;
    });
  };

  const getUserPrediction = (matchId: string) => {
    return userPredictions.find((p) => p.matchId === matchId);
  };

  if (matches.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          background: "var(--neutral-50)",
          borderRadius: "var(--radius-xl)",
        }}
      >
        <p>No hay partidos disponibles</p>
      </div>
    );
  }

  return (
    <div role="tabpanel" id="matches-panel" className="matches-list">
      {matches.map((match) => {
        const userPred = getUserPrediction(match.id);
        const canPredict = match.status === "scheduled";
        const currentPred = predictions[match.id];

        return (
          <article key={match.id} className="match-card">
            <div className="match-card__header">
              <span className="match-card__round">Jornada {match.round}</span>
              <span
                className={`match-card__status match-card__status--${match.status}`}
              >
                {match.status === "scheduled" && "Próximo"}
                {match.status === "live" && "🔴 En Vivo"}
                {match.status === "finished" && "Finalizado"}
              </span>
            </div>

            <div className="match-card__match">
              <span className="match-card__team match-card__team--home">
                {match.homeTeam}
              </span>
              {match.status === "finished" || match.status === "live" ? (
                <div className="match-card__score">
                  <span>{match.homeScore}</span>
                  <span className="match-card__score-separator">-</span>
                  <span>{match.awayScore}</span>
                </div>
              ) : (
                <span className="match-card__score-separator">vs</span>
              )}
              <span className="match-card__team match-card__team--away">
                {match.awayTeam}
              </span>
            </div>

            <div className="match-card__date">
              {new Date(match.date).toLocaleString("es-ES", {
                day: "2-digit",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            {canPredict && (
              <div className="prediction-form">
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={currentPred?.home ?? ""}
                  onChange={(e) =>
                    handleInputChange(match.id, "home", e.target.value)
                  }
                  className="prediction-form__input"
                  placeholder="0"
                  disabled={!!predictionLoading}
                />
                <span className="prediction-form__separator">-</span>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={currentPred?.away ?? ""}
                  onChange={(e) =>
                    handleInputChange(match.id, "away", e.target.value)
                  }
                  className="prediction-form__input"
                  placeholder="0"
                  disabled={!!predictionLoading}
                />
                <button
                  onClick={() => handleSubmit(match.id)}
                  disabled={
                    !currentPred ||
                    currentPred.home === "" ||
                    currentPred.away === "" ||
                    predictionLoading === match.id
                  }
                  className="prediction-form__button"
                >
                  {predictionLoading === match.id
                    ? "Guardando..."
                    : userPred
                    ? "Actualizar"
                    : "Predecir"}
                </button>
              </div>
            )}

            {userPred && (
              <div
                style={{
                  marginTop: "var(--space-3)",
                  padding: "var(--space-3)",
                  background: "var(--neutral-100)",
                  borderRadius: "var(--radius-md)",
                  textAlign: "center",
                  fontSize: "var(--font-sm)",
                }}
              >
                Tu predicción:{" "}
                <strong>
                  {userPred.homeScore} - {userPred.awayScore}
                </strong>
                {userPred.points !== undefined && (
                  <span
                    style={{
                      marginLeft: "var(--space-2)",
                      color: "var(--primary-600)",
                      fontWeight: 700,
                    }}
                  >
                    +{userPred.points} pts
                  </span>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
};

// Predictions Panel Component
interface PredictionsPanelProps {
  predictions: Prediction[];
  matches: Match[];
}

const PredictionsPanel = ({ predictions, matches }: PredictionsPanelProps) => {
  if (predictions.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          background: "var(--neutral-50)",
          borderRadius: "var(--radius-xl)",
        }}
      >
        <p>No has hecho predicciones aún</p>
      </div>
    );
  }

  return (
    <div role="tabpanel" id="predictions-panel" className="matches-list">
      {predictions.map((prediction) => {
        const match = matches.find((m) => m.id === prediction.matchId);
        if (!match) return null;

        return (
          <article key={prediction.id} className="match-card">
            <div className="match-card__match">
              <span className="match-card__team match-card__team--home">
                {match.homeTeam}
              </span>
              <div className="match-card__score">
                <span>{prediction.homeScore}</span>
                <span className="match-card__score-separator">-</span>
                <span>{prediction.awayScore}</span>
              </div>
              <span className="match-card__team match-card__team--away">
                {match.awayTeam}
              </span>
            </div>

            {match.status === "finished" &&
              match.homeScore !== undefined &&
              match.awayScore !== undefined && (
                <div
                  style={{
                    marginTop: "var(--space-3)",
                    padding: "var(--space-3)",
                    background: prediction.points
                      ? "var(--accent-50)"
                      : "var(--neutral-100)",
                    borderRadius: "var(--radius-md)",
                    textAlign: "center",
                    fontSize: "var(--font-sm)",
                  }}
                >
                  Resultado real:{" "}
                  <strong>
                    {match.homeScore} - {match.awayScore}
                  </strong>
                  {prediction.points !== undefined && (
                    <span
                      style={{
                        marginLeft: "var(--space-3)",
                        color:
                          prediction.points > 0
                            ? "var(--accent-600)"
                            : "var(--neutral-600)",
                        fontWeight: 700,
                        fontSize: "var(--font-lg)",
                      }}
                    >
                      {prediction.points > 0
                        ? `+${prediction.points} pts ✓`
                        : "0 pts ✗"}
                    </span>
                  )}
                </div>
              )}
          </article>
        );
      })}
    </div>
  );
};
