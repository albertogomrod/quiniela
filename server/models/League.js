const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  description: {
    type: String,
    maxlength: 200,
    default: "",
  },
  competition: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["public", "private"],
    default: "private",
  },
  inviteCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  participants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      teamName: {
        type: String,
        required: true,
        trim: true,
      },
      joinedAt: {
        type: Date,
        default: Date.now,
      },
      points: {
        type: Number,
        default: 0,
      },
    },
  ],
  settings: {
    maxParticipants: {
      type: Number,
      default: 50,
    },
    pointsPerExactScore: {
      type: Number,
      default: 3,
    },
    pointsPerCorrectResult: {
      type: Number,
      default: 1,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

leagueSchema.index({ inviteCode: 1 });
leagueSchema.index({ adminId: 1 });
leagueSchema.index({ "participants.userId": 1 });

leagueSchema.statics.generateInviteCode = async function () {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code;
  let exists = true;

  while (exists) {
    code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    exists = await this.findOne({ inviteCode: code });
  }

  return code;
};

leagueSchema.methods.isAdmin = function (userId) {
  return this.adminId.toString() === userId.toString();
};

leagueSchema.methods.isParticipant = function (userId) {
  return this.participants.some(
    (p) => p.userId.toString() === userId.toString()
  );
};

module.exports = mongoose.model("League", leagueSchema);
