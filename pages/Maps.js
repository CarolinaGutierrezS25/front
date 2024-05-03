import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout,Circle } from "react-native-maps";
import { StyleSheet, View, Image } from "react-native";
import { Card, Text, useTheme, makeStyles,LinearProgress } from "@rneui/themed";
import * as Location from "expo-location";
// import { getMaps } from "../components/Maps/MapsService";
import {useMaps} from '../components/Maps/MapsProvider';

export default function Maps() {
  // const Maps = [{
  //   initial_latitude: 20.742973,
  //   initial_longitude: -103.350233,
  //   riskLevel: 0,
  // },{
  //   initial_latitude: 20.735973,
  //   initial_longitude: -103.350233,
  //   riskLevel: 1,
  // },{
  //   initial_latitude: 20.746973,
  //   initial_longitude: -103.340233,
  //   riskLevel: 2,
  // }];
  // const Initiallocation = {
  //   coords: {
  //     latitude: 20.746973,
  //     longitude: -103.350233,
  //   },
  // };
  const circleColors = ['rgba(162, 211, 162,.4)', 'rgba(245, 232, 32,.4)', 'rgba(245, 11, 9,.4)'];
  const pinColors = ['green', 'yellow', 'red'];
  const [location, setLocation] = useState(null);
  const [Initiallocation, setInitialLocation] = useState(null);
  // const [exampleMarkers, setExampleMarkers] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const {Maps,fetchMaps} = useMaps();
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
      await fetchMaps({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      await getCurrentPos();
    })();
  }, []);

  if (Maps == null || Initiallocation == null)
    return (
      <View style={{flex: 1, display: 'flex',justifyContent:"center",alignItems:'center',pading:15}}>
        <LinearProgress variant="indeterminate" color={theme.colors.primary}/>
        <Text style={{marginTop: 15}}>Obteniendo localizacion</Text>
      </View>
    );

  return (
    <>
      <View style={styles.container}>
      <View style={styles.danger}>
        <Text style={{alignSelf:'center',fontWeight:'600'}}>
          Niveles de peligro 
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}} >
          <View style={{flexDirection: 'row', alignItems: 'center',paddingTop:9}}>
            <View style={{width: 20, height: 20, backgroundColor: circleColors[0], borderRadius: 10}}></View>
            <Text> Bajo</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center',paddingTop:9}}>
            <View style={{width: 20, height: 20, backgroundColor: circleColors[1], borderRadius: 10}}></View>
            <Text> Medio</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center',paddingTop:9}}>
            <View style={{width: 20, height: 20, backgroundColor: circleColors[2], borderRadius: 10}}></View>
            <Text> Alto</Text>
          </View>
      </View>
      </View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: Initiallocation.coords.latitude,
            longitude: Initiallocation.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.1,
          }}
        >
          <Marker key={0} coordinate={location} pinColor="blue">
            <Callout tooltip style={styles.tooltip}>
              <Card style={styles.card}>
                <Card.Title>Ubicación Actual</Card.Title>
                <Card.Divider></Card.Divider>
                <Text>
                  <Text style={styles.text}>Latitud: </Text>
                  {location.latitude}
                </Text>
                <Text>
                  <Text style={styles.text}>Longitud: </Text>
                  {location.longitude}
                </Text>
              </Card>
            </Callout>
          </Marker>
          {Maps.map((item, index) => {
            return (
              <>
              <Marker 
              key={index + 1} 
              coordinate={{ latitude: item.initial_latitude, longitude: item.initial_longitude}}
              title="Descripción"
              pinColor={pinColors[item.riskLevel]}
              >
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
              <Circle key={index + Maps.length + 1 } center={{ latitude: item.initial_latitude, longitude: item.initial_longitude}} radius={500} strokeColor={circleColors[item.riskLevel]} fillColor={circleColors[item.riskLevel]}/>
              </>
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
    zIndex: 2,
  },
  text: {
    fontWeight: "bold",
  },
  band: {
    padding: 10,
    width: "90%",
    left: "5%",
    bottom: "10%",
    // padding: 8,
    // borderRadius: 10,
    backgroundColor: theme.colors.white,
    borderRadius: 10,
  },
  inner: {
    textAlign: "center",
  },
  danger: {
    zIndex: 1,
    position: "absolute", 
    width: "90%",
    left: "5%",
    top: 15,
    padding: 10,
    backgroundColor: theme.colors.white,
    borderRadius: 10,
  },
}));
