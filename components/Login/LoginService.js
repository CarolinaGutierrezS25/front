import { postRequest } from "../../helpers/axiosRequest";
import { MainHttp } from "@env";
import {setTokenStorage} from '../../helpers/tokenServices';


async function login(loginData) {
  try {
    console.log(loginData)
    console.log(`${MainHttp}user/login`)
    const { data, status } = await postRequest(
      `${MainHttp}user/login`,
      loginData,
      { withCredentials: true }
    );
      await setTokenStorage(data.data.expiresAt);
      return data;
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

