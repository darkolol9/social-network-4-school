import { UserModel } from "./models/Users";


export const userAuth = async (req, res, next) => {
  try {

    const { token } = req.headers;


    const user = await UserModel.findOne({ token });
    if (!user) {
      throw new Error("invalid token");
    } 

    req.user = user;

    next();

  } catch(err) {
    console.error("user auth error:", err)
    res.status(401).json({status: "unauthorized"});
  }
}


export * as Middleware from "./Middleware";
