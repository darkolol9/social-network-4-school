import express from "express";

import mongoose from "mongoose";
import { Utils } from "./Utils";
import { AuthController } from "./controllers/AuthController";
import { GroupsController } from "./controllers/GroupsController";
import { Middleware } from "./Middleware";
const app = express();

try {
  mongoose.connect(process.env.MONGO_URL!).then(() => console.log("DB connected"));
  console.log("Connected to MongoDB");
} catch (err) {
  console.error("MongoDB connection error:", err);
}


//midleware
app.use(express.json());



//post
app.post("/sign_up", Utils.tryCatch(AuthController.signUp))
app.post("/sign_in", Utils.tryCatch(AuthController.signIn));
app.post("/sign_out", Utils.tryCatch(AuthController.signOut));

app.post("/group/create", [Middleware.userAuth], Utils.tryCatch(GroupsController.createGroup));



//get
app.get("/", async (req, res) => {
  res.send("healthy")
})


app.listen(3000, () => {
  console.info("Server is running on port 3000")
})
