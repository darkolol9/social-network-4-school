import express from "express";

import mongoose from "mongoose";
import { Utills } from "./Utils";
import { AuthController } from "./controllers/AuthController";
const app = express();

try {
  mongoose.connect(process.env.MONGO_URL!).then(() => console.log("DB connected"));
  console.log("✅ Connected to MongoDB");
} catch (err) {
  console.error("❌ MongoDB connection error:", err);
}

app.use(express.json());



app.post("/sign_up", Utills.tryCatch(AuthController.signUp))

app.post("/sign_in", Utills.tryCatch(AuthController.signIn));








app.get("/", async (req, res) => {
  res.send("healthy")
})



app.listen(3000, () => {
  console.info("Server is running on port 3000")
})
