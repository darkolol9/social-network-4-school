import express from "express";
import { UserModel } from "./models/Users";

import mongoose from "mongoose";
const app = express();



try {
  mongoose.connect(process.env.MONGO_URL!).then(() => console.log("DB connected"));
  console.log("✅ Connected to MongoDB");
} catch (err) {
  console.error("❌ MongoDB connection error:", err);
}



app.get("/create", async (req, res) => {

  await UserModel.create({
    email: "test@user.com",
    password: "password"
  })

  res.send("user created");

});



app.get("/", async (req, res) => {
  console.log("hello world");
  res.send("hiiii2222222")
})



app.listen(3000, () => {
  console.info("Server is running on port 3000")
})
