import { Audio } from "expo-av";


async function startRecording(recording) {
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
    console.error("Failed to start recording", err);
  }
}

async function stopRecording(recording) {
  console.log("Stopping recording..");
  console.log("recording", recording);
  await recording.stopAndUnloadAsync();
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
  });
  return recording.getURI();
}


export { startRecording, stopRecording };
