import mongoose  from "mongoose";

const FriendRequestSchema = new mongoose.Schema(
  {
    creatorId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    targetId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    status: {type: String, default: "pending"}
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt fields
  }
);

export const FriendRequestModel = mongoose.models.FriendRequest || mongoose.model("FriendRequest", FriendRequestSchema);


