import { postRequest } from "../../helpers/axiosRequest";
import { MainHttp } from "@env";


async function login(loginData) {
  try {
    const { data } = await postRequest(
      `${MainHttp}user/login`,
      loginData,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

async function logout() {
    try {
      const { data } = await postRequest(
        `${MainHttp}user/logout`,
        {},
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

export { login, logout };

