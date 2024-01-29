import { createContext, useContext } from "react";
import axios from 'axios';
const MapsContext = createContext(null);


export default function MapsProvider({ children }) {
  return (
    <MapsContext.Provider value={Maps}>{children}</MapsContext.Provider>
  );
}

export function useMaps() {
  return useContext(MapsContext);
}




// const Maps = [
//   {
//     id: "1",
//     fecha: "10-03-2020",
//     content:
//       "Amet voluptate ipsum reprehenderit nisi reprehenderit minim consequat velit fugiat elit veniam labore eiusmod aliqua.",
//   },
//   {
//     id: "2",
//     fecha: "11-03-2020",
//     content:
//       "Amet voluptate ipsum reprehenderit nisi reprehenderit minim consequat velit fugiat elit veniam labore eiusmod aliqua.",
//   },
//   {
//     id: "3",
//     fecha: "12-03-2020",
//     content:
//       "Amet voluptate ipsum reprehenderit nisi reprehenderit minim consequat velit fugiat elit veniam labore eiusmod aliqua.",
//   },
//   {
//     id: "4",
//     fecha: "13-03-2020",
//     content:
//       "Amet voluptate ipsum reprehenderit nisi reprehenderit minim consequat velit fugiat elit veniam labore eiusmod aliqua.",
//   },
// ];
