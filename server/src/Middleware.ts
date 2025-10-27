

export const userAuth = async (req, res, next) => {
  try {

    const { token } = req.headers;

    console.log({token});
    next();

  } catch(err) {
    console.error("user auth error:", err)
  }
}


export * as Middleware from "./Middleware";
