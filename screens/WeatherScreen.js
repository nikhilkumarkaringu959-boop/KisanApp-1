import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

export default function WeatherScreen() {
  const { userData } = useContext(UserContext);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, [userData.location]);

  const fetchWeather = async () => {
    if (!userData.location) {
      setLoading(false);
      return;
    }
    try {
      const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${userData.location}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (e) {
      console.log('Weather fetch error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  if (!userData.location) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Please set your location in Profile first</Text>
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Could not fetch weather data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weather in {weather.name} 🌦️</Text>
      <View style={styles.card}>
        <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
        <Text style={styles.desc}>{weather.weather[0].description}</Text>
        <Text style={styles.detail}>Humidity: {weather.main.humidity}%</Text>
        <Text style={styles.detail}>Wind: {weather.wind.speed} m/s</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2e7d32' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, alignItems: 'center' },
  temp: { fontSize: 48, fontWeight: 'bold', color: '#1976d2' },
  desc: { fontSize: 18, textTransform: 'capitalize', marginVertical: 10 },
  detail: { fontSize: 16, color: '#666', marginTop: 5 },
  error: { fontSize: 16, textAlign: 'center', marginTop: 50, color: 'red' }
});
