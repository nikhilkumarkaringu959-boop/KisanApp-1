import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OPENWEATHER_API_KEY = '8b5553bee19b77af9b96c40a2b0c2cbf';

export default function WeatherScreen({ navigation }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    loadWeatherData();
  }, []);

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      // Get saved location from Profile
      const savedProfile = await AsyncStorage.getItem('farmerProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.district && profile.state) {
          setLocation(`${profile.district}, ${profile.state}`);
          await fetchWeather(`${profile.district},${profile.state},IN`);
        } else {
          Alert.alert('Location Missing', 'Please set your District & State in Profile first');
          setLoading(false);
        }
      } else {
        Alert.alert('Profile Not Found', 'Please complete your Profile setup first');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error loading weather:', error);
      setLoading(false);
    }
  };

  const fetchWeather = async (city) => {
    try {
      // Current Weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
      const weatherData = await weatherRes.json();

      if (weatherData.cod === 200) {
        setWeather(weatherData);
      } else {
        Alert.alert('Error', 'Could not fetch weather data. Check your location or try again in 10 mins');
      }

      // 5 Day Forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
      const forecastData = await forecastRes.json();

      if (forecastData.cod === '200') {
        // Get one forecast per day
        const dailyForecast = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5);
        setForecast(dailyForecast);
      }
    } catch (error) {
      console.error('Weather API Error:', error);
      Alert.alert('Network Error', 'Could not connect to weather service');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clear': return 'sunny';
      case 'Clouds': return 'cloudy';
      case 'Rain': return 'rainy';
      case 'Drizzle': return 'rainy';
      case 'Thunderstorm': return 'thunderstorm';
      case 'Snow': return 'snow';
      case 'Mist':
      case 'Fog': return 'cloudy';
      default: return 'partly-sunny';
    }
  };

  const getFarmingAdvice = () => {
    if (!weather) return null;

    const temp = weather.main.temp;
    const humidity = weather.main.humidity;
    const main = weather.weather[0].main;

    if (main === 'Rain') {
      return { icon: 'warning', color: '#DC2626', text: 'Heavy rain expected. Avoid spraying pesticides today.' };
    } else if (temp > 35) {
      return { icon: 'sunny', color: '#EA580C', text: 'Very hot. Irrigate crops early morning or evening.' };
    } else if (humidity > 80) {
      return { icon: 'bug', color: '#7C3AED', text: 'High humidity. Watch for fungal diseases.' };
    } else if (temp >= 20 && temp <= 30 && main === 'Clear') {
      return { icon: 'leaf', color: '#16A34A', text: 'Perfect weather for field work and spraying.' };
    }
    return { icon: 'information-circle', color: '#2563EB', text: 'Normal weather conditions for farming.' };
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Weather Forecast</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Fetching weather data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!weather) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Weather Forecast</Text>
          <TouchableOpacity onPress={loadWeatherData}>
            <Ionicons name="refresh" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="cloud-offline" size={80} color="#9CA3AF" />
          <Text style={styles.errorText}>No Weather Data</Text>
          <Text style={styles.errorSub}>Please set your location in Profile</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.retryText}>Go to Profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const advice = getFarmingAdvice();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weather Forecast</Text>
        <TouchableOpacity onPress={loadWeatherData}>
          <Ionicons name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.locationText}>{location}</Text>

        {/* Current Weather Card */}
        <View style={styles.currentCard}>
          <View style={styles.currentTop}>
            <View>
              <Text style={styles.tempText}>{Math.round(weather.main.temp)}°C</Text>
              <Text style={styles.descText}>{weather.weather[0].description}</Text>
            </View>
            <Ionicons name={getWeatherIcon(weather.weather[0].main)} size={80} color="#FBBF24" />
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Ionicons name="water" size={20} color="#2563EB" />
              <Text style={styles.detailText}>{weather.main.humidity}%</Text>
              <Text style={styles.detailLabel}>Humidity</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="speedometer" size={20} color="#7C3AED" />
              <Text style={styles.detailText}>{weather.wind.speed} m/s</Text>
              <Text style={styles.detailLabel}>Wind</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="thermometer" size={20} color="#DC2626" />
              <Text style={styles.detailText}>{Math.round(weather.main.feels_like)}°</Text>
              <Text style={styles.detailLabel}>Feels Like</Text>
            </View>
          </View>
        </View>

        {/* Farming Advice */}
        {advice && (
          <View style={[styles.adviceCard, { borderLeftColor: advice.color }]}>
            <Ionicons name={advice.icon} size={24} color={advice.color} />
            <Text style={styles.adviceText}>{advice.text}</Text>
          </View>
        )}

        {/* 5 Day Forecast */}
        <Text style={styles.sectionTitle}>5-Day Forecast</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.forecastRow}>
          {forecast.map((day, index) => (
            <View key={index} style={styles.forecastCard}>
              <Text style={styles.forecastDay}>
                {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
              </Text>
              <Ionicons name={getWeatherIcon(day.weather[0].main)} size={32} color="#2563EB" />
              <Text style={styles.forecastTemp}>{Math.round(day.main.temp)}°</Text>
              <Text style={styles.forecastDesc}>{day.weather[0].main}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#2563EB' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  scrollView: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 16, color: '#6B7280' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  errorText: { fontSize: 20, fontWeight: 'bold', color: '#6B7280', marginTop: 16 },
  errorSub: { fontSize: 14, color: '#9CA3AF', marginTop: 8, textAlign: 'center' },
  retryBtn: { backgroundColor: '#2563EB', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8, marginTop: 24 },
  retryText: { color: '#fff', fontWeight: 'bold' },
  locationText: { fontSize: 16, fontWeight: '600', color: '#374151', textAlign: 'center', padding: 16 },
  currentCard: { backgroundColor: '#2563EB', margin: 16, padding: 24, borderRadius: 16, elevation: 4 },
  currentTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  tempText: { fontSize: 56, fontWeight: 'bold', color: '#fff' },
  descText: { fontSize: 18, color: '#DBEAFE', textTransform: 'capitalize' },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#3B82F6', paddingTop: 16 },
  detailItem: { alignItems: 'center' },
  detailText: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 4 },
  detailLabel: { fontSize: 12, color: '#DBEAFE', marginTop: 2 },
  adviceCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', margin: 16, padding: 16, borderRadius: 12, borderLeftWidth: 4, elevation: 2 },
  adviceText: { flex: 1, fontSize: 14, color: '#374151', marginLeft: 12, fontWeight: '500' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginHorizontal: 16, marginTop: 8, marginBottom: 12 },
  forecastRow: { paddingHorizontal: 16 },
  forecastCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, alignItems: 'center', marginRight: 12, width: 100, elevation: 1 },
  forecastDay: { fontSize: 14, fontWeight: '600', color: '#6B7280', marginBottom: 8 },
  forecastTemp: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginTop: 8 },
  forecastDesc: { fontSize: 12, color: '#9CA3AF', marginTop: 4 },
});
