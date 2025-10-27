import bcrypt from "bcryptjs";


export const hashPassword = (password: string, rounds = 10) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, rounds, (err, hash) => (err ? reject(err) : resolve(hash)))
  );
}

export * as Tokenizer from "./Tokenizer";
