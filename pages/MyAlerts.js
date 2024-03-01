import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import AlertCard from "../components/MyAlerts/AlertCard";
import {useTheme} from '@rneui/themed'
import {useAlert} from '../components/MyAlerts/AlertProvider';
export default function MyAlerts() {
  const {theme} = useTheme();
  const {alerts} = useAlert()

  return (
    <FlatList
      data={alerts}
      numColumns={2}
      keyExtractor={(e) => e.id}
      renderItem={({ item }) => <AlertCard item={item}/>}
      style={[styles.mainView,{backgroundColor: theme.colors.background}]}
    />
  );
}

const styles = StyleSheet.create({
  mainView: {
    padding: 5,
  },
});
