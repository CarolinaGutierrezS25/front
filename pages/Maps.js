import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Image } from "react-native";
import { Card, Text, useTheme, makeStyles } from "@rneui/themed";
import * as Location from "expo-location";
import { getMaps } from "../components/Maps/MapsService";

export default function Maps() {
  const [location, setLocation] = useState(null);
  const [Initiallocation, setInitialLocation] = useState(null);
  const [exampleMarkers, setExampleMarkers] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { theme } = useTheme();
  const styles = useStyles();

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
      const coords = await getMaps({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setExampleMarkers(coords);
      await getCurrentPos();
    })();
  }, []);

  if (exampleMarkers == null)
    return (
      <View>
        <Text>Obteniendo localizacion</Text>
      </View>
    );

  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: Initiallocation.coords.latitude,
            longitude: Initiallocation.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.1,
          }}
        >
          <Marker key={0} coordinate={location} pinColor="blue"></Marker>
          {exampleMarkers.map((item, index) => {
            return (
              <Marker key={index + 1} coordinate={item} title="Descripción">
                <Callout tooltip style={styles.tooltip}>
                  <Card style={styles.card}>
                    <Card.Title>Incidente</Card.Title>
                    <Card.Divider></Card.Divider>
                    <Text>
                      <Text style={styles.text}>Fecha: </Text>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </Text>
                    <Text>
                      <Text style={styles.text}>Hora: </Text>
                      {new Date(item.createdAt).toLocaleTimeString()}
                    </Text>
                    <Card.FeaturedSubtitle
                      numberOfLines={5}
                      style={{ color: theme.colors.grey1 }}
                    >
                      <Text style={styles.text}>Descripción: </Text>
                      {item.description}
                    </Card.FeaturedSubtitle>
                  </Card>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
        <View style={styles.band}>
          <Text style={styles.inner}>
            Haz click en una alerta para ver los detalles
          </Text>
        </View>
      </View>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  map: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  tooltip: {
    maxWidth: 180,
  },
  text: {
    fontWeight: "bold",
  },
  band: {
    padding: 10,
    width: "80%",
    left: "10%",
    bottom: "10%",
    // padding: 8,
    // borderRadius: 10,
    backgroundColor: theme.colors.white,
    borderRadius: 10,
  },
  inner: {
    textAlign: "center",
  },
}));
