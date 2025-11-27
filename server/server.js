require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth");
const leagueRoutes = require("./routes/leagues");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", process.env.FRONTEND_URL],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    noSniff: true,
    xssFilter: true,
    hidePoweredBy: true,
  })
);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/quiniela", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión a MongoDB:", err));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/leagues", leagueRoutes);
const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Demasiados intentos, intenta de nuevo más tarde" },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      message:
        "Demasiados intentos de inicio de sesión. Intenta de nuevo en 15 minutos.",
      retryAfter: req.rateLimit.resetTime,
    });
  },
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { message: "Demasiados registros desde esta IP" },
});

// Aplicar limitadores
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", registerLimiter);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "API de Quiniela funcionando" });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Algo salió mal",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
