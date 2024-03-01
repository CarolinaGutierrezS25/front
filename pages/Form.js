import { View, SafeAreaView } from "react-native";
import { makeStyles, ListItem, Divider, Text } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import {useContext} from 'react'
import {useAlert} from '../components/MyAlerts/AlertProvider';

export default function Form() {
  const styles = useStyles();
  const {fetchAlerts} = useAlert();
  const navigation = useContext(NavigationContext)


  function togglePress(number) {
    let string = "";
    switch (number) {
      case 1:
        string = "No especificado";
        break;
      case 2:
        string = "Acoso";
        break;
      case 3:
        string = "Intento de Asalto";
        break;
      case 4:
        string = "Intento de secuestro";
        break;
      case 5:
        string = "Intento de violacion";
        break;
      case 6:
        string = "Violencia doméstica";
        break;
      default:
        string = "Otro";
    }
    fetchAlerts().then().catch();
    navigation.navigate("MainScreen")
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.mainView}>
        <Text h2 style={styles.text}>Elige la opcion que mejor describa el insidente</Text>
        <TouchableOpacity
          onPress={(e) => {
            togglePress(1);
          }}
        >
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>No especificado</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <Divider />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(e) => {
            togglePress(2);
          }}
        >
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>Acoso</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <Divider />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(e) => {
            togglePress(3);
          }}
        >
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>Intento de asalto</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <Divider />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(e) => {
            togglePress(4);
          }}
        >
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>Intento de secuestro</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <Divider />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(e) => {
            togglePress(5);
          }}
        >
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>Intento de violación</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <Divider />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(e) => {
            togglePress(6);
          }}
        >
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>Violencia doméstica</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <Divider />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(e) => {
            togglePress(7);
          }}
        >
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>Otro</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <Divider />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme) => ({
  mainView: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  titleContainer: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,.6)",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  container: {
    backgroundColor: "rgba(255,255,255,.6)",
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
  },
  chevronContainer: {
    backgroundColor: theme.colors.background,
    paddingTop: 10,
  },
  color: {
    color: theme.colors.primary,
  },
  text: {
    color: theme.colors.primary,
    paddingBottom:20,
    paddingLeft:10
  },
}));
