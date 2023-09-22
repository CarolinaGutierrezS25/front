import TrustedContact from "../components/Trusted/TrustedContact.js";
import { View, ScrollView } from "react-native";
import TrustedNew from "../components/Trusted/TrustedNew";
import { makeStyles } from "@rneui/themed";
import {useTrusted} from '../components/Trusted/TrustedProvider';

export default function Trusted() {
  const users = useTrusted();
  const styles = useStyles();

  return (
      <View style={styles.mainView}>
        <ScrollView>
          {users.map((user) => {
            return <TrustedContact name={user.name} tel={user.tel} id={user.id} image={user.image} key={user.id}></TrustedContact>;
          })}
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
