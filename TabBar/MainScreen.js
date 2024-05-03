import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import { useTheme } from "@rneui/themed";

import Trusted from "../pages/Trusted";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import MyAlerts from "../pages/MyAlerts";
import Maps from "../pages/Maps";
import TrustedProvider from "../components/Trusted/TrustedProvider";
import AlertProvider from "../components/MyAlerts/AlertProvider";
import MapsProvider from "../components/Maps/MapsProvider";

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  const { theme } = useTheme();
  return (
    <MapsProvider>
      <AlertProvider>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: true,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Home") {
                  iconName = focused ? "radiobox-blank" : "radiobox-marked";
                } else if (route.name === "Trusted") {
                  iconName = focused ? "contacts" : "contacts-outline";
                } else if (route.name === "Settings") {
                  iconName = focused ? "cog" : "cog-outline";
                } else if (route.name === "MyAlerts") {
                  iconName = focused
                    ? "account-alert"
                    : "account-alert-outline";
                } else if (route.name === "Maps") {
                  iconName = focused ? "map" : "map-outline";
                }
                return (
                  <Icon
                    name={iconName}
                    size={size}
                    type="material-community"
                    color={color}
                  />
                );
              },
              tabBarActiveTintColor:
                route.name === "Home" ? "red" : theme.colors.primary,
              tabBarInactiveTintColor: "gray",
              headerStyle: { backgroundColor: theme.colors.white },
              headerTitleStyle: { color: theme.colors.black },
              tabBarStyle: {
                backgroundColor: theme.colors.white,
                borderTopColor: theme.colors.white,
              },
              headerShadowVisible: false,
            })}
          >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{ title: "Botón" }}
            />
            <Tab.Screen
              name="MyAlerts"
              component={MyAlerts}
              options={{ title: "Alertas" }}
            />
            <Tab.Screen
              name="Maps"
              component={Maps}
              options={{ title: "Mapa", headerTitle: "Mapa de Alertas" }}
            />
            <Tab.Screen
              name="Trusted"
              component={Trusted}
              options={{ title: "Contactos" }}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{ title: "Ajustes" }}
            />
          </Tab.Navigator>
      </AlertProvider>
    </MapsProvider>
  );
}
