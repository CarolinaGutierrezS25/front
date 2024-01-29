import TrustedContact from "../components/Trusted/TrustedContact.js";
import { View, ScrollView } from "react-native";
import TrustedNew from "../components/Trusted/TrustedNew";
import { makeStyles } from "@rneui/themed";
import { useTrusted } from "../components/Trusted/TrustedProvider";
import { useEffect } from "react";

export default function Trusted() {
  const users = useTrusted();
  const styles = useStyles();

  useEffect(() => {
    console.log(users);
  }, []);

  return (
    <View style={styles.mainView}>
      <ScrollView>
        {users.map((user) => (
          <TrustedContact key={user.id} user={user}></TrustedContact>
        ))}
        <TrustedNew></TrustedNew>
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  mainView: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 1,
  },
}));
