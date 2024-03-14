import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider, useTheme } from "@rneui/themed";
//LoginViews
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
//MainView
import MainScreen from "./TabBar/MainScreen";
//View for Edit Trusted Contacs
import TrustedEdit from "./pages/TrustedEdit";
//SettingsViews
import Account from "./pages/Account";
import Notifications from "./pages/Notifications";
import Theme from "./pages/Theme";
//Settings-Account
import ChangePassword from "./pages/ChangePassword";
import DeleteAccount from "./pages/DeleteAccount";
//CardView-Modal
import CardView from "./pages/CardView";

import Permissions from "./pages/Permissions";
import ButtonPressed from "./pages/ButtonPressed";
import Form from "./pages/Form";
import TrustedProvider from "./components/Trusted/TrustedProvider";
import {useContext,useCallback} from 'react'
import {useAuth} from './helpers/AuthProvider';
import * as SplashScreen from "expo-splash-screen";
import { View,Text } from 'react-native'
import AlertProvider from './components/MyAlerts/AlertProvider';

SplashScreen.preventAutoHideAsync();

export default function Engine() {

  const Stack = createNativeStackNavigator();
  const {state} = useAuth();
  const { theme } = useTheme();
  const onLayoutRootView = useCallback(async () => {
    if (state.isLoading==false) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 1000);
    }
  }, [state.isLoading]);
  
  if(state.isLoading === true) return null

  return (
    <AlertProvider>
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!state.isSignIn ? (
            <Stack.Group>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Group>
          ) : (
            <>
              <Stack.Group>
                <Stack.Screen name="Permissions" component={Permissions} />
                <Stack.Screen name="MainScreen" component={MainScreen} />
                <Stack.Screen name="Form" component={Form} />
                <Stack.Screen
                  name="TrustedEdit"
                  component={TrustedEdit}
                  options={{ presentation: "modal" }}
                />
                <Stack.Screen
                  name="CardView"
                  component={CardView}
                  options={{ presentation: "modal" }}
                />
              </Stack.Group>
              <Stack.Group
                screenOptions={{
                  headerShown: true,
                  headerStyle: { backgroundColor: theme.colors.white },
                  headerTitleStyle: { color: theme.colors.black },
                  headerTintColor: theme.colors.primary,
                }}
              >
                <Stack.Screen
                  name="Account"
                  component={Account}
                  options={{ title: "Account Settings" }}
                />
                <Stack.Screen
                  name="Notifications"
                  component={Notifications}
                  options={{ title: "Notifications Settings" }}
                />
                <Stack.Screen
                  name="Theme"
                  component={Theme}
                  options={{ title: "Theme Settings" }}
                />
                <Stack.Screen
                  name="ButtonPressed"
                  component={ButtonPressed}
                  options={{ title: "Camera", headerShown: false }}
                />
                <Stack.Screen
                  name="DeleteAccount"
                  component={DeleteAccount}
                  options={{ title: "Eliminar Cuenta" }}
                />
                <Stack.Screen
                  name="ChangePassword"
                  component={ChangePassword}
                  options={{ title: "Cambiar Contraseña" }}
                />
              </Stack.Group>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      </AlertProvider>
  );
}
