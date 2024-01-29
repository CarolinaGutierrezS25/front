import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Input, Icon, Button, Avatar } from "@rneui/themed";
import { NavigationContext } from "@react-navigation/native";
import { useContext, useState } from "react";
import { getAllPermissionsStatus } from "../../pages/Permissions";
import colors from "../assets/colors";
import font from "../assets/fonts";
import { login } from "../Login/LoginService";

export default function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useContext(NavigationContext);
  const handleView = (view) => {
    navigation.navigate(view);
  };

  async function itHasPermissions() {
    const permissions = await getAllPermissionsStatus();
    if (permissions) navigation.navigate("MainScreen");
    else navigation.navigate("Permissions");
  }

  async function loginGood() {
    try {
      // const ServerResponse = await login({ email: correo, password: password });
      itHasPermissions();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.mainView}>
      <View style={styles.form}>
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
            size={150}
          />
        </View>
        <View>
          <Input
            placeholder="Correo"
            leftIcon={
              <Icon
                name="envelope"
                type="font-awesome"
                size={24}
                color={colors.primary}
              />
            }
            inputContainerStyle={{ borderBottomWidth: 0 }}
            errorStyle={{ height: 0 }}
            labelStyle={{ height: 0 }}
            containerStyle={styles.inputContainer}
            textContentType="emailAddress"
            inputMode="email"
            autoCapitalize="none"
            onChangeText={(value) => setCorreo(value)}
          ></Input>
          <Input
            placeholder="Contraseña"
            leftIcon={
              <Icon
                name="asterisk"
                type="font-awesome"
                size={24}
                color={colors.primary}
              />
            }
            inputContainerStyle={{ borderBottomWidth: 0 }}
            errorStyle={{ height: 0 }}
            labelStyle={{ height: 0 }}
            containerStyle={styles.inputContainer}
            textContentType="password"
            secureTextEntry
            onChangeText={(value) => setPassword(value)}
          ></Input>
        </View>
        <View>
          <TouchableOpacity onPress={(e) => handleView("ForgotPassword")}>
            <Text style={styles.forgotPass}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Button
            buttonStyle={styles.primaryButton}
            onPress={async (e) => await loginGood()}
          >
            Iniciar Sesion
          </Button>
        </View>
      </View>
      <View style={styles.textContainer}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={(e) => handleView("Register")}
        >
          <Text style={styles.slogan}>¿Nuevo en la app? </Text>
          <Text style={styles.registerText}>Registrate.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.primary,
    padding: 20,
  },
  secondaryButton: {
    backgroundColor: "white",
    marginTop: 3,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  primaryButton: {
    borderStyle: "solid",
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderRadius: 8,
    marginTop: 10,
  },

  form: {
    backgroundColor: "black",
    padding: 30,
    borderRadius: 10,
    backgroundColor: colors.blured,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  mailText: {
    textTransform: "capitalize",
  },
  inputContainer: {
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 8,
  },
  forgotPass: {
    textAlign: "right",
    fontWeight: "300",
    fontFamily: font.primary,
  },
  textContainer: {
    backgroundColor: colors.blured,
    padding: 20,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  registerText: {
    fontWeight: "700",
    fontFamily: font.primary,
  },
  slogan: {
    fontFamily: font.primary,
  },
});
