import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function MeteoScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [actualWeather, setActualWeather] = useState(null);
  const [weatherOfTheWeek, setWeatherOfTheWeek] = useState(null);
  const API_key = "06866d93dfd89a0196449190e5751425";
  ////////////////////////Localisation//////////////////////////////////////////////////////////
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting for location...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }
  //////////////////////////////////Meteo/////////////////////////////////////////////////////
  useEffect(() => {
    (async () => {
      if (location !== null) {
        getWeather(location.coords.latitude, location.coords.longitude);
        //getWeatherOfTheWeek(location.coords.latitude, location.coords.longitude);
      }
    })();
  }, [location]);

  const getWeather = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`);
      if (!response) throw new Error('Erreur dans la réponse de l\'API');
      const data = await response.json();
      if (data && data.name) {
        setActualWeather(data);
      } else {
        console.log('Données météo invalides :', data);
      }
    } catch (e) {
      console.log('Erreur API météo:', e);
    }
  };

  // const getWeatherOfTheWeek = async (latitude, longitude) => {
  //   try {
  //     const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_key}`);
  //     const data = await response.json();
  //     if (data) {
  //       setWeatherOfTheWeek(data);
  //     } else {
  //       console.log('Données météo de la semaine invalides :', data);
  //     }
  //   } catch (e) {
  //     console.log('Erreur API météo de la semaine:', e);
  //   }
  // };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Meteo</Text>
        <Text>{text}</Text>
        <Button color="red" title="Refresh" onPress={() => Location.getCurrentPositionAsync({})} />
      </View>

      <View>
        <Text>{{actualWeather}}</Text>
        {/* <Text >Ville: {actualWeather.name}</Text> */}
        {/* {date && <Text style={styles.tempText}>Date: {date}</Text>} */}
        {/* <Text >Température: {(actualWeather.main.temp - 273.15).toFixed(2)}°C</Text> */}
        {/* <Text >Description: {actualWeather.weather[0].description}</Text> */}
        
        {/* <Image
          source={{ uri: `http://openweathermap.org/img/wn/${actualWeather.weather[0].icon}.png` }}
        //style={styles.icon}
        /> */}
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
