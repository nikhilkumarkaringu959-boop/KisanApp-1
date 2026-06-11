import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

export default function WeatherScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      // Open-Meteo API - Free, no key needed
      const lat = 17.385; // Hyderabad lat - change to user's location
      const lon = 78.4867; // Hyderabad lon
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&hourly=temperature_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=auto`
      );
      setWeather(res.data);
    } catch (err) {
      setError('Weather fetch failed. Check internet.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (code) => {
    if (code === 0) return 'weather-sunny';
    if (code <= 3) return 'weather-partly-cloudy';
    if (code <= 67) return 'weather-rainy';
    return 'weather-cloudy';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Real-time Weather</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {!weather &&!loading && (
          <View style={styles.card}>
            <MaterialCommunityIcons name="weather-partly-rainy" size={60} color="#3B82F6" />
            <Text style={styles.cardTitle}>Get Live Weather Forecast</Text>
            <Text style={styles.cardSub}>Fetch real-time data for your farm's location.</Text>
            <TouchableOpacity style={styles.fetchBtn} onPress={fetchWeather}>
              <Text style={styles.fetchBtnText}>Fetch Weather</Text>
            </TouchableOpacity>
          </View>
        )}

        {loading && <ActivityIndicator size="large" color="#3B82F6" style={{ marginTop: 50 }} />}
        {error? <Text style={styles.error}>{error}</Text> : null}

        {weather && (
          <>
            <View style={styles.currentCard}>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={18} color="#fff" />
                <Text style={styles.locationText}>Your Location</Text>
              </View>
              <Text style={styles.temp}>{weather.current.temperature_2m}°C</Text>
              <Text style={styles.condition}>Clear Sky</Text>
              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <MaterialCommunityIcons name="water-percent" size={20} color="#fff" />
                  <Text style={styles.statText}>{weather.current.relative_humidity_2m}%</Text>
                </View>
                <View style={styles.stat}>
                  <MaterialCommunityIcons name="weather-windy" size={20} color="#fff" />
                  <Text style={styles.statText}>{weather.current.wind_speed_10m} km/h</Text>
                </View>
                <View style={styles.stat}>
                  <MaterialCommunityIcons name="weather-rainy" size={20} color="#fff" />
                  <Text style={styles.statText}>{weather.current.precipitation} mm</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>24-Hour Forecast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourly}>
              {weather.hourly.time.slice(0, 12).map((time, idx) => (
                <View key={idx} style={styles.hourCard}>
                  <Text style={styles.hourTime}>{idx === 0? 'Now' : new Date(time).getHours() + ':00'}</Text>
                  <MaterialCommunityIcons name="weather-sunny" size={24} color="#F59E0B" />
                  <Text style={styles.hourTemp}>{Math.round(weather.hourly.temperature_2m[idx])}°</Text>
                </View>
              ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>7-Day Forecast</Text>
            {weather.daily.time.slice(0, 7).map((day, idx) => (
              <View key={idx} style={styles.dayRow}>
                <Text style={styles.dayName}>{idx === 0? 'Today' : new Date(day).toLocaleDateString('en', { weekday: 'short' })}</Text>
                <View style={styles.dayCenter}>
                  <MaterialCommunityIcons name="water-percent" size={16} color="#3B82F6" />
                  <Text style={styles.dayRain}>{weather.daily.precipitation_probability_max[idx]}%</Text>
                </View>
                <Text style={styles.dayTemp}>{Math.round(weather.daily.temperature_2m_max[idx])}° / {Math.round(weather.daily.temperature_2m_min[idx])}°</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#2563EB', padding: 16, paddingTop: 50 },
  headerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 32, alignItems: 'center', elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, color: '#1F2937' },
  cardSub: { fontSize: 14, color: '#6B7280', marginTop: 8, textAlign: 'center' },
  fetchBtn: { backgroundColor: '#2563EB', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12, marginTop: 20 },
  fetchBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  error: { color: '#EF4444', textAlign: 'center', marginTop: 20 },
  currentCard: { backgroundColor: '#3B82F6', borderRadius: 20, padding: 24, marginBottom: 24 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6, opacity: 0.9 },
  locationText: { color: '#fff', fontSize: 14 },
  temp: { color: '#fff', fontSize: 56, fontWeight: 'bold', marginTop: 8 },
  condition: { color: '#fff', fontSize: 16, opacity: 0.9 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff20', borderRadius: 12, padding: 12, marginTop: 16 },
  stat: { alignItems: 'center', gap: 4 },
  statText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginTop: 16, marginBottom: 12 },
  hourly: { marginBottom: 16 },
  hourCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center', marginRight: 12, width: 70 },
  hourTime: { fontSize: 12, color: '#6B7280', marginBottom: 8 },
  hourTemp: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginTop: 8 },
  dayRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 8 },
  dayName: { fontSize: 15, color: '#1F2937', width: 60 },
  dayCenter: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dayRain: { fontSize: 14, color: '#3B82F6' },
  dayTemp: { fontSize: 15, fontWeight: '600', color: '#1F2937' }
});
