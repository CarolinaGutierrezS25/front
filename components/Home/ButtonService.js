import { postRequest } from "../../helpers/axiosRequest";
import { MainHttp } from "@env";

async function incidentInit(coords) {
  try {
    const { data } = await postRequest(
      `${MainHttp}incident/start`,
      coords,
      { withCredentials: true }
    );
    return data.data.incidentId;
  } catch (error) {
    throw error;
  }
}

async function incidentEnd(form) {
  try {
    const { data } = await postRequest(`${MainHttp}incident/finish`, form, {
      withCredentials: true,
    });
    return data.data.message;
  } catch (error) {
    throw error;
  }
}

async function updateLocation(coords) {
    try {
        const { data } = await postRequest(
        `${MainHttp}incident/refresh`,
        coords,
        { withCredentials: true }
        );
        return data.data.message;
    } catch (error) {
        throw error;
    }
}

export { incidentInit, incidentEnd, updateLocation };


