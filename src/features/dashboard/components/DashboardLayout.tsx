import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import { UserProfile } from "./UserProfile";
import { UserStats } from "./UserStats";
import { LeaguesList } from "./LeaguesList";
import { QuickActions } from "./QuickActions";
import { useDashboard } from "../hooks/useDashboard";
import { DashboardSkeleton } from "./SkeletonLoader";
import { useState } from "react";
import "./Dashboard.css";

export const DashboardLayout = () => {
  const { logout } = useAuth();
  const { user, stats, loading } = useDashboard();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (loading || !user) {
    return (
      <div className="dashboard">
        <div className="dashboard__main">
          <DashboardSkeleton cardsCount={6} />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard__header" role="banner">
        <div className="dashboard__header-container">
          <div className="dashboard__header-logo">
            <h1 className="dashboard__header-title">
              <span role="img" aria-label="Trofeo">
                🏆
              </span>{" "}
              Quiniela
            </h1>
            <p className="dashboard__header-subtitle">Panel de Control</p>
          </div>
          <div className="dashboard__header-actions">
            <div className="dashboard__user-info">
              <p className="dashboard__user-name">{user.name}</p>
              <p className="dashboard__user-email">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn--danger"
              aria-label="Cerrar sesión"
            >
              Cerrar Sesión
            </button>
            <button
              onClick={toggleMobileMenu}
              className="dashboard__menu-button"
              aria-label="Abrir menú"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="dashboard__hamburger">
                <span className="dashboard__hamburger-line"></span>
                <span className="dashboard__hamburger-line"></span>
                <span className="dashboard__hamburger-line"></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`dashboard__mobile-overlay ${
          mobileMenuOpen ? "dashboard__mobile-overlay--open" : ""
        }`}
        onClick={toggleMobileMenu}
        aria-hidden={!mobileMenuOpen}
      />

      {/* Mobile Menu */}
      <nav
        id="mobile-menu"
        className={`dashboard__mobile-menu ${
          mobileMenuOpen ? "dashboard__mobile-menu--open" : ""
        }`}
        role="navigation"
        aria-label="Menú de navegación móvil"
      >
        <button
          onClick={toggleMobileMenu}
          className="dashboard__mobile-close"
          aria-label="Cerrar menú"
        >
          ✕
        </button>

        <div className="dashboard__mobile-user">
          <p className="dashboard__user-name">{user.name}</p>
          <p className="dashboard__user-email">{user.email}</p>
        </div>

        <button
          onClick={() => {
            handleLogout();
            setMobileMenuOpen(false);
          }}
          className="btn btn--danger"
          style={{ width: "100%" }}
        >
          Cerrar Sesión
        </button>
      </nav>

      {/* Main Content */}
      <main className="dashboard__main" role="main">
        {/* Welcome Banner */}
        <div className="dashboard__banner">
          <h2 className="dashboard__banner-title">
            ¡Bienvenido, {user.name.split(" ")[0]}!{" "}
            <span role="img" aria-label="saludo">
              👋
            </span>
          </h2>
          <p className="dashboard__banner-subtitle">
            Estás listo para comenzar tu quiniela
          </p>
        </div>

        {/* Grid de Información */}
        <div className="dashboard__grid">
          <UserProfile user={user} />
          <LeaguesList user={user} />
          <UserStats stats={stats} />
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </main>
    </div>
  );
};
