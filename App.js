import { ThemeProvider } from "@rneui/themed";
import theme from "./components/assets/theme";
import Engine from "./Engine";
import AlertProvider from "./components/MyAlerts/AlertProvider";
import AuthProvider from "./helpers/AuthProvider";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AlertProvider>
          <Engine />
        </AlertProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
