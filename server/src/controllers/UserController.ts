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


export const handleFriendRequest = async (req, res) => {
  const user = req.user;

  const { requestId, action } = req.body;


  const request = await FriendRequestModel.findOne({ _id: requestId });

  if (!request) {
    throw new Error("missing requestId or invalid request")
  } else if (request.status !== "pending") {
    throw new Error("invalid request status");
  } else if (!["accept", "reject"].includes(action)) {
    throw new Error("invalid action");
  }

  await FriendRequestModel.updateOne({ _id: requestId }, { status: action });


  if (action === "accept") {
    await UserModel.updateOne({ _id: user._id }, { $push: { friends: request.creatorId } });
    await UserModel.updateOne({ _id: request.creatorId }, { $push: { friends: user._id } });
  }


  res.send({status: "success"})
}



export const getUserSocials = async (req, res) => {
  const user = req.user;

  const pendingReqs = await FriendRequestModel.find({ targetId: user._id, status: "pending" })
    .populate("creatorId")

  const userWithFriends = await UserModel.findOne({ _id: user._id }).populate("friends")

  res.send({ status: "success", pendingRequests: pendingReqs, friends: userWithFriends!.friends });
}


export * as UserController from "./UserController";
