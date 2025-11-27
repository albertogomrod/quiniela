import { Link } from "react-router-dom";
import { useAuth } from "../features/auth";
import { Navbar } from "../shared/components";
import "./Home.css";

export const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home">
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      {/* Navbar Component */}
      <Navbar isAuthenticated={isAuthenticated} userName={user?.name} />

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero__container">
            <h1 className="hero__title">
              Compite con tus amigos
              <br />
              <span className="hero__highlight">en la quiniela</span>
            </h1>

            <p className="hero__subtitle">
              Crea ligas privadas, haz predicciones de partidos y compite
              <br className="desktop-only" />
              por el primer lugar en tiempo real
            </p>

            {!isAuthenticated && (
              <div className="hero__actions">
                <Link
                  to="/register"
                  className="hero__button hero__button--primary"
                >
                  Comenzar Gratis
                </Link>
                <Link
                  to="/login"
                  className="hero__button hero__button--secondary"
                >
                  Iniciar Sesión
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <div className="hero__actions">
                <Link
                  to="/dashboard"
                  className="hero__button hero__button--primary"
                >
                  Ir al Dashboard
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="features__container">
            <h2 className="features__title">¿Cómo funciona?</h2>

            <div className="features__grid">
              {/* Feature 1 */}
              <article className="feature-card">
                <div
                  className="feature-card__icon"
                  role="img"
                  aria-label="Objetivo"
                >
                  🎯
                </div>
                <h3 className="feature-card__title">Crea tu liga</h3>
                <p className="feature-card__description">
                  Crea una liga privada e invita a tus amigos con un código
                  único
                </p>
              </article>

              {/* Feature 2 */}
              <article className="feature-card">
                <div
                  className="feature-card__icon"
                  role="img"
                  aria-label="Fútbol"
                >
                  ⚽
                </div>
                <h3 className="feature-card__title">Haz predicciones</h3>
                <p className="feature-card__description">
                  Predice los resultados de los partidos antes de que comiencen
                </p>
              </article>

              {/* Feature 3 */}
              <article className="feature-card">
                <div
                  className="feature-card__icon"
                  role="img"
                  aria-label="Trofeo"
                >
                  🏆
                </div>
                <h3 className="feature-card__title">Gana puntos</h3>
                <p className="feature-card__description">
                  Acumula puntos por cada acierto y escala en la clasificación
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!isAuthenticated && (
          <section className="cta">
            <div className="cta__container">
              <h2 className="cta__title">¿Listo para comenzar?</h2>
              <p className="cta__subtitle">
                Únete ahora y crea tu primera liga en menos de 2 minutos
              </p>
              <Link to="/register" className="cta__button">
                Crear Cuenta Gratis
              </Link>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__brand">
            <span className="footer__icon" role="img" aria-label="Trofeo">
              🏆
            </span>
            <span className="footer__name">Quiniela</span>
          </div>
          <p className="footer__copyright">
            © 2025 Quiniela. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
