import { postRequest } from "../../helpers/axiosRequest";
import { MainHttp } from "@env";

async function changePassword(passwordData) {
  try {
    const { data, status } = await postRequest(
      `${MainHttp}user/password`,
      passwordData,
      { withCredentials: true }
    );
    if (status === 200) {
      return data;
    }
    if (status === 400) {
      throw new Error("Contraseña Anterior Incorrecta");
    }
  } catch (error) {
    throw error;
  }
}

export { changePassword };
