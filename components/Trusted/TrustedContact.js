import { ListItem, Icon, useTheme, Divider } from "@rneui/themed";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useContext } from "react";
import { NavigationContext } from "@react-navigation/native";

export default function TrustedContact({user}) {
  const { theme } = useTheme();

  const navigation = useContext(NavigationContext);

  const editProfile = () => {
    navigation.navigate("TrustedEdit", { name:user.name, phone: user.phone });
  };

  return (
    <TouchableOpacity onPress={editProfile}>
      <ListItem containerStyle={{ backgroundColor: theme.colors.white }}>
        <Icon name="account-circle" size={45} color={theme.colors.primary} />
        <ListItem.Content>
          <ListItem.Title style={styles.text}>{user.name}</ListItem.Title>
          <ListItem.Subtitle style={styles.tel}>{user.phone}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron name="chevron-down" type="material-community" />
      </ListItem>
      <Divider width={1} color={theme.colors.background} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    textTransform: "capitalize",
    fontFamily: "Helvetica",
    fontSize: 18,
  },
  tel: {
    fontFamily: "Helvetica",
    fontSize: 15,
    color: "grey",
  },
});
