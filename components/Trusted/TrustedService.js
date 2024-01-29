import {
  getRequest,
  postRequest,
  deleteRequest,
} from "../../helpers/axiosRequest";
import { MainHttp } from "@env";

async function getContactList() {
  try {
    const contacts = await getRequest(`${MainHttp}contact/list`, {
        withCredentials: true,
      });
    return contacts?.data || [];
  } catch (error) {
    console.log(error);
  }

}
async function addContact(data) {
  const contacts = await postRequest(`${MainHttp}contact/register`, data, {
    withCredentials: true,
  });
  return contacts?.data || [];
}
async function modContact(data) {
  const contacts = await postRequest(`${MainHttp}contact/list`, data, {
    withCredentials: true,
  });
  return contacts?.data || [];
}
async function delContact(phoneNumber) {
  const contacts = await deleteRequest(`${MainHttp}contact/${phoneNumber}`, {
    withCredentials: true,
  });
  return contacts?.data || [];
}

export { getContactList };
