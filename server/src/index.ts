import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { Utils } from "./Utils";
import { AuthController } from "./controllers/AuthController";
import { GroupsController } from "./controllers/GroupsController";
import { Middleware } from "./Middleware";
import { PostsController } from "./controllers/PostsController";
const app = express();

try {
  mongoose.connect(process.env.MONGO_URL!).then(() => console.log("DB connected"));
  console.log("Connected to MongoDB");
} catch (err) {
  console.error("MongoDB connection error:", err);
}


//midleware
app.use(express.json());
app.use(cors());



//post
app.post("/sign_up", Utils.tryCatch(AuthController.signUp))
app.post("/sign_in", Utils.tryCatch(AuthController.signIn));
app.post("/sign_out", Utils.tryCatch(AuthController.signOut));

app.post("/group/create", [Middleware.userAuth], Utils.tryCatch(GroupsController.create));
app.post("/post/create", [Middleware.userAuth], Utils.tryCatch(PostsController.create));


//get
app.get("/posts", [Middleware.userAuth], Utils.tryCatch(PostsController.getFeed));
app.get("/", async (req, res) => {
  res.send("healthy")
})


app.listen(3000, () => {
  console.info("Server is running on port 3000")
})
