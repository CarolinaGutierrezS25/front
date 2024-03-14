import { createContext, useContext, useEffect ,useState} from "react";
import {getAlerts} from './AlertService';
import {useAuth} from '../../helpers/AuthProvider';
const AlertContext = createContext(null);


export default function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  const { authContext } = useAuth();

  
  async function fetchAlerts() {
    try {
      const data = await getAlerts();
      data?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAlerts(data);
    } catch (error) {
      if (error?.response?.status === 401) {
        authContext.signOut();
      }
      else{
        console.log(error);
      }
    }
    }
  
  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <AlertContext.Provider value={{alerts,fetchAlerts}}>{children}</AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}

// const alerts = [
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
