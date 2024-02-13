import React, { useState, useEffect, useRef, useContext } from "react";
import { Camera, CameraType } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { StyleSheet, View, Button, TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { NavigationContext } from "@react-navigation/native";
import { Audio } from "expo-av";
import * as Brightness from "expo-brightness";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import {incidentInit,incidentEnd,updateLocation} from './ButtonService';

const LOCATION_TRACKING = "location-tracking";

let incidentId = null;

export default function CameraView() {
  const [incident, setIncident] = useState();
  const [recording, setRecording] = useState();
  const [photos, setPhotos] = useState([]);
  const [type, setType] = useState(CameraType.front);
  const [permission, setPermission] = useState(false);
  const [face, setFace] = useState(null);
  const camRef = useRef();
  const navigation = useContext(NavigationContext);
  //general functions
  function appendPhoto(uri) {
    setPhotos([...photos, uri]);
  }

  async function fetchIncidentResults(uriRecording, uriPhotos) {
    const Form = new FormData();
    Form.append("audio", {
      uri: uriRecording,
      type: "audio/x-wav",
      name: "audio.wav",
    });

     uriPhotos.map((uri, idx) => {
      Form.append(`photos`, {
        uri: uri,
        type: "image/jpg",
        name: `photo${idx}.jpg`,
      });
    });
    
    Form.append("incidentId", incidentId);
    try{
      const message = await incidentEnd(Form);
      console.log(message);
    }catch(error){console.log(error.ToJSON())}
  }

  //Permissions
  const getCamPermissions = async () => {
    const permissions = await Camera.getCameraPermissionsAsync();
    setPermission(permissions.granted);
  };
  const getBackPermissions = async () => {
    let res = await Location.getBackgroundPermissionsAsync();
    if (res.status !== "granted") {
      console.log("Permission to access location was denied");
    } else {
      await startLocationTracking();
      console.log("Permission to access location granted");
    }
  };
  //Camera Functions
  const handleFacesDetected = async ({ faces }) => {
    if (faces) {
      if (faces[0]?.faceID) {
        if (faces[0].faceID != face) {
          let pic = await takePhoto();
          appendPhoto(pic);
          console.log("photos", photos);
          setFace(faces[0].faceID);
        }
      }
    }
  };
  const takePhoto = async () => {
    let options = {
      quality: 0.1,
      base64: true,
      exif: false,
      skipProcessing: false,
    };
    const data = await camRef.current.takePictureAsync(options);
    const asset = await MediaLibrary.createAssetAsync(data.uri);
    const source = asset.uri;
    if (source) {
      console.log("picture source", source);
    }
    return data.uri;
  };

  //location Functions
  const startLocationTracking = async () => {
    const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Low});
    console.log("location", location);
    const res = await incidentInit({latitude: location.coords.latitude, longitude: location.coords.longitude})
    incidentId = res;
    console.log("incident", incidentId);

    // console.log("incident", incident);
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.High,
      distanceInterval: 1,
      deferredUpdatesInterval: 2000,
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );
  };

  useEffect(() => {
    //initializing recording
    incidentId = null;
    async function initAllMetrics() {
      // asking for permissions
      await getCamPermissions();
      await getBackPermissions();

      //setting brightness to 0
      await Brightness.setSystemBrightnessAsync(0);
      // starting recording
      await startRecording();
    }
    initAllMetrics();
  }, []);

  async function cleanup() {
    await Brightness.setSystemBrightnessAsync(1);
    const uri = await stopRecording();
    await Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
    await fetchIncidentResults(uri, photos);
  }

  //audio Functions

  async function startRecording() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    return uri;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: "black" }}
        onLongPress={(e) => {
          cleanup().then(navigation.navigate("Form"));
        }}
      >
        <View style={styles.card}>
          {permission ? (
            <Camera
              onFacesDetected={handleFacesDetected}
              style={styles.camera}
              type={type}
              faceDetectorSettings={{
                mode: FaceDetector.FaceDetectorMode.accurate,
                detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                runClassifications:
                  FaceDetector.FaceDetectorClassifications.none,
                minDetectionInterval: 1000,
                tracking: true,
              }}
              ref={camRef}
            ></Camera>
          ) : (
            <View></View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "black",
  },
  card: {
    borderRadius: 20,
    flex: 1,
  },
  camera: {
    flex: 1,
    position: "absolute",
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

TaskManager.defineTask(LOCATION_TRACKING, ({ data, error }) => {
  if (error) {
    console.log("LOCATION_TRACKING task ERROR:", error);
    return;
  }
  if (data && incidentId) {
    const { locations } = data;
    let latitude = locations[0].coords.latitude;
    let longitude = locations[0].coords.longitude;
    console.log('location',latitude,longitude);
    
    updateLocation({ latitude: latitude, longitude: longitude, incidentId}).then((res) => {
      console.log(res);
    });
    // fetch goes here
  }
});
