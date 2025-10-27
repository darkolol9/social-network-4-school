import { GroupModel } from "../models/Groups";




export const createGroup = async (req, res) => {

  const { groupName } = req.body;

  if (!groupName) {
    throw new Error("group name is required");
  }

  const existingGroup = await GroupModel.findOne({ name: groupName });
  if (existingGroup) {
    throw new Error("group already exists!");
  }

  const newGroup = await GroupModel.create({ name: groupName });

  await GroupModel.updateOne({ _id: newGroup._id }, { $push: { users: req.user._id } });

  res.send({ status: "success", group: newGroup });

}

export * as GroupsController from "./GroupsController";
