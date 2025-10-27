import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema({
  text: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: false },
}, { timestamps: true }
);

export const PostModel = mongoose.models.Post || mongoose.model("Post", PostsSchema);



