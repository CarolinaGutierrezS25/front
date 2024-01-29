import { createContext, useReducer, useContext } from "react";
import { getContactList } from "./TrustedService";

const TrustedContext = createContext(null);

const TrustedDispatchContext = createContext(null);

export default function TrustedProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, users);

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
    default:
      return null;
  }
}

const users = async () => {
  return await getContactList();
};
