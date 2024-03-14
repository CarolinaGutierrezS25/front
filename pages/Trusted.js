import TrustedContact from "../components/Trusted/TrustedContact.js";
import { View, ScrollView,Text } from "react-native";
import TrustedNew from "../components/Trusted/TrustedNew";
import { makeStyles,LinearProgress,useTheme } from "@rneui/themed";
import { useTrusted } from "../components/Trusted/TrustedProvider";

export default function Trusted() {
  const styles = useStyles();
  const users = useTrusted(); 
  const { theme } = useTheme();
  
  if (users== null)
  return (
    <View style={{flex: 1, display: 'flex',justifyContent:"center",alignItems:'center',pading:15}}>
      <LinearProgress variant="indeterminate" color={theme.colors.primary}/>
      <Text style={{marginTop: 15}}>Obteniendo Contactos</Text>
    </View>
  );

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
