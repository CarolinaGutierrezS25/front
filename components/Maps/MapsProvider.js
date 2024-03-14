import { createContext, useContext, useEffect, useState } from "react";
import { getMaps } from "./MapsService";

const MapsContext = createContext(null);

export default function MapsProvider({ children }) {
  const [Maps, setMaps] = useState([]);

  useEffect(() => {
    getMaps().then((data) => {
      setMaps(data);
    });
  }, []);

  return <MapsContext.Provider value={Maps}>{children}</MapsContext.Provider>;
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
