const express = require("express");
const router = express.Router();
const League = require("../models/League");
const authMiddleware = require("../middleware/authMiddleware");
const { body, validationResult } = require("express-validator");

// Middleware de autenticación para todas las rutas
router.use(authMiddleware);

// POST /api/leagues - Crear nueva liga
router.post(
  "/",
  [
    body("name")
      .trim()
      .isLength({ min: 3, max: 50 })
      .escape()
      .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
      .withMessage("Nombre debe tener entre 3 y 50 caracteres alfanuméricos"),
    body("description").optional().trim().isLength({ max: 200 }).escape(),
    body("competition")
      .isIn([
        "premier-league",
        "la-liga",
        "serie-a",
        "bundesliga",
        "ligue-1",
        "champions-league",
      ])
      .withMessage("Competición inválida"),
    body("teamName")
      .trim()
      .isLength({ min: 2, max: 30 })
      .escape()
      .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
      .withMessage("Nombre del equipo inválido"),
    body("type")
      .isIn(["public", "private"])
      .withMessage("Tipo de liga inválido"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: errors.array(),
      });
    }

    try {
      const { name, description, competition, teamName, type } = req.body;

      const inviteCode = await League.generateInviteCode();

      const league = new League({
        name,
        description: description || "",
        competition,
        type: type || "private",
        inviteCode,
        adminId: req.user.id,
        participants: [
          {
            userId: req.user.id,
            teamName,
            joinedAt: new Date(),
            points: 0,
          },
        ],
      });

      await league.save();

      const inviteLink = `${
        process.env.FRONTEND_URL || "http://localhost:5173"
      }/join/${inviteCode}`;

      res.status(201).json({
        message: "Liga creada exitosamente",
        league: {
          id: league._id,
          name: league.name,
          description: league.description,
          competition: league.competition,
          type: league.type,
          inviteCode: league.inviteCode,
          adminId: league.adminId,
          participants: league.participants.map((p) => p.userId.toString()),
          createdAt: league.createdAt,
        },
        inviteCode: league.inviteCode,
        inviteLink,
      });
    } catch (error) {
      console.error("Error al crear liga:", error);
      res.status(500).json({
        message: "Error al crear la liga",
        error: error.message,
      });
    }
  }
);

// GET /api/leagues/my-leagues - Obtener ligas del usuario
router.get("/my-leagues", async (req, res) => {
  try {
    const leagues = await League.find({
      "participants.userId": req.user.id,
      isActive: true,
    })
      .select(
        "name description competition type inviteCode adminId participants createdAt"
      )
      .sort({ createdAt: -1 });

    const formattedLeagues = leagues.map((league) => ({
      id: league._id,
      name: league.name,
      description: league.description,
      competition: league.competition,
      type: league.type,
      inviteCode: league.inviteCode,
      isAdmin: league.adminId.toString() === req.user.id,
      participantsCount: league.participants.length,
      myTeamName: league.participants.find(
        (p) => p.userId.toString() === req.user.id
      )?.teamName,
      createdAt: league.createdAt,
    }));

    res.json(formattedLeagues);
  } catch (error) {
    console.error("Error al obtener ligas:", error);
    res.status(500).json({
      message: "Error al obtener las ligas",
      error: error.message,
    });
  }
});

// GET /api/leagues/:id - Obtener detalles de una liga
router.get("/:id", async (req, res) => {
  try {
    const league = await League.findById(req.params.id)
      .populate("adminId", "name email")
      .populate("participants.userId", "name email");

    if (!league) {
      return res.status(404).json({ message: "Liga no encontrada" });
    }

    if (!league.isParticipant(req.user.id)) {
      return res.status(403).json({
        message: "No tienes acceso a esta liga",
      });
    }

    res.json({
      id: league._id,
      name: league.name,
      description: league.description,
      competition: league.competition,
      type: league.type,
      inviteCode: league.inviteCode,
      admin: {
        id: league.adminId._id,
        name: league.adminId.name,
        email: league.adminId.email,
      },
      participants: league.participants.map((p) => ({
        id: p.userId._id,
        name: p.userId.name,
        email: p.userId.email,
        teamName: p.teamName,
        points: p.points,
        joinedAt: p.joinedAt,
      })),
      settings: league.settings,
      isAdmin: league.isAdmin(req.user.id),
      createdAt: league.createdAt,
      updatedAt: league.updatedAt,
    });
  } catch (error) {
    console.error("Error al obtener liga:", error);
    res.status(500).json({
      message: "Error al obtener la liga",
      error: error.message,
    });
  }
});

// POST /api/leagues/join - Unirse a una liga con código
router.post("/join", async (req, res) => {
  try {
    const { inviteCode, teamName } = req.body;

    if (!inviteCode || !teamName) {
      return res.status(400).json({
        message: "Código de invitación y nombre de equipo son obligatorios",
      });
    }

    const league = await League.findOne({
      inviteCode: inviteCode.toUpperCase(),
      isActive: true,
    });

    if (!league) {
      return res.status(404).json({
        message: "Código de invitación inválido",
      });
    }

    if (league.isParticipant(req.user.id)) {
      return res.status(400).json({
        message: "Ya eres participante de esta liga",
      });
    }

    if (league.participants.length >= league.settings.maxParticipants) {
      return res.status(400).json({
        message: "La liga ha alcanzado el límite de participantes",
      });
    }

    league.participants.push({
      userId: req.user.id,
      teamName,
      joinedAt: new Date(),
      points: 0,
    });

    await league.save();

    res.json({
      message: "Te has unido a la liga exitosamente",
      league: {
        id: league._id,
        name: league.name,
        description: league.description,
        competition: league.competition,
        type: league.type,
      },
    });
  } catch (error) {
    console.error("Error al unirse a la liga:", error);
    res.status(500).json({
      message: "Error al unirse a la liga",
      error: error.message,
    });
  }
});

// DELETE /api/leagues/:id - Eliminar liga (solo admin)
router.delete("/:id", async (req, res) => {
  try {
    const league = await League.findById(req.params.id);

    if (!league) {
      return res.status(404).json({ message: "Liga no encontrada" });
    }

    if (!league.isAdmin(req.user.id)) {
      return res.status(403).json({
        message: "Solo el administrador puede eliminar la liga",
      });
    }

    league.isActive = false;
    await league.save();

    res.json({ message: "Liga eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar liga:", error);
    res.status(500).json({
      message: "Error al eliminar la liga",
      error: error.message,
    });
  }
});

module.exports = router;
