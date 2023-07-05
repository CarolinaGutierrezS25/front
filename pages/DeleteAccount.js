import { View, StyleSheet,Text } from "react-native";
import {Button} from '@rneui/themed'

export default function DeleteAccount() {
  return (
    <View style={styles.mainView}>
      <Text>¿Estas seguro de querer eliminar tu cuenta? Una vez eliminada 
        <Text style={{fontWeight: 'bold',textTransform: 'uppercase'}}> no podra ser recuperada </Text> 
        para continuar presiona el botón de "Eliminar Cuenta"
      </Text>
      <Button title="Eliminar Cuenta" type="clear" titleStyle={{color:"red"}}></Button>

    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30
  },
});
