import React, { useState, useEffect,useRef,useContext } from "react";
import { Camera, CameraType } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { StyleSheet, View,Button } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { TouchableOpacity } from "react-native";
import { NavigationContext } from "@react-navigation/native";

export default function CameraView() {
  const [type, setType] = useState(CameraType.front);
  const [permission, setPermission] = useState(false);
  const [face,setFace] = useState(null);
  const camRef = useRef();
  const navigation = useContext(NavigationContext)

  useEffect(() => {
    const getPermissions = async () => {
      const permissions = await Camera.getCameraPermissionsAsync();
      setPermission(permissions.granted);
      
    };
    getPermissions();
  }, []);

  const handleFacesDetected = async ({faces}) => {
    console.log(faces);
    if(faces){
      if(faces[0]?.faceID){
        if(faces[0].faceID != face) {await takePhoto();setFace(faces[0].faceID)}
      }
    }
  };

  const takePhoto = async () => {
    let options = {
      quality: 0,
      base64: true,
      exif: false,
      skipProcessing:true
    }
    const data = await camRef.current.takePictureAsync(options);
    const asset = await MediaLibrary.createAssetAsync(data.uri);
    const source = asset.uri;
    if (source) {
      console.log("picture source", source);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {permission ? (
          <TouchableOpacity style={{flex:1,backgroundColor:'black'}} onLongPress={(e)=> navigation.goBack()}>
          <Camera
            onFacesDetected={handleFacesDetected}
            style={styles.camera}
            type={type}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.accurate,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
              minDetectionInterval: 1000,
              tracking: true,
            }}
            ref={camRef}
          ></Camera>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: 'black'
  },
  card: {
    borderRadius: 20,
    flex: 1
  },
  camera: {
    flex: 1,
    position: 'absolute'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
