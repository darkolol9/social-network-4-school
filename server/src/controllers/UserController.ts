import { FriendRequestModel } from "../models/FriendRequests";
import { UserModel } from "../models/Users";



export const createFriendRequest = async (req, res) => {


  const user = req.user;
  const { targetUserId } = req.body;


  const targetUser = await UserModel.findOne({ _id: targetUserId });
  const existingReq = await FriendRequestModel.findOne({ creatorId: user._id, targetId: targetUserId });

  if (!targetUser) {
    throw new Error("target user not found!");
  } else if (targetUser._id.toString() === user._id.toString()) {
    throw new Error("cannot invite thyself!!")
  } else if (user.friends.includes(targetUserId)) {
    throw new Error("already friends!");
  } else if (existingReq) {
    throw new Error("friend request already sent!");
  }

  await FriendRequestModel.create({
    creatorId: user._id,
    targetId: targetUserId
  })


  res.send({ status: "success" });

}



export * as UserController from "./UserController";
