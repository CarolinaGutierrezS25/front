import { postRequest } from "../../helpers/axiosRequest";

async function login(loginData) {
  try {
    const { data } = await postRequest(
      "https://appi.safetyguard.com.mx/user/login",
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
        "https://appi.safetyguard.com.mx/user/logout",
        {},
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

export { login, logout };

