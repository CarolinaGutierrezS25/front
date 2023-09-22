import { TouchableOpacity, StyleSheet} from "react-native";
import { Avatar } from "@rneui/themed";
import { NavigationContext } from "@react-navigation/native";
import { useContext } from "react";

export default function BtnContainer({}) {
  const navigation = useContext(NavigationContext)

  const handleNav = () => {
    navigation.navigate("ButtonPressed");
  }
  return (
    <TouchableOpacity onPress={handleNav}> 
      <Avatar
        rounded
        icon={{ name: "report", type: "material" }}
        size={250}
        containerStyle={styles.avatar}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "red",
    borderWidth: 10,
    borderColor: "white",
    marginTop: 20,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});
