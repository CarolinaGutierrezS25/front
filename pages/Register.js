import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { NavigationContext } from "@react-navigation/native";
import colors from "../components/assets/colors";
import { Input, Icon, Button, Avatar, Dialog } from "@rneui/themed";
import { addUser } from "../components/Login/RegistrerService";

export default class Register extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      visible: false,
      birthday: "1998-12-12",
      title: "Registro exitoso 🎉",
      message: 'Te haz regristrado correctamente, ahora puedes iniciar sesión.'
    };
        //firstname,lastname,phone,Usuario,Contraseña,Confirma tu contraseña

  }

  render() {
    const cancelView = () => {
      const navigation_ = this.context;
      navigation_.goBack();
    };
    const submit = () => {
      const navigation_ = this.context;
      navigation_.goBack();
    };
    const toggleDialog = async () => {
      const navigation_ = this.context;
      try{
        const data = await addUser(this.state);
        console.log(data);
      }catch(error){
        console.log(error);
        this.setState({ title: "Error al registrarse", message: 'Algo salio mal, intentalo de nuevo.' })
      }
      this.setState({ visible: !this.state.visible });
      setTimeout(() => {
        this.setState({ visible: !this.state.visible })
        navigation_.goBack();
      }, 3000);
    };

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View style={styles.mainView}>
            <View style={styles.card}>
              <View style={styles.avatarContainer}>
                <Avatar
                  rounded
                  icon={{ name: "home-account" }}
                  size={150}
                  containerStyle={styles.avatar}
                />
              </View>
              <Input
                 onChangeText={value => this.setState({ firstname: value })}
                placeholder="Nombre"
                leftIcon={
                  <Icon
                    name="user"
                    type="font-awesome"
                    size={24}
                    color={colors.primary}
                  />
                }
                inputContainerStyle={{ borderBottomWidth: 0 }}
                errorStyle={{ height: 0 }}
                labelStyle={{ height: 0 }}
                containerStyle={styles.inputContainer}
                textContentType="givenName"
                inputMode="text"
              ></Input>
              <Input
                 onChangeText={value => this.setState({ lastname: value })}
                placeholder="Apellido"
                leftIcon={
                  <Icon
                    name="user"
                    type="font-awesome"
                    size={24}
                    color={colors.primary}
                  />
                }
                inputContainerStyle={{ borderBottomWidth: 0 }}
                errorStyle={{ height: 0 }}
                labelStyle={{ height: 0 }}
                containerStyle={styles.inputContainer}
                textContentType="familyName"
                inputMode="text"
              ></Input>
              <Input
                 onChangeText={value => this.setState({ phone: value })}
                placeholder="Telefono"
                leftIcon={
                  <Icon
                    name="phone"
                    type="font-awesome"
                    size={24}
                    color={colors.primary}
                  />
                }
                inputContainerStyle={{ borderBottomWidth: 0 }}
                errorStyle={{ height: 0 }}
                labelStyle={{ height: 0 }}
                containerStyle={styles.inputContainer}
                textContentType="telephoneNumber"
                inputMode="numeric"
              ></Input>
              <Input
                 onChangeText={value => this.setState({ email: value })}
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
              ></Input>
              <Input
                 onChangeText={value => this.setState({ password: value })}
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
                textContentType="newPassword"
                inputMode="text"
                autoCapitalize="none"
                secureTextEntry
              ></Input>
              <Input
                onChangeText={value => this.setState({ confirmPassword: value })}
                placeholder="Confirmar contraseña"
                leftIcon={
                  <Icon
                    name="asterisk"
                    type="font-awesome"
                    size={24}
                    color={colors.primary}
                  />
                }
                renderErrorMessage={this.state.confirmPassword}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                containerStyle={styles.inputContainer}
                textContentType="newPassword"
                inputMode="text"
                autoCapitalize="none"
                secureTextEntry
              ></Input>
              <Button buttonStyle={styles.primaryButton} onPress={toggleDialog} disabled={!( !!this.state.firstname  && !!this.state.lastname  && !!this.state.phone  && !!this.state.email  && !!this.state.password  && !!this.state.confirmPassword )}>
                Registrar
              </Button>
              <Button
                buttonStyle={styles.secondaryButton}
                titleStyle={{ color: colors.primary }}
                onPress={cancelView}
              >
                Cancelar
              </Button>
            </View>
          </View>
        </ScrollView>
        <Dialog isVisible={this.state.visible}>
          <Dialog.Title title={this.state.title}></Dialog.Title>
          <Text>{this.state.message}</Text>
        </Dialog>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  mainView: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: colors.blured,
    padding: 20,
    borderRadius: 10,
  },
  inputContainer: {
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: colors.primary,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  primaryButton: {
    borderStyle: "solid",
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  secondaryButton: {
    backgroundColor: "white",
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginTop: 5,
  },
});
