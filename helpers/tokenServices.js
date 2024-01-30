import AsyncStorage from "@react-native-async-storage/async-storage";

async function deleteTokenStorage() {
  const value = await AsyncStorage.removeItem("token");
  return value;
}
async function setTokenStorage(argvs) {
    const value = await AsyncStorage.setItem("token",JSON.stringify(argvs));
    return value;
  }

async function getTokenStorage() {
  const value = await AsyncStorage.getItem("token");
  return value;
}

export { setTokenStorage, getTokenStorage,deleteTokenStorage };