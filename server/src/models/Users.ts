import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    token: {
      type: String
    },
    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt fields
  }
);

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

