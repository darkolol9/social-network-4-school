import mongoose from "mongoose";

const GroupScehema = new mongoose.Schema({
  name: { type: String, required: true },
  lastUpdatedAt: { type: Date, default: Date.now },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true }
);

export const GroupModel = mongoose.models.Group || mongoose.model("Group", GroupScehema);


