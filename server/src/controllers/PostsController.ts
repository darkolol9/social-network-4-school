import { PostModel } from "../models/Posts";



export const create = async (req, res) => {

  const user = req.user;
  const { text, groupId } = req.body;

  if (!user) {
    throw new Error("no user");
  }

  const post = await PostModel.create({
    text,
    authorId: user._id,
    groupId
  })


  res.send({ status: "success", post });
}



export const getFeed = async (req, res) => {
  // const user = req.user;

  const allPosts = await PostModel.find().populate("authorId");

  res.send({posts: allPosts});

}


export * as PostsController from "./PostsController";
