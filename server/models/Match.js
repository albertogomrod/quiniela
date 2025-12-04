const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  // ID del partido desde el servicio externo
  externalId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  // Información de la competición
  competition: {
    type: String,
    required: true,
    enum: ['premier-league', 'la-liga', 'serie-a', 'bundesliga', 'ligue-1'],
    index: true
  },
  
  season: {
    type: String,
    required: true,
    index: true
  },
  
  round: {
    type: String,
    default: null
  },
  
  // Equipos
  homeTeam: {
    type: String,
    required: true
  },
  
  awayTeam: {
    type: String,
    required: true
  },
  
  // Resultado
  homeScore: {
    type: Number,
    default: null
  },
  
  awayScore: {
    type: Number,
    default: null
  },
  
  // Estado del partido
  status: {
    type: String,
    required: true,
    enum: ['scheduled', 'live', 'finished', 'postponed', 'cancelled'],
    default: 'scheduled',
    index: true
  },
  
  // Fecha del partido
  date: {
    type: Date,
    required: true,
    index: true
  },
  
  // Información adicional
  venue: {
    type: String,
    default: null
  },
  
  // Metadata
  lastSync: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índice compuesto para búsquedas eficientes
matchSchema.index({ competition: 1, season: 1, date: 1 });
matchSchema.index({ status: 1, date: 1 });

// Método estático para obtener partidos de una competición
matchSchema.statics.getByCompetition = function(competition, season = null, options = {}) {
  const query = { competition };
  if (season) {
    query.season = season;
  }
  
  return this.find(query)
    .sort({ date: options.sortOrder || 1 })
    .limit(options.limit || 100);
};

// Método estático para obtener partidos próximos
matchSchema.statics.getUpcoming = function(competition, limit = 10) {
  return this.find({
    competition,
    status: 'scheduled',
    date: { $gte: new Date() }
  })
    .sort({ date: 1 })
    .limit(limit);
};

// Método estático para obtener partidos finalizados recientes
matchSchema.statics.getRecentFinished = function(competition, limit = 10) {
  return this.find({
    competition,
    status: 'finished',
    date: { $lte: new Date() }
  })
    .sort({ date: -1 })
    .limit(limit);
};

// Método para actualizar resultado
matchSchema.methods.updateResult = function(homeScore, awayScore, status = 'finished') {
  this.homeScore = homeScore;
  this.awayScore = awayScore;
  this.status = status;
  this.lastSync = new Date();
  return this.save();
};

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
