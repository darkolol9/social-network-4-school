import crypto from "crypto";

export const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
}


export const tryCatch = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.error("[error occurred]", err.message);
      res.status(500).json({ error: err.message });
    });
  };
};



export * as Utills from "./Utils";
