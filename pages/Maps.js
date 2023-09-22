import React, { useState, useEffect } from "react";
import MapView, { Marker,Callout } from "react-native-maps";
import { StyleSheet, View,Image} from "react-native";
import {Card,Text,useTheme} from '@rneui/themed';
import * as Location from "expo-location";

export default function Maps() {
  const [location, setLocation] = useState(null);
  const [Initiallocation, setInitialLocation] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);
  const {theme} = useTheme();

  async function getCurrentPos() {
    let location1 = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 10000,
      },
      (newLocation) => {
        let { coords } = newLocation;
        let latitude = coords.latitude;
        let longitude = coords.longitude;
        setLocation({ latitude, longitude });
      },
      (error) => console.log(error)
    );
    return location1;
  }

  useEffect(() => {

    (async () => {
      let { status: foregroundStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      setInitialLocation(location);
      getCurrentPos();
    })()
    
    ;
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = console.log(JSON.stringify(location));
  }
  const exampleMarkers = [
    {
      id: "0294870b-b981-473f-b8cb-82000872842d",
      latitude: 20.699736,
      longitude: -103.33622,
      createdAt: "2023-09-01T03:03:22.000Z",
      description: "null",
      finished: false,
    },
    {
      id: "0294870b-b981-473f-b8cb-82000872842d",
      latitude: 20.76736,
      longitude: -103.33622,
      createdAt: "2023-09-01T03:03:22.000Z",
      description: "null",
      finished: false,
    },
    {
      id: "0294870b-b981-473f-b8cb-82000872842d",
      latitude: 20.76736,
      longitude: -103.38622,
      createdAt: "2023-09-01T03:03:22.000Z",
      description: "Irure commodo consectetur eiusmod id mollit fugiat occaecat id proident irure adipisicing. Adipisicing pariatur est cupidatat ullamco aute anim adipisicing ullamco sint laboris esse tempor nulla. Do id aute sint adipisicing pariatur officia adipisicing excepteur consectetur qui sunt. Veniam id dolor amet laboris mollit est consequat.",
      finished: false,
    },
  ];

  if(!Initiallocation) return (<View><Text>Obteniendo localizacion</Text></View>)

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude:Initiallocation.coords.latitude,
          longitude: Initiallocation.coords.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.1,
        }}
      >
        <Marker key={0} coordinate={location} pinColor="blue">
        </Marker>
        {exampleMarkers.map((item, index) => {
          return <Marker key={index+1} coordinate={item} title="Descripción" >
            <Callout tooltip style={styles.tooltip}>
            <Card>
              <Card.Title>Incidente</Card.Title>
              <Card.Divider></Card.Divider>
              <Text><Text style={styles.text}>Fecha: </Text>{new Date(item.createdAt).toLocaleDateString()}</Text>
              <Text><Text style={styles.text}>Hora: </Text>{new Date(item.createdAt).toLocaleTimeString()}</Text>
              <Card.FeaturedSubtitle numberOfLines={5} style={{ color: theme.colors.grey1 }}><Text style={styles.text}>Descripción: </Text>{item.description}</Card.FeaturedSubtitle>
            </Card>
            </Callout>
          </Marker>
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  tooltip:{
    maxWidth:180,
  },
  text:{
    fontWeight: 'bold'
  }
});
