import { createContext, useReducer, useContext } from "react";
import { getContactList } from "./TrustedService";
import { useState, useEffect } from "react";

async function fetchData() {
  const data = await getContactList();
  return data;
}
const users = [];

const TrustedContext = createContext(null);

const TrustedDispatchContext = createContext(null);

export default function TrustedProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, users);

  useEffect(() => {
    dispatch({ type: "FETCH" });
    console.log(state);
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
      return [...users, action.payload];
    case "MOD":
      return users.map((user) => {
        if (user.id == action.payload.id) return action.payload;
        return user;
      });
    case "DEL":
      console.log(action.payload);
      return users.filter((user) => user.id != action.payload);
    case "FETCH":
      let data2 = []
      fetchData().then((data) => {console.log(data)});
      console.log(data2);
      return data2;
    default:
      return null;
  }
}
