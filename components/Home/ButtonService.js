import { postRequest } from "../../helpers/axiosRequest";
import { MainHttp } from "@env";

async function incidentInit(coords) {
  try {
    console.log("Coords",coords);
    const { data } = await postRequest(
      `${MainHttp}incident/start`,
      coords,
      { withCredentials: true }
    );
    console.log("Result from Incident Init",data);
    return data.data.incidentId;
  } catch (error) {
    console.log("Error from Incident Init",error.toJSON());
    throw error;
  }
}

async function incidentEnd(form) {
  console.log("Form",form)
  try {
    const { data } = await postRequest(`${MainHttp}incident/finish`, form, {
      withCredentials: true,headers:{
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("Result from Incident End",data);
    return data.data.message;
  } catch (error) {
    console.log("Error from Incident End",error.toJSON());
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
        console.log("Result from UpdateLocation",data);
        return data.data.message;
    } catch (error) {
        throw error;
    }
}

export { incidentInit, incidentEnd, updateLocation };


