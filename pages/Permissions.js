import { View, Text, SafeAreaView } from "react-native";
import { Button, useTheme } from "@rneui/themed";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import * as Location from "expo-location";
import { useState } from "react";

export default function Permissions({ navigation }) {
  const { theme } = useTheme();
  const [loading, setloading] = useState(false);
  
  async function requestAllPermmissions() {
    setloading(true);
    await Camera.requestCameraPermissionsAsync();
    await Location.requestBackgroundPermissionsAsync();
    await Location.requestForegroundPermissionsAsync();
    await Audio.requestPermissionsAsync();
    setloading(false);
    navigation.navigate("MainScreen");
  }
  
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          justifyContent: "center",
        }}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>
            Para empezar necesitamos de algunos permisos para la app
          </Text>
          <Button
            onPress={async (e) => {
              await requestAllPermmissions();
            }}
            style={{ alignSelf: "center", paddingTop: 30 }}
            buttonStyle={{ paddingHorizontal: 15, paddingVertical: 15 }}
            titleStyle={{ fontFamily: "Arial Rounded MT Bold", fontSize: 20 }}
            title="Entendido"
            radius="md"
            type="solid"
            size="lg"
            loading={loading}
          ></Button>
        </View>
      </SafeAreaView>
    </>
  );
}

export async function getAllPermissionsStatus() {
  const cameraPermissions = await Camera.getCameraPermissionsAsync();
  const locationPermissions = await Location.getBackgroundPermissionsAsync();
  const location2Permissions = await Location.getBackgroundPermissionsAsync();
  const audioPermissions = await Audio.getPermissionsAsync();
  
  return (
    cameraPermissions.granted &&
    locationPermissions.granted &&
    audioPermissions.granted &&
    location2Permissions.granted
  );
}
