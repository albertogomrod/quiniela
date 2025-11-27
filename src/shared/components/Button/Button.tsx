import { type ReactNode, type ButtonHTMLAttributes, forwardRef } from "react";
import "./Button.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual del botón */
  variant?: "primary" | "secondary" | "accent" | "ghost" | "danger";
  /** Tamaño del botón */
  size?: "sm" | "md" | "lg";
  /** Ocupar todo el ancho disponible */
  fullWidth?: boolean;
  /** Estado de carga */
  loading?: boolean;
  /** Icono a mostrar (antes del texto) */
  icon?: ReactNode;
  /** Icono a mostrar (después del texto) */
  iconRight?: ReactNode;
  /** Contenido del botón */
  children: ReactNode;
}

/**
 * Componente Button accesible y reutilizable
 *
 * Características:
 * - WCAG 2.1 AA compliant
 * - Focus visible mejorado
 * - Estados de loading
 * - Múltiples variantes y tamaños
 * - Touch targets mínimos 44x44px
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      icon,
      iconRight,
      children,
      className = "",
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const classes = [
      "button",
      `button--${variant}`,
      `button--${size}`,
      fullWidth && "button--full-width",
      loading && "button--loading",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span className="button__spinner" aria-hidden="true">
            <svg className="button__spinner-icon" viewBox="0 0 24 24">
              <circle
                className="button__spinner-circle"
                cx="12"
                cy="12"
                r="10"
                fill="none"
                strokeWidth="3"
              />
            </svg>
          </span>
        )}
        {!loading && icon && (
          <span className="button__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="button__text">{children}</span>
        {!loading && iconRight && (
          <span className="button__icon-right" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
