import {
  getRequest,
  postRequest,
  deleteRequest,
} from "../../helpers/axiosRequest";
import { MainHttp } from "@env";

async function getContactList() {
  try {
    const { data } = await getRequest(`${MainHttp}contact/list`, {
      withCredentials: true,
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
async function addContact(data) {
  await postRequest(`${MainHttp}contact/register`, data, {
    withCredentials: true,
  });
  return true;
}
async function modContact(data) {
  await postRequest(`${MainHttp}contact/edit`, data, {
    withCredentials: true,
  });
  return true;
}
async function delContact(phoneNumber) {
  await deleteRequest(`${MainHttp}contact/${phoneNumber}`, {
    withCredentials: true,
  });
  return true;
}

export { getContactList, addContact, modContact, delContact };
