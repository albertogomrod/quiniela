const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No se proporcionó token de autenticación",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar usuario a la request
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Token inválido",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expirado",
      });
    }

    res.status(500).json({
      message: "Error al verificar token",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
