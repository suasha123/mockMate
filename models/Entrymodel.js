import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  url: {
    type: String
  },
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Entry || mongoose.model("Entry", EntrySchema);
