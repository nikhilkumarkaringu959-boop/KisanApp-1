import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useProfile } from '../Context/ProfileContext';
export default function WeatherScreen() {
  const { profile } = useProfile();
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=17.3850&longitude=78.4867&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto')
     .then(res => res.json())
     .then(data => { setWeather(data); setLoading(false); })
     .catch(() => setLoading(false));
  }, []);

  const getEmoji = (code) => {
    if (code <= 3) return '☀️';
    if (code <= 48) return '🌫️';
    if (code <= 67) return '🌧️';
    return '⛈️';
  };

  if (loading) return <ActivityIndicator size="large" color="#3B82F6" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.currentCard}>
        <Text style={styles.location}>📍 {profile.state || 'Telangana'}</Text>
        <Text style={styles.emoji}>{getEmoji(weather.current.weather_code)}</Text>
        <Text style={styles.temp}>{Math.round(weather.current.temperature_2m)}°C</Text>
        <Text style={styles.desc}>Real-time Forecast</Text>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statIcon}>💧</Text>
            <Text style={styles.statLabel}>Humidity</Text>
            <Text style={styles.statValue}>{weather.current.relative_humidity_2m}%</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statIcon}>💨</Text>
            <Text style={styles.statLabel}>Wind</Text>
            <Text style={styles.statValue}>{weather.current.wind_speed_10m} km/h</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statIcon}>☔</Text>
            <Text style={styles.statLabel}>Rain</Text>
            <Text style={styles.statValue}>{weather.daily.precipitation_probability_max[0]}%</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Extended Forecast</Text>
      <View style={styles.forecastBox}>
        {weather.daily.time.map((time, i) => (
          <View key={i} style={styles.dayRow}>
            <Text style={styles.day}>{i === 0? 'Today' : i === 1? 'Tomorrow' : new Date(time).toLocaleDateString('en', {weekday: 'long'})}</Text>
            <View style={styles.dayMid}>
              <Text style={styles.dayEmoji}>{getEmoji(weather.daily.weather_code[i])}</Text>
              <Text style={styles.rain}>{weather.daily.precipitation_probability_max[i]}%</Text>
            </View>
            <View style={styles.dayTemp}>
              <Text style={styles.maxTemp}>{Math.round(weather.daily.temperature_2m_max[i])}°</Text>
              <Text style={styles.minTemp}>{Math.round(weather.daily.temperature_2m_min[i])}°</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc' },
  loader: { flex: 1, justifyContent: 'center' },
  currentCard: { backgroundColor: '#3B82F6', margin: 15, padding: 25, borderRadius: 25, alignItems: 'center' },
  location: { fontSize: 12, color: '#BFDBFE', fontWeight: 'bold', textTransform: 'uppercase' },
  emoji: { fontSize: 80, marginVertical: 10 },
  temp: { fontSize: 60, fontWeight: 'bold', color: 'white' },
  desc: { fontSize: 16, color: '#BFDBFE', marginBottom: 20 },
  statsRow: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 15, padding: 15, width: '100%' },
  stat: { flex: 1, alignItems: 'center' },
  statIcon: { fontSize: 20 },
  statLabel: { fontSize: 10, color: '#BFDBFE', fontWeight: 'bold', marginTop: 5 },
  statValue: { fontSize: 18, color: 'white', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', margin: 15, marginBottom: 10 },
  forecastBox: { backgroundColor: 'white', margin: 15, borderRadius: 20, elevation: 2 },
  dayRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  day: { fontSize: 15, fontWeight: '600', color: '#374151', flex: 1 },
  dayMid: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'center' },
  dayEmoji: { fontSize: 24 },
  rain: { fontSize: 12, color: '#3B82F6', fontWeight: 'bold' },
  dayTemp: { flexDirection: 'row', gap: 8, flex: 1, justifyContent: 'flex-end' },
  maxTemp: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  minTemp: { fontSize: 16, fontWeight: '600', color: '#9CA3AF' },
});
