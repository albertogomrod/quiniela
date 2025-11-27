import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export interface NavbarProps {
  isAuthenticated?: boolean;
  userName?: string;
  onLogout?: () => void;
}

export const Navbar = ({
  isAuthenticated = false,
  userName,
  onLogout,
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <nav className="navbar__container" aria-label="Navegación principal">
        {/* Logo */}
        <Link to="/" className="navbar__brand" onClick={closeMobileMenu}>
          <span className="navbar__icon" role="img" aria-label="Trofeo">
            🏆
          </span>
          <span className="navbar__title">Quiniela</span>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar__menu desktop-only">
          {isAuthenticated ? (
            <>
              <span className="navbar__user-name">
                Hola, {userName?.split(" ")[0]}
              </span>
              <Link
                to="/dashboard"
                className="navbar__button navbar__button--primary"
              >
                Ir al Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__link">
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="navbar__button navbar__button--primary"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="navbar__hamburger mobile-only"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="navbar__hamburger-line"></span>
          <span className="navbar__hamburger-line"></span>
          <span className="navbar__hamburger-line"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="navbar__overlay"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div className="navbar__mobile-menu" id="mobile-menu">
            {isAuthenticated ? (
              <>
                <div className="navbar__mobile-user">
                  <span className="navbar__mobile-greeting">Hola,</span>
                  <span className="navbar__mobile-name">{userName}</span>
                </div>
                <Link
                  to="/dashboard"
                  className="navbar__mobile-link"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    onLogout?.();
                    closeMobileMenu();
                  }}
                  className="navbar__mobile-link navbar__mobile-link--danger"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="navbar__mobile-link"
                  onClick={closeMobileMenu}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="navbar__mobile-link navbar__mobile-link--primary"
                  onClick={closeMobileMenu}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </header>
  );
};
