import { Button } from '@rneui/base';
import { View } from 'react-native';
import {useState,useEffect} from 'react'
import { Audio } from 'expo-av';
import axios from 'axios';



export default function AudioView() {
    const [recording, setRecording] = useState();
  useEffect(() => {
    startRecording()
    return async function cleanUp(){
      await recording.stopAndUnloadAsync()
    }
  }, [])
  

    const startRecording = async() => {
      try {
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.LOW_QUALITY);
        setRecording(recording);
        } catch (err) {
        console.error('Failed to start recording', err);
      }
    }
  
    const stopRecording = async () => {
      console.log('Stopping recording..');
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync(
        {
          allowsRecordingIOS: false,
        }
      );
    const uri = recording.getURI();
    // const playBack = new Audio.Sound()
    // await playBack.loadAsync({uri: uri})
    // await playBack.playAsync();
      // const asset = await MediaLibrary.createAssetAsync(uri);
      // console.log('Recording stopped and stored at', uri);
    }
    const playSound = async() => {
      const playBack = new Audio.Sound()
      await playBack.loadAsync({uri: recording.getURI()})
      await playBack.playAsync();
    }

    const respon = () => {
      axios.post('http://3.141.71.89:3000/user/login', {
        email: 'alanjgm@gmail.com',
        password: '12345'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
    return (

    <View>
    </View>
    )
    
}