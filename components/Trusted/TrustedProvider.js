import { createContext, useReducer, useContext } from "react";
import { getContactList,addContact, delContact, modContact } from "./TrustedService";
import { useState, useEffect } from "react";


const TrustedContext = createContext(null);

const TrustedDispatchContext = createContext(null);

export default function TrustedProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, []);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getContactList();
      dispatch({ type: "FETCH", payload: data });
    }
    fetchUsers();
  }, []);

  return (
    <TrustedContext.Provider value={state}>
      <TrustedDispatchContext.Provider value={dispatch}>
        {children}
      </TrustedDispatchContext.Provider>
    </TrustedContext.Provider>
  );
}

export function useTrusted() {
  return useContext(TrustedContext);
}

export function useTrustedDispatch() {
  return useContext(TrustedDispatchContext);
}

function appReducer(users, action) {
  switch (action.type) {
    case "ADD":
      const contact = {contactName: action.payload.name, contactPhone: action.payload.phone};
      addContact(contact).then((res) => console.log(res)).catch((err) => console.log(err.toJSON()));
      return [...users, action.payload];
    case "MOD":
      const contactMod = {previousPhone: action.prev, newPhone: action.payload.phone, contactName: action.payload.name};
      modContact(contactMod).then((res) => console.log(res)).catch((err) => console.log(err.toJSON()));
      return users.map((user) => {
        if (user.phone == action.prev) return action.payload;
        return user;
      });
      case "DEL":
      delContact(action.payload).then((res) => console.log(res)).catch((err) => console.log(err.toJSON()));
      return users.filter((user) => user.phone != action.payload);
    case "FETCH":
      return action.payload;
      default:
      return null;
  }
}
