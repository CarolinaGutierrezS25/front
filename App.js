import { ThemeProvider } from "@rneui/themed";
import theme from "./components/assets/theme";
import Engine from "./Engine";
import AlertProvider from "./components/MyAlerts/AlertProvider";
import AuthProvider from "./helpers/AuthProvider";
import * as SplashScreen from "expo-splash-screen";
import { View, Text } from "react-native";


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
          <Engine />
      </AuthProvider>
    </ThemeProvider>
  );
}
