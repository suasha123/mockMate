import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  round: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  feedback: {
    type: String,
  },
  emotionTrend: {
    type: [String],
    default: [],
  },
  score: {
    technical: { type: Number, default: 0 },
    communication: { type: Number, default: 0 },
    overall: { type: Number, default: 0 },
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  endedAt: {
    type: Date,
    default : null,
  },
});

export default mongoose.models.Room || mongoose.model("Room", roomSchema);
