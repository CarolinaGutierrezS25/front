import { postRequest } from "../../helpers/axiosRequest";
import { MainHttp } from "@env";


async function addUser(registrerData) {
  try {
    const { data,status,statusText } = await postRequest(
      `${MainHttp}user/register`,
      registrerData,
      { withCredentials: true }
    );
    if (status === 200){
      return data;
    }
    if(status === 400){
      throw new Error(statusText);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export { addUser};

