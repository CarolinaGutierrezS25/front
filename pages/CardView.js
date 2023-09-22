import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { Icon, makeStyles } from "@rneui/themed";

export default function CardView({ route, navigation }) {
  const [content, setContent] = useState(route.params); //{fecha,content}
  const goBack = () => {
    navigation.goBack();
  };
  const styles = useStyles();
  return (
    <>
      <Icon
        name="chevron-down"
        type="font-awesome"
        size={24}
        iconStyle={styles.color}
        containerStyle={styles.chevronContainer}
        onPress={goBack}
      />
      <ScrollView style={styles.mainView}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>{content.fecha}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>{content.content}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  mainView: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  titleContainer: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,.6)",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  container: {
    backgroundColor: "rgba(255,255,255,.6)",
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
  },
  chevronContainer: {
    backgroundColor: theme.colors.background,
    paddingTop: 10,
  },
  color: {
    color: theme.colors.primary
  },
  text: {
    color: "black",
  },
}));
