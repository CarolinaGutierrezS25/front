import { postRequest } from "../../helpers/axiosRequest";
import { MainHttp } from "@env";

async function login(loginData) {
  try {
    console.log(`${MainHttp}user/login`)
    const { data } = await postRequest(
      `${MainHttp}user/login`,
      loginData,
      { withCredentials: true }
    );
      return data.data;
  } catch (error) {
    throw error;
  }
}

async function logout() {
    try {
      const { data,status } = await postRequest(
        `${MainHttp}user/logout`,
        {},
        { withCredentials: true }
      );
      if (status === 200){
        return data;
      }
    } catch (error) {
      throw error;
    }
  }

export { login, logout };

