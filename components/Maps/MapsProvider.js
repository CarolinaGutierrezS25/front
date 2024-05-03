import { createContext, useContext, useEffect, useState } from "react";
import { getMaps } from "./MapsService";

const MapsContext = createContext(null);

export default function MapsProvider({ children }) {
  const [Maps, setMaps] = useState([]);
  
  async function fetchMaps(coords) {
    const data = await getMaps(coords);
    setMaps(data);
  }

  return <MapsContext.Provider value={{Maps,fetchMaps}}>{children}</MapsContext.Provider>;
}

export function useMaps() {
  return useContext(MapsContext);
}


