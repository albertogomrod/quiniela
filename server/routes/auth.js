const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/auth/register - Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validaciones
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "La contraseña debe tener al menos 8 caracteres",
      });
    }

    if (password.length > 72) {
      return res.status(400).json({
        message: "La contraseña no puede exceder 72 caracteres",
      });
    }

    // Validar complejidad
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,72}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "La contraseña debe contener al menos una mayúscula, una minúscula y un número",
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        message: "El email ya está registrado",
      });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      isFirstTime: true,
      ligas: [],
    });

    await user.save();

    // Generar token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isFirstTime: user.isFirstTime,
        ligas: user.ligas,
      },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({
      message: "Error al registrar usuario",
      error: error.message,
    });
  }
});

// POST /api/auth/login - Inicio de sesión
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones
    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña son obligatorios",
      });
    }

    // Buscar usuario
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    // Generar token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isFirstTime: user.isFirstTime,
        ligas: user.ligas,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
});

// GET /api/auth/me - Obtener datos del usuario autenticado
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isFirstTime: user.isFirstTime,
      ligas: user.ligas,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({
      message: "Error al obtener datos del usuario",
      error: error.message,
    });
  }
});

// PUT /api/auth/update - Actualizar datos del usuario
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { name, isFirstTime } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (isFirstTime !== undefined) updateData.isFirstTime = isFirstTime;

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.json({
      message: "Usuario actualizado exitosamente",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isFirstTime: user.isFirstTime,
        ligas: user.ligas,
      },
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({
      message: "Error al actualizar usuario",
      error: error.message,
    });
  }
});

module.exports = router;
