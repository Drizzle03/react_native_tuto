import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'

const { width: SCREEN_WIDTH} = Dimensions.get("window");

export default function App() {

  const [location, setLocation] = useState(null);
  const [ok, setOk] = useState(true);

  const ask = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if (!granted){
      setOk(false);
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5});
    const location = 
    await Location.reverseGeocodeAsync(
      {latitude, longitude},
      {useGoogleMaps:false})
    console.log(location);
    console.log(latitude, longitude);
  }

  useEffect(()=>{
    ask();
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView 
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "yellow",
  },

  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  cityName: {
    fontSize:68,
    fontWeight:"500"
  },

  weather: {
  },

  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },

  description:{
    marginTop: -30,
    fontSize: 60,
  },

  temp: {
    marginTop: 50,
    fontSize: 178,
  },
});