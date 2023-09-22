import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import AlertCard from "../components/MyAlerts/AlertCard";
import {useTheme} from '@rneui/themed'
import {useAlert} from '../components/MyAlerts/AlertProvider';
export default function MyAlerts() {
  const {theme} = useTheme();
  const Alert = useAlert()

  return (
    <FlatList
      data={Alert}
      numColumns={2}
      keyExtractor={(e) => e.id}
      renderItem={({ item }) => <AlertCard content={item.content} id={item.id} fecha={item.fecha}/>}
      style={[styles.mainView,{backgroundColor: theme.colors.background}]}
    />
  );
}

const styles = StyleSheet.create({
  mainView: {
    padding: 5,
  },
});
