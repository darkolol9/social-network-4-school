// import bcrypt from "bcryptjs";

// export const hashPassword = (password: string, rounds = 10) => {
//   return new Promise((resolve, reject) =>
//     bcrypt.hash(password, rounds, (err, hash) => (err ? reject(err) : resolve(hash)))
//   );
// }


// helper to convert ArrayBuffer -> hex string
const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return toHex(hashBuffer);
};


export * as Tokenizer from "./Tokenizer";
