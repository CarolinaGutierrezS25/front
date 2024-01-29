import axios from "axios";

async function postRequest(url, data, config) {
  return await axios.post(url, data, config);
}
async function getRequest(url, config) {
  return await axios.get(url, config);
}
async function putRequest(url, data, config) {
  return await axios.put(url, data, config);
}

export { postRequest,getRequest,putRequest };
