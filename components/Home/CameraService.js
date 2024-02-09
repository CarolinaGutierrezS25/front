import * as MediaLibrary from "expo-media-library";


const takePhoto = async (camRef) => {
    let options = {
      quality: 0,
      base64: true,
      exif: false,
      skipProcessing: true,
    };
    const data = await camRef.current.takePictureAsync(options);
    const asset = await MediaLibrary.createAssetAsync(data.uri);
    const source = asset.uri;
    if (source) {
      console.log("picture source", source);
    }
  };
