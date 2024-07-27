import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getWeatherByCity } from "./api/weather";

const weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherByCity(city);
      console.log("data: ", data);
      setWeather(data);
    } catch (err) {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHN1bm55fGVufDB8fHx8MTYyNTYxODg2OQ&ixlib=rb-1.2.1&q=80&w=1080",
        }}
        style={styles.background}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Weather App</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            placeholderTextColor="#666"
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity style={styles.searchButton} onPress={fetchWeather}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {weather && (
          <View style={styles.content}>
            <Image
              source={{ uri: "https://img.icons8.com/color/96/000000/sun.png" }}
              style={styles.icon}
            />
            <Text style={styles.temperature}>{weather.main.temp}°C</Text>
            <Text style={styles.description}>
              {weather.weather[0].description}
            </Text>
            <View style={styles.details}>
              <Text style={styles.detail}>
                Humidity: {weather.main.humidity}%
              </Text>
              <Text style={styles.detail}>Wind: {weather.wind.speed} km/h</Text>
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 10,
    width: 200,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  content: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: 300,
  },
  icon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 24,
    color: "#666",
    marginVertical: 10,
  },
  details: {
    marginTop: 20,
  },
  detail: {
    fontSize: 18,
    color: "#555",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
