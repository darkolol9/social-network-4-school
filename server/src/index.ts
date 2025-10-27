import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { Utils } from "./Utils";
import { AuthController } from "./controllers/AuthController";
import { GroupsController } from "./controllers/GroupsController";
import { Middleware } from "./Middleware";
import { PostsController } from "./controllers/PostsController";
import { UserController } from "./controllers/UserController";
import { UserModel } from "./models/Users";
import { FriendRequestModel } from "./models/FriendRequests";
import { PostModel } from "./models/Posts";
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
app.post("/friends/request", [Middleware.userAuth], Utils.tryCatch(UserController.createFriendRequest));
app.post("/friends/handle-request", [Middleware.userAuth], Utils.tryCatch(UserController.handleFriendRequest));


app.get("/posts", [Middleware.userAuth], Utils.tryCatch(PostsController.getFeed));
app.get("/friends/requests", [Middleware.userAuth], Utils.tryCatch(UserController.getUserSocials));
app.get("/users/search", [Middleware.userAuth], Utils.tryCatch(UserController.findUsers));




app.post("/fake-data", async (req, res) => {
  const users: any[] = await UserModel.find();



  //create fake friend requests
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users.length; j++) {

      const reqExists = await FriendRequestModel.findOne({ creatorId: users[i]._id, targetId: users[j]._id });
      if (reqExists) continue;
      await FriendRequestModel.create({
        creatorId: users[i]._id,
        targetId: users[j]._id,
        status: "pending"
      })
    }
  }

  //create random posts
  for (const user of users) {
    await PostModel.create({
      text: Utils.getRandomSentence(),
      authorId: user._id
    })
  }


  res.send({status: "success"})
})


//get
app.get("/", async (req, res) => {
  res.send("healthy")
})


app.listen(3000, () => {
  console.info("Server is running on port 3000")
})
