import CameraView from "../components/Home/CameraView";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useEffect,useState } from "react";
import { Button } from "react-native";
import * as Brightness from 'expo-brightness';
import { Audio } from 'expo-av';

const LOCATION_TRACKING = "location-tracking";


export default function ButtonPressed({navigation}) {

  const startLocationTracking = async () => {
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
    let recording = new Audio.Recording();
    Brightness.setSystemBrightnessAsync(0);
    const config = async () => {
      let res = await Location.getBackgroundPermissionsAsync();
      if (res.status !== "granted") {
        console.log("Permission to access location was denied");
      } else {
        console.log("Permission to access location granted");
      }
      await startLocationTracking();
    };

    const startRecording = async() => {
      try {
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        await recording.startAsync();
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    }

    const stopRecording = async()=> {
      console.log('Stopping recording..');
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync(
        {
          allowsRecordingIOS: false,
        }
      );
    const uri = recording.getURI();
    console.log(uri);
    // const playBack = new Audio.Sound()
    // await playBack.loadAsync({uri: uri})
    // await playBack.playAsync();
      // const asset = await MediaLibrary.createAssetAsync(uri);
      // console.log('Recording stopped and stored at', uri);
    }

    config();
    startRecording();

    return function cleanup() {
      stopRecording()
      navigation.navigate("Form")
      return Location.stopLocationUpdatesAsync(LOCATION_TRACKING)
      ;
    };
  }, []);
  return (
    <>
      {/* <AudioView></AudioView> */}
      <CameraView></CameraView>
    </>
  );
}

TaskManager.defineTask(LOCATION_TRACKING,  ({ data, error }) => {
  if (error) {
    console.log("LOCATION_TRACKING task ERROR:", error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;
    //fetch goes here
    console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`)
    }
});
