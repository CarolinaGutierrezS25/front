import React, { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { StyleSheet, View } from "react-native";

export default function CameraView() {
  const [type, setType] = useState(CameraType.front);
  const [permission, setPermission] = useState(false);
  const [camera, setCamera] = useState(React.createRef());

  useEffect(() => {
    const getPermissions = async () => {
      const permissions = await Camera.getCameraPermissionsAsync();
      setPermission(permissions.granted);
    };
    getPermissions();
  }, []);

  const handleFacesDetected = async ({ faces }) => {
    console.log(faces);
    // await camera.takePictureAsync({ onPictureSaved: this.onPictureSaved,quality: 0 });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {permission ? (
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
          ></Camera>
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
  },
  card: {
    borderRadius: 20,
  },
  camera: {
    flex: 1,
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
