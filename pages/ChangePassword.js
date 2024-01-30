import { View, StyleSheet, Text, KeyboardAvoidingView } from "react-native";
import { Input, Icon, Button, Dialog, makeStyles } from "@rneui/themed";
import { useState } from "react";
import { changePassword } from "../components/Settings/SettingsService";

export default function ChangePassword({ navigation }) {
  const [open, setOpen] = useState(false);
  const [prevPass, setPrevPass] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [currentPass, setCurrentPass] = useState(false);
  const styles = useStyles();

  const comparePasswords = (value) => {
    if (value === currentPass && value !== "" && currentPass !== "") {
      setCorrect(true);
    } else setCorrect(false);
  };
  const handleChangePass = () => {
    toggleOpen();
  };
  const toggleOpen = () => {
    setOpen(!open);
  };
  const toggleClose = () => {
    toggleOpen();
    navigation.goBack();
  };
  return (
    <KeyboardAvoidingView style={styles.mainView} behavior="padding">
      <View style={styles.container}>
        <Input
          placeholder="Contraseña"
          leftIcon={
            <Icon
              name="asterisk"
              type="font-awesome"
              size={24}
              iconStyle={styles.icon}
            />
          }
          inputContainerStyle={styles.inputContainer}
          labelStyle={styles.label}
          errorStyle={{ height: 0 }}
          textContentType="password"
          inputMode="text"
          autoCapitalize="none"
          secureTextEntry
          label="Contraseña Anterior"
          onChangeText={(value) => setPrevPass(value)}
        ></Input>
        <Input
          placeholder="Contraseña"
          leftIcon={
            <Icon
              name="asterisk"
              type="font-awesome"
              size={24}
              iconStyle={styles.icon}
            />
          }
          labelStyle={styles.label}
          inputContainerStyle={styles.inputContainer}
          errorStyle={{ height: 0 }}
          textContentType="newPassword"
          inputMode="text"
          autoCapitalize="none"
          secureTextEntry
          label="Nueva contraseña"
          onChangeText={(value) => setCurrentPass(value)}
        ></Input>
        <Input
          placeholder="Contraseña"
          leftIcon={
            <Icon
              name="asterisk"
              type="font-awesome"
              size={24}
              iconStyle={styles.icon}
            />
          }
          labelStyle={styles.label}
          inputContainerStyle={styles.inputContainer}
          errorStyle={{ height: 0 }}
          textContentType="newPassword"
          inputMode="text"
          autoCapitalize="none"
          secureTextEntry
          label="Confirma tu contraseña"
          onChangeText={(value) => comparePasswords(value)}
        ></Input>
        <Button
          title="Confirmar"
          disabled={!correct}
          containerStyle={styles.btn}
          type="clear"
          onPress={handleChangePass}
        />
        <Dialog
          isVisible={open}
          onBackdropPress={toggleOpen}
          overlayStyle={styles.dialog}
        >
          <Text style={styles.warning}>
            La cotraseña ha sido actualizada correctamente
          </Text>
          <Dialog.Actions>
            <Dialog.Button title="Cerrar" onPress={() => toggleClose()} />
          </Dialog.Actions>
        </Dialog>
      </View>
    </KeyboardAvoidingView>
  );
}

const useStyles = makeStyles((theme) => ({
  mainView: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 20,
  },
  container: {
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  inputContainer: {
    backgroundColor: theme.colors.grey5,
    borderBottomWidth: 0,
    borderRadius: 5,
    paddingLeft: 10,
    shadowColor: theme.colors.grey3,
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  btn: {
    padding: 0,
  },
  icon: {
    color: theme.colors.primary,
    marginLeft: 2,
    marginRight: 2,
  },
  title: {
    color: theme.colors.primary,
  },
  warning: {
    color: theme.colors.grey0,
    fontSize: 16,
  },
  dialog: {
    backgroundColor: theme.colors.white,
  },
  label: {
    color: theme.colors.grey0,
    paddingTop: 5,
  },
}));
