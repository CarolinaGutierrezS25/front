import SettingsItem from "../components/Settings/SettingsItem";
import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Dialog, makeStyles } from "@rneui/themed";
import { logout } from "../components/Login/LoginService";
import { useAuth } from "../helpers/AuthProvider";

export default function Account({ navigation }) {
  const [open, SetOpen] = useState(false);
  const styles = useStyles();
  const { authContext } = useAuth();

  const toggleOpen = () => {
    SetOpen(!open);
  };
  async function closeSesion() {
    toggleOpen();
    try {
      setTimeout(() => {
        authContext.signOut();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.mainView}>
      <SettingsItem
        type="Cambiar contraseña"
        icon="lock"
        view="ChangePassword"
      />
      <SettingsItem type="Cerrar sesión" icon="logout" view={toggleOpen} />
      <View style={styles.deleteF}>
        <SettingsItem
          type="Eliminar Cuenta"
          icon="delete-forever"
          view="DeleteAccount"
        />
      </View>
      <Dialog
        isVisible={open}
        onBackdropPress={toggleOpen}
        overlayStyle={styles.dialog}
      >
        <Dialog.Title title="Cerrar sesión" titleStyle={styles.title} />
        <Text style={styles.warning}>
          ¿Estas seguro de querer cerrar sesión?
        </Text>
        <Dialog.Actions>
          <Dialog.Button
            titleStyle={styles.closeSession}
            title="Cerrar Sesión"
            onPress={async () => await closeSesion()}
          />
          <Dialog.Button title="Regresar" onPress={() => toggleOpen()} />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  mainView: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: theme.colors.background,
  },
  deleteF: {
    paddingTop: 30,
  },
  closeSession: {
    color: theme.colors.error,
  },
  title: {
    color: theme.colors.black,
  },
  warning: {
    color: theme.colors.grey0,
  },
  dialog: {
    backgroundColor: theme.colors.white,
  },
}));
