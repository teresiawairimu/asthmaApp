import { View, Text, StyleSheet, Image} from "react-native";
import React, { useEffect, useState} from "react";
import { retrieveWeather } from "../../services/weatherServices";
import { useAuth } from "../../context/AuthContext";


const CurrentWeatherDisplay = () => {

  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWeather = async () => {
      if (!user) return;
      try {
        setIsLoading(true);
        setError(null);
        const idToken = await user.getIdToken();
        const weatherData = await retrieveWeather(idToken);
        console.log("weather data", weatherData);
        setWeatherData(weatherData);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setError("Failed to retrieve weather data. Please try again later");
      } finally {
        setIsLoading(false);
      }  
    }
    fetchWeather();
  }, [user]);

  if (isLoading) return <Text style={styles.loadingStyle}>Loading...</Text>;
  if (error) return <Text style={styles.errorStyle}>{error}</Text>
  return (
    <View style={styles.weatherContainer} >
      <View style={styles.titleContainer}>
        <Text style={styles.weatherTitle}>{weatherData.location?.name}'s Weather</Text>
        <Image source={{ uri: `https:${weatherData.current?.condition.icon}` }} style={styles.image} />
      </View>
      <View style={styles.weatherItemsContainer}>
        <Text style={styles.temp}>{weatherData.current?.temp_f}°F</Text>
        <Text style={styles.weatherItems}>Air Quality Index: {weatherData.current?.air_quality?.["us-epa-index"]}</Text>
      </View>
      <Text style={styles.weatherItems}>Feels Like: {weatherData.current?.feelslike_f}°F</Text>
    </View>    
  );
}

export default CurrentWeatherDisplay;


const styles = StyleSheet.create({
  weatherContainer: {
    padding: 10, 
    borderRadius: 12,
    backgroundColor: "#E3F0FA"
    //"#f0f8ff"
  },
  titleContainer: {
    flexDirection: "row", 
    justifyContent: "space-between"
   },
   weatherTitle: {
     fontSize: 18,
     fontWeight: "bold"
   },
   weatherItems: {
     fontSize: 16, 
     //fontWeight: "bold",
     marginRight: 18
   },
   image: {
    width: 70,
    height: 70
   },
   weatherItemsContainer: {
    flexDirection: "row", 
    justifyContent: "space-between"
   },
   temp: {
    fontSize: 24
   },
   loadingStyle: {
    padding: 10,
    fontSize: 16,
    fontWeight: 300
  }, 
  errorStyle:{
    fontSize: 16, 
    fontWeight: 300
  }
})