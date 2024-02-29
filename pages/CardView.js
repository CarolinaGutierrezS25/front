import { View, Text, StyleSheet, ScrollView,ActivityIndicator } from "react-native";
import { useState } from "react";
import { Icon, makeStyles,Image } from "@rneui/themed";

export default function CardView({ route, navigation }) {
  const [content, setContent] = useState(route.params); //{fecha,content}

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  }
  const goBack = () => {
    navigation.goBack();
  };
  function getPhotoList(photos){
    return photos.map((photo,idx) => {
      return <Image containerStyle={styles.img} id={idx+""} source={{uri: photo}} PlaceholderContent={<ActivityIndicator/>}></Image>;
    });
  }
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
          <Text style={styles.titleText}>{formatDate(content.createdAt)}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}><Text style={styles.titleText}>Latitud: </Text>{content.initial_latitude}</Text>
          <Text style={styles.text}><Text style={styles.titleText}>Longitud: </Text>{content.initial_longitude}</Text>
          <Text style={styles.text}><Text style={styles.titleText}>Fecha: </Text>{new Date(content.createdAt).toString()}</Text>
          {content.audio_file? <><Text style={styles.titleText}>Link Audio:</Text><Text style={styles.text}>{content.audioUrl}</Text></>:null}
          {content.photos_folder? <Text style={styles.titleText}>Links Fotos:</Text>:null}{content.photos_folder? getPhotoList(content.photosUrls):null}
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
    color: "rgb(70,70,70)",
  },
  titleText:{
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  img:{
      aspectRatio: 1,
      width: '50%',
      flex: 1,
  }
}));
