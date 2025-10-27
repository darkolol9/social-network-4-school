import { UserModel } from "../models/Users";
import { Utills } from "../Utils";

export const signUp = async (req, res) => {

  const { email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("user already exists!")
  }

  await UserModel.create({
    email,
    password
  })


  res.send("user created");

}


export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const token = Utills.generateToken();


  const user = await UserModel.findOne({ email, password });
  if (!user) {
    throw new Error("wrong credentials")
  }

  await UserModel.updateOne({ email }, { token });
  res.send({ status: "success", token })

}

export * as AuthController from "./AuthController";
