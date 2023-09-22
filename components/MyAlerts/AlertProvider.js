import { createContext, useReducer, useContext } from "react";

const AlertContext = createContext(null);


export default function AlertProvider({ children }) {
  return (
    <AlertContext.Provider value={alerts}>{children}</AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}

const alerts = [
  {
    id: "1",
    fecha: "10-03-2020",
    content:
      "Amet voluptate ipsum reprehenderit nisi reprehenderit minim consequat velit fugiat elit veniam labore eiusmod aliqua.",
  },
  {
    id: "2",
    fecha: "11-03-2020",
    content:
      "Amet voluptate ipsum reprehenderit nisi reprehenderit minim consequat velit fugiat elit veniam labore eiusmod aliqua.",
  },
  {
    id: "3",
    fecha: "12-03-2020",
    content:
      "Amet voluptate ipsum reprehenderit nisi reprehenderit minim consequat velit fugiat elit veniam labore eiusmod aliqua.",
  },
  {
    id: "4",
    fecha: "13-03-2020",
    content:
      "Amet voluptate ipsum reprehenderit nisi reprehenderit minim consequat velit fugiat elit veniam labore eiusmod aliqua.",
  },
];
