import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

// ⚠️ API KEY - OpenWeatherMap
const API_KEY = '8b5553bee19b77af9b96c40a2b0c2cbf';

export default function WeatherScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      // Hyderabad coordinates - change to user's location
      const lat = 17.385;
      const lon = 78.4867;
      
      // 1. Current Weather
      const currentRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      
      // 2. 5 Day / 3 Hour Forecast
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      setWeather(currentRes.data);
      setForecast(forecastRes.data);
      
      // Get next 24 hours data
      const next24Hours = forecastRes.data.list.slice(0, 8);
      setHourly(next24Hours);

    } catch (err) {
      console.log('Weather API Error:', err);
      setError('Weather fetch failed. Check internet or API key.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return 'Today';
    return date.toLocaleDateString('en', { weekday: 'short' });
  };

  const formatHour = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hour = date.getHours();
    if (hour === new Date().getHours()) return 'Now';
    return hour + ':00';
  };

  // Group forecast by day for 7-day view
  const getDailyForecast = () => {
    if (!forecast) return [];
    const dailyData = [];
    const seen = new Set();
    
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!seen.has(date) && dailyData.length < 7) {
        seen.add(date);
        dailyData.push(item);
      }
    });
    return dailyData;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Real-time Weather</Text>
        <TouchableOpacity onPress={fetchWeather}>
          <Ionicons name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingText}>Fetching live weather data...</Text>
          </View>
        )}

        {error? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={48} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={fetchWeather}>
              <Text style={styles.retryBtnText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {weather &&!loading && (
          <>
            {/* Current Weather Card */}
            <View style={styles.currentCard}>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={18} color="#fff" />
                <Text style={styles.locationText}>{weather.name}, Telangana</Text>
              </View>
              
              <View style={styles.tempRow}>
                <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
                <MaterialCommunityIcons 
                  name="weather-sunny" 
                  size={80} 
                  color="#FCD34D" 
                  style={styles.weatherIcon}
                />
              </View>
              
              <Text style={styles.condition}>{weather.weather[0].description}</Text>
              <Text style={styles.feelsLike}>Feels like {Math.round(weather.main.feels_like)}°C</Text>
              
              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <MaterialCommunityIcons name="water-percent" size={22} color="#fff" />
                  <Text style={styles.statLabel}>Humidity</Text>
                  <Text style={styles.statValue}>{weather.main.humidity}%</Text>
                </View>
                <View style={styles.stat}>
                  <MaterialCommunityIcons name="weather-windy" size={22} color="#fff" />
                  <Text style={styles.statLabel}>Wind</Text>
                  <Text style={styles.statValue}>{Math.round(weather.wind.speed * 3.6)} km/h</Text>
                </View>
                <View style={styles.stat}>
                  <MaterialCommunityIcons name="weather-rainy" size={22} color="#fff" />
                  <Text style={styles.statLabel}>Pressure</Text>
                  <Text style={styles.statValue}>{weather.main.pressure} hPa</Text>
                </View>
              </View>
            </View>

            {/* 24-Hour Forecast */}
            <Text style={styles.sectionTitle}>24-Hour Forecast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourly}>
              {hourly.map((hour, idx) => (
                <View key={idx} style={styles.hourCard}>
                  <Text style={styles.hourTime}>{formatHour(hour.dt)}</Text>
                  <MaterialCommunityIcons 
                    name={hour.weather[0].main === 'Clear'? 'weather-sunny' : 'weather-cloudy'} 
                    size={32} 
                    color={hour.weather[0].main === 'Clear'? '#F59E0B' : '#6B7280'} 
                  />
                  <Text style={styles.hourTemp}>{Math.round(hour.main.temp)}°</Text>
                  <View style={styles.hourRain}>
                    <Ionicons name="water" size={12} color="#3B82F6" />
                    <Text style={styles.hourRainText}>{Math.round(hour.pop * 100)}%</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* 7-Day Forecast */}
            <Text style={styles.sectionTitle}>7-Day Forecast</Text>
            {getDailyForecast().map((day, idx) => (
              <View key={idx} style={styles.dayRow}>
                <Text style={styles.dayName}>{formatDay(day.dt)}</Text>
                <View style={styles.dayCenter}>
                  <MaterialCommunityIcons 
                    name={day.weather[0].main === 'Clear'? 'weather-sunny' : 'weather-partly-cloudy'} 
                    size={28} 
                    color={day.weather[0].main === 'Clear'? '#F59E0B' : '#6B7280'} 
                  />
                  <View style={styles.dayRain}>
                    <Ionicons name="water" size={14} color="#3B82F6" />
                    <Text style={styles.dayRainText}>{Math.round(day.pop * 100)}%</Text>
                  </View>
                </View>
                <Text style={styles.dayTemp}>
                  {Math.round(day.main.temp_max)}° / {Math.round(day.main.temp_min)}°
                </Text>
              </View>
            ))}

            {/* Additional Info */}
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="weather-sunset-up" size={20} color="#F59E0B" />
                <Text style={styles.infoText}>
                  Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="weather-sunset-down" size={20} color="#EF4444" />
                <Text style={styles.infoText}>
                  Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="eye" size={20} color="#8B5CF6" />
                <Text style={styles.infoText}>
                  Visibility: {(weather.visibility / 1000).toFixed(1)} km
                </Text>
              </View>
            </View>
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
  loadingBox: { backgroundColor: '#fff', borderRadius: 16, padding: 40, alignItems: 'center', marginTop: 50 },
  loadingText: { fontSize: 14, color: '#6B7280', marginTop: 12 },
  errorBox: { backgroundColor: '#fff', borderRadius: 16, padding: 40, alignItems: 'center', marginTop: 50 },
  errorText: { fontSize: 15, color: '#EF4444', marginTop: 16, textAlign: 'center' },
  retryBtn: { backgroundColor: '#3B82F6', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 12, marginTop: 20 },
  retryBtnText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  currentCard: { backgroundColor: '#3B82F6', borderRadius: 24, padding: 24, marginBottom: 24, elevation: 4, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 12 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6, opacity: 0.95 },
  locationText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  tempRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 },
  temp: { color: '#fff', fontSize: 72, fontWeight: 'bold' },
  weatherIcon: { opacity: 0.9 },
  condition: { color: '#fff', fontSize: 18, fontWeight: '600', marginTop: 8, textTransform: 'capitalize' },
  feelsLike: { color: '#fff', fontSize: 14, opacity: 0.9, marginTop: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff25', borderRadius: 16, padding: 16, marginTop: 20 },
  stat: { alignItems: 'center', gap: 6 },
  statLabel: { color: '#fff', fontSize: 12, opacity: 0.9 },
  statValue: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginTop: 8, marginBottom: 16 },
  hourly: { marginBottom: 24 },
  hourCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, alignItems: 'center', marginRight: 12, width: 80, elevation: 2 },
  hourTime: { fontSize: 13, color: '#6B7280', fontWeight: '600', marginBottom: 8 },
  hourTemp: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginTop: 8 },
  hourRain: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 6 },
  hourRainText: { fontSize: 12, color: '#3B82F6', fontWeight: '600' },
  dayRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 18, borderRadius: 16, marginBottom: 10, elevation: 1 },
  dayName: { fontSize: 16, color: '#1F2937', fontWeight: '600', width: 70 },
  dayCenter: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  dayRain: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dayRainText: { fontSize: 14, color: '#3B82F6', fontWeight: '600' },
  dayTemp: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  infoCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginTop: 8, marginBottom: 20, elevation: 1 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  infoText: { fontSize: 15, color: '#374151', fontWeight: '500' },
});
