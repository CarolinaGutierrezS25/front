import TrustedContact from "../components/Trusted/TrustedContact.js";
import { View, ScrollView } from "react-native";
import TrustedNew from "../components/Trusted/TrustedNew";
import { makeStyles } from "@rneui/themed";
import { useEffect, useState } from "react";
import { getContactList } from "../components/Trusted/TrustedService";

export default function Trusted() {
  const styles = useStyles();
  const [users,setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getContactList();
      setUsers(data);
    }
    fetchUsers();
  }, []);



  return (
    <View style={styles.mainView}>
      <ScrollView>
        {users.map((user) => (
          <TrustedContact key={user.phone} user={user}></TrustedContact>
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
