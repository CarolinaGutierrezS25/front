
import {View } from "react-native";
import { useContext } from "react";
import { NavigationContext } from "@react-navigation/native";
import SettingsItem from '../Settings/SettingsItem'
export default function SettingsList() {
  const navigation = useContext(NavigationContext)
  const toggleNav = (view) => {
    navigation.navigate(view);
  }
  return (
    
    <View >
      <SettingsItem icon='person' type="Cuenta" view="Account"/>
      <SettingsItem icon='palette' type="Tema" view="Theme"/>
    </View>
  );
}
