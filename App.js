import { ThemeProvider } from "@rneui/themed";
import theme from "./components/assets/theme";
import Engine from "./Engine";
import TrustedProvider from "./components/Trusted/TrustedProvider";
import AlertProvider from "./components/MyAlerts/AlertProvider";
import MapsProvider from './components/Maps/MapsProvider';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
        <AlertProvider>
            <Engine />
        </AlertProvider>
    </ThemeProvider>
  );
}
