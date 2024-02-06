import { postRequest } from "../../helpers/axiosRequest";
import { MainHttp } from "@env";

async function changePassword(passwordData) {
  try {
    const { data, status } = await postRequest(
      `${MainHttp}user/password`,
      passwordData,
      { withCredentials: true }
    );
    return {data, status}
  } catch (error) {
    throw error;
  }
}

export { changePassword };
