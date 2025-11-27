import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import "../../../shared/styles/auth.css";
import { useAuth } from "../hooks/useAuth";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Limpiar error del campo al escribir
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    if (name === "name") {
      if (!value.trim()) {
        newErrors.name = "El nombre es obligatorio";
      } else if (value.trim().length < 3) {
        newErrors.name = "Mínimo 3 caracteres";
      } else {
        delete newErrors.name;
      }
    }

    if (name === "email") {
      if (!value) {
        newErrors.email = "El email es obligatorio";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors.email = "Email inválido";
      } else {
        delete newErrors.email;
      }
    }

    if (name === "password") {
      if (!value) {
        newErrors.password = "La contraseña es obligatoria";
      } else if (value.length < 6) {
        newErrors.password = "Mínimo 6 caracteres";
      } else {
        delete newErrors.password;
      }

      // Revalidar confirmación si ya está llena
      if (formData.confirmPassword) {
        if (value !== formData.confirmPassword) {
          newErrors.confirmPassword = "Las contraseñas no coinciden";
        } else {
          delete newErrors.confirmPassword;
        }
      }
    }

    if (name === "confirmPassword") {
      if (!value) {
        newErrors.confirmPassword = "Confirma tu contraseña";
      } else if (value !== formData.password) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validar todos los campos
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!formData.email) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await register(
        formData.name,
        formData.email,
        formData.password
      );

      // El AuthRedirectGuard se encargará de la redirección
      console.log("Registro exitoso:", response.user);
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : "Error al registrarse",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <div className="auth-card" id="main-content">
        <h2>Crear Cuenta</h2>
        <p className="auth-subtitle">Únete a la quiniela</p>

        {errors.general && (
          <div className="error-message" role="alert">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="name" className="required">
              Nombre completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={(e) => validateField("name", e.target.value)}
              placeholder="Juan Pérez"
              disabled={loading}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              autoFocus
            />
            {errors.name && (
              <span id="name-error" className="field-error" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="required">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={(e) => validateField("email", e.target.value)}
              placeholder="tu@email.com"
              disabled={loading}
              autoComplete="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span id="email-error" className="field-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="required">
              Contraseña
            </label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={(e) => validateField("password", e.target.value)}
                placeholder="Mínimo 6 caracteres"
                disabled={loading}
                autoComplete="new-password"
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={
                  errors.password
                    ? "password-error password-hint"
                    : "password-hint"
                }
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                <span aria-hidden="true">{showPassword ? "👁️" : "👁️‍🗨️"}</span>
              </button>
            </div>
            {errors.password && (
              <span id="password-error" className="field-error" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="required">
              Confirmar contraseña
            </label>
            <div className="password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={(e) => validateField("confirmPassword", e.target.value)}
                placeholder="Repite tu contraseña"
                disabled={loading}
                autoComplete="new-password"
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                aria-describedby={
                  errors.confirmPassword ? "confirm-password-error" : undefined
                }
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
              >
                <span aria-hidden="true">
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </span>
              </button>
            </div>
            {errors.confirmPassword && (
              <span
                id="confirm-password-error"
                className="field-error"
                role="alert"
              >
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="auth-link">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
