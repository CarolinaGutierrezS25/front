import { View, KeyboardAvoidingView, Text } from "react-native";
import { useState, useEffect } from "react";
import { Input, Icon, Button, Avatar, makeStyles, Dialog } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { useTrustedDispatch } from "../components/Trusted/TrustedProvider";

export default function TrustedEdit({ navigation, route }) {
  const dispatch = useTrustedDispatch();
  const styles = useStyles();

  const [user, setUser] = useState(route.params);
  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(false);
  const [isEdditedUser, setIsEdditedUser] = useState(false);

  useEffect(() => {
    if (route.params?.id) setIsEdditedUser(true);
  }, []);

  const togglePress = () => {
    if (isEdditedUser) {
      if (!edit) setEdit(true);
      else {
        dispatch({ type: "MOD", payload: user });
        setDialogMessage("Contacto modificado con éxito");
        setDialog(true);
      }
    } else {
      if (user) {
        dispatch({ type: "ADD", payload: { ...user, id: user.tel } });
        setDialogMessage("Contacto añadido con éxito");
        setDialog(true);
      }
    }
  };
  const handleDeleteDialog = () => {
    setDeleting(true);
    setDialogMessage("¿Estas seguro de querer eliminar el contacto?");
    setDialog(true);
  };
  const handleDelete = () => {
    dispatch({ type: "DEL", payload: user.id });
    navigation.goBack();
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setUser((user) => ({ ...user, ...{ image: image } }));
    }
  };
  const cancel = () => {
    navigation.goBack();
  };

  return (
    <>
      <Icon
        name="chevron-down"
        type="font-awesome"
        size={24}
        containerStyle={styles.chevronContainer}
        iconStyle={styles.chevronIcon}
      />
      <Text style={styles.upperText}>Deslice hacia abajo para regresar</Text>
      <View style={styles.mainView}>
        <KeyboardAvoidingView style={styles.form} behavior="padding">
          <View style={{ paddingHorizontal: 30,paddingBottom: 30}}>
            <Icon
              name="account-circle"
              size={180}
              containerStyle={styles.avatarContainer}
              iconStyle={styles.avatar}
            ></Icon>
            <View>
              <Input
                placeholder="Nombre"
                leftIcon={
                  <Icon
                    name="user"
                    type="font-awesome"
                    size={24}
                    iconStyle={styles.inputIcon}
                  />
                }
                inputContainerStyle={{ borderBottomWidth: 0 }}
                errorStyle={{ height: 0 }}
                labelStyle={{ height: 0 }}
                containerStyle={styles.inputContainer}
                textContentType="name"
                defaultValue={user.name}
                autoCapitalize="sentences"
                disabled={!edit && isEdditedUser}
                onChangeText={(value) =>
                  setUser((user) => ({ ...user, ...{ name: value } }))
                }
              ></Input>
              <Input
                placeholder="Telefono"
                leftIcon={
                  <Icon
                    name="phone"
                    type="font-awesome"
                    size={24}
                    iconStyle={styles.inputIcon}
                  />
                }
                inputContainerStyle={{ borderBottomWidth: 0 }}
                errorStyle={{ height: 0 }}
                labelStyle={{ height: 0 }}
                containerStyle={styles.inputContainer}
                textContentType="telephoneNumber"
                defaultValue={user.tel}
                inputMode="decimal"
                disabled={!edit && isEdditedUser}
                onChangeText={(value) =>
                  setUser((user) => ({ ...user, ...{ tel: value } }))
                }
              ></Input>
            </View>
            <View>
              <Button buttonStyle={styles.primaryButton} onPress={togglePress}>
                {isEdditedUser ? (edit ? "Guardar" : "Editar") : "Añadir"}
              </Button>
              {edit && (
                <Button
                  buttonStyle={styles.secondaryButton}
                  titleStyle={styles.secondaryText}
                  onPress={handleDeleteDialog}
                  type="outline"
                  title="Eliminar"
                  color="error"
                />
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      <Dialog
        isVisible={dialog}
        onBackdropPress={(e) => {
          navigation.goBack();
        }}
        overlayStyle={styles.dialog}
      >
        <Text style={styles.message}>{dialogMessage}</Text>
        <Dialog.Actions>
          {deleting && (
            <Dialog.Button title="Eliminar" onPress={handleDelete} />
          )}
          <Dialog.Button
            title="Cancelar"
            onPress={(e) => navigation.goBack()}
          />
        </Dialog.Actions>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  upperText: {
    textAlign: "center",
    paddingTop: 5,
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
  },

  chevronContainer: {
    backgroundColor: theme.colors.white,
  },
  chevronIcon: {
    color: theme.colors.primary,
  },
  mainView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    padding: 20,
  },
  avatarContainer: {
    alignSelf: "center",
    marginBottom: 15,
    marginTop: 15
  },
  avatarAccessory: {
    backgroundColor: theme.colors.primary,
  },
  secondaryButton: {
    marginTop: 5,
    borderRadius: 8,
    borderColor: theme.colors.error,
    borderWidth: 0.5,
  },
  secondaryText: {
    color: theme.colors.error,
  },
  primaryButton: {
    borderColor: theme.colors.primary,
    borderRadius: 8,
    marginTop: 10,
  },
  form: {
    borderRadius: 10,
    backgroundColor: theme.colors.background,
  },
  inputContainer: {
    backgroundColor: theme.colors.white,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 10,
  },
  inputIcon: {
    color: theme.colors.primary,
  },
  message: {
    color: theme.colors.grey0,
    fontSize: 16,
  },
  dialog: {
    backgroundColor: theme.colors.white,
  },
  avatar: {
    color: theme.colors.primary,
  },
}));
