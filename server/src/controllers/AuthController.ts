import { UserModel } from "../models/Users";
import { Utils } from "../Utils";

export const signUp = async (req, res) => {

  const { email, password, name } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("user already exists!")
  }
  const user = await UserModel.create({
    email,
    password,
    name,
    token: Utils.generateToken()
  })

  res.send({ status: "success", user: { ...user, password: undefined } });
}

export const signIn = async (req, res) => {

  const { email, password } = req.body;
  const token = Utils.generateToken();


  const user = await UserModel.findOne({ email, password });
  if (!user) {
    throw new Error("wrong credentials")
  }

  await UserModel.updateOne({ email }, { token });

  res.send({ status: "success", user: { ...user, password: undefined } });
}


export const signOut = async (req, res) => {
  const { email, token } = req.body;

  const user = await UserModel.findOne({ email, token });
  if (!user) {
    throw new Error("wrong email or token");
  }

  await UserModel.updateOne({ email }, { token: null });
  res.send({ status: "success" })

}

export * as AuthController from "./AuthController";
