
import axios, { type AxiosRequestConfig } from "axios"

const SERVER_URL = import.meta.env.VITE_API_URL;



const getConfig = (addToken: boolean) => {

  try {
    const config: AxiosRequestConfig = {};
    if (addToken) {
      const token = localStorage.getItem("token");
      config.headers = {
        token
      }
    }
    return config;
  } catch (err) {
    console.error("faled to get token", err)
    return {}
  }

}


export const getFromServer = async (path: string, addTokenToHeader = true) => {

  try {
    const config = getConfig(addTokenToHeader);
    const res = await axios.get(SERVER_URL + path, config);
    return res;
  } catch (err) {
    console.error(err);
    return null;
  }

}

export const postToServer = async (path: string, body: any, addTokenToHeader = true) => {
  try {
    const config = getConfig(addTokenToHeader);
    const res = await axios.post(SERVER_URL + path, body, config);
    return res;
  } catch (err) {
    console.error(err);
    return null;
  }
}


export * as Http from "./Http";
