import { postRequest } from "../../helpers/axiosRequest";
import { MainHttp } from "@env";


async function addUser(registrerData) {
  try {
    const { data } = await postRequest(
      `${MainHttp}user/register`,
      registrerData,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export { addUser};

