import { postRequest } from "../../helpers/axiosRequest";
import { MainHttp } from "@env";
async function getMaps() {
  try {
    const { data } = await postRequest(
      `${MainHttp}incident/list`,
      {},
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export { getMaps };
