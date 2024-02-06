import { postRequest } from "../../helpers/axiosRequest";
import { MainHttp } from "@env";
async function getMaps(coords) {
  try {
    const {data} = await postRequest(`${MainHttp}incident/list`, coords, {
      withCredentials: true,
    });
    return data?.data || [];
  } catch (error) {
    throw error;
  }
}

export { getMaps };
