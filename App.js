import { Dimensions, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let userLocation;

  const localizacao = {
    latitude: -3.12753,
    longitude: -60.02328,
  };


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setLocation(location);
    })();
  }, []);


  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    userLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 50,
      longitudeDelta: 30 
    };

    text = JSON.stringify(location);
  }


  return (
    <View style={styles.container}>
      {/* <Text style={styles.paragraph}>{text}</Text> */}
      <MapView style={styles.map} initialRegion={userLocation}>
        <Marker coordinate={localizacao} pinColor="red"/>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});