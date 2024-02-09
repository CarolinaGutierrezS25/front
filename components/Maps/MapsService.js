import { postRequest } from "../../helpers/axiosRequest";
import { MainHttp } from "@env";
import * as Location from 'expo-location';

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

async function getActualPosition(coords) {
  try {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      throw new Error("Location permission not granted");
    }
    const location = await Location.getCurrentPositionAsync({});
    return {latitude: location.coords.latitude, longitude: location.coords.longitude};
  } catch (error) {
    throw error;
  }
}

export { getMaps,getActualPosition };
