import crypto from "crypto";

export const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
}


export const tryCatch = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      const now = new Date().toLocaleString(); // readable local timestamp
      console.error(`[${now}][error occurred]`, err);
      res.status(500).json({ error: err.message });
    });
  };
};




export * as Utils from "./Utils";
