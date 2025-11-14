import { Link } from "react-router-dom";
import { useAuth } from "../features/auth";

export const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Header/Navbar */}
      <header
        style={{
          background: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <nav
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "28px" }}>🏆</span>
            <h1
              style={{
                margin: 0,
                fontSize: "24px",
                fontWeight: "700",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Quiniela
            </h1>
          </div>

          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            {isAuthenticated ? (
              <>
                <span style={{ color: "#666", fontSize: "14px" }}>
                  Hola, {user?.name?.split(" ")[0]}
                </span>
                <Link
                  to="/dashboard"
                  style={{
                    padding: "10px 24px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "14px",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-2px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  Ir al Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    padding: "10px 24px",
                    color: "#667eea",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  style={{
                    padding: "10px 24px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "14px",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-2px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 20px",
          color: "white",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px" }}>
          <h2
            style={{
              fontSize: "56px",
              fontWeight: "800",
              marginBottom: "20px",
              lineHeight: "1.2",
            }}
          >
            Compite con tus amigos
            <br />
            <span
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                padding: "0 15px",
                borderRadius: "8px",
              }}
            >
              en la quiniela
            </span>
          </h2>

          <p
            style={{
              fontSize: "20px",
              marginBottom: "40px",
              opacity: 0.95,
              lineHeight: "1.6",
            }}
          >
            Crea ligas privadas, haz predicciones de partidos y compite
            <br />
            por el primer lugar en tiempo real
          </p>

          {!isAuthenticated && (
            <div
              style={{ display: "flex", gap: "20px", justifyContent: "center" }}
            >
              <Link
                to="/register"
                style={{
                  padding: "18px 40px",
                  background: "white",
                  color: "#667eea",
                  textDecoration: "none",
                  borderRadius: "12px",
                  fontWeight: "700",
                  fontSize: "18px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-3px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                Comenzar Gratis
              </Link>
              <Link
                to="/login"
                style={{
                  padding: "18px 40px",
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "12px",
                  fontWeight: "700",
                  fontSize: "18px",
                  border: "2px solid white",
                  backdropFilter: "blur(10px)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-3px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                Iniciar Sesión
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          background: "#f5f7fa",
          padding: "80px 20px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h3
            style={{
              fontSize: "36px",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "60px",
              color: "#333",
            }}
          >
            ¿Cómo funciona?
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "40px",
            }}
          >
            {/* Feature 1 */}
            <div
              style={{
                background: "white",
                padding: "40px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                textAlign: "center",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>🎯</div>
              <h4
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  marginBottom: "15px",
                  color: "#333",
                }}
              >
                Crea tu liga
              </h4>
              <p style={{ color: "#666", lineHeight: "1.6", fontSize: "15px" }}>
                Crea una liga privada e invita a tus amigos con un código único
              </p>
            </div>

            {/* Feature 2 */}
            <div
              style={{
                background: "white",
                padding: "40px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                textAlign: "center",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>⚽</div>
              <h4
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  marginBottom: "15px",
                  color: "#333",
                }}
              >
                Haz predicciones
              </h4>
              <p style={{ color: "#666", lineHeight: "1.6", fontSize: "15px" }}>
                Predice los resultados de los partidos antes de que comiencen
              </p>
            </div>

            {/* Feature 3 */}
            <div
              style={{
                background: "white",
                padding: "40px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                textAlign: "center",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>🏆</div>
              <h4
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  marginBottom: "15px",
                  color: "#333",
                }}
              >
                Gana puntos
              </h4>
              <p style={{ color: "#666", lineHeight: "1.6", fontSize: "15px" }}>
                Acumula puntos por cada acierto y escala en la clasificación
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "80px 20px",
            color: "white",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h3
              style={{
                fontSize: "40px",
                fontWeight: "800",
                marginBottom: "20px",
              }}
            >
              ¿Listo para comenzar?
            </h3>
            <p
              style={{
                fontSize: "18px",
                marginBottom: "40px",
                opacity: 0.95,
              }}
            >
              Únete ahora y crea tu primera liga en menos de 2 minutos
            </p>
            <Link
              to="/register"
              style={{
                display: "inline-block",
                padding: "18px 48px",
                background: "white",
                color: "#667eea",
                textDecoration: "none",
                borderRadius: "12px",
                fontWeight: "700",
                fontSize: "18px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-3px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              Crear Cuenta Gratis
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        style={{
          background: "#2d3748",
          color: "white",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "32px" }}>🏆</span>
            <h4
              style={{
                margin: "10px 0 0 0",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Quiniela
            </h4>
          </div>
          <p style={{ color: "#a0aec0", fontSize: "14px", margin: 0 }}>
            © 2025 Quiniela. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
