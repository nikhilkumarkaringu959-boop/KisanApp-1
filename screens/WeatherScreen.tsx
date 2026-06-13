import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sun, Cloud, CloudRain, Wind, Droplets, ArrowLeft, MapPin, Thermometer, Eye } from 'lucide-react-native';
import * as Location from 'expo-location';

export default function WeatherScreen({ navigation }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    getWeatherData();
  }, []);

  const getWeatherData = async () => {
    try {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status!== 'granted') {
        alert('Location permission required for weather');
        setLoading(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;

      // ✅ CURRENT WEATHER
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8b5553bee19b77af9b96c40a2b0c2cbf&units=metric`
      );
      const data = await res.json();
      setWeather(data);

      // ✅ 5 DAY FORECAST
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=8b5553bee19b77af9b96c40a2b0c2cbf&units=metric`
      );
      const forecastData = await forecastRes.json();
      setForecast(forecastData.list.slice(0, 5));

      setLoading(false);
    } catch (error) {
      console.log('Weather Error:', error);
      setLoading(false);
    }
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clear': return <Sun color="#F59E0B" size={80} />;
      case 'Clouds': return <Cloud color="#6B7280" size={80} />;
      case 'Rain': return <CloudRain color="#3B82F6" size={80} />;
      default: return <Sun color="#F59E0B" size={80} />;
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={['#1A9B6C', '#0D5A3E']} style={styles.container}>
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Fetching Weather...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#1A9B6C', '#0D5A3E']} style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weather Forecast</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ✅ CURRENT WEATHER CARD */}
        <View style={styles.weatherCard}>
          <View style={styles.locationRow}>
            <MapPin color="#16A34A" size={20} />
            <Text style={styles.cityName}>{weather?.name || 'Your Location'}</Text>
          </View>

          <View style={styles.mainWeather}>
            {getWeatherIcon(weather?.weather[0]?.main)}
            <Text style={styles.temp}>{Math.round(weather?.main?.temp)}°C</Text>
            <Text style={styles.condition}>{weather?.weather[0]?.main}</Text>
            <Text style={styles.desc}>{weather?.weather[0]?.description}</Text>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Thermometer color="#EF4444" size={24} />
              <Text style={styles.detailLabel}>Feels Like</Text>
              <Text style={styles.detailValue}>{Math.round(weather?.main?.feels_like)}°C</Text>
            </View>
            <View style={styles.detailItem}>
              <Droplets color="#3B82F6" size={24} />
              <Text style={styles.detailLabel}>Humidity</Text>
              <Text style={styles.detailValue}>{weather?.main?.humidity}%</Text>
            </View>
            <View style={styles.detailItem}>
              <Wind color="#8B5CF6" size={24} />
              <Text style={styles.detailLabel}>Wind</Text>
              <Text style={styles.detailValue}>{weather?.wind?.speed} m/s</Text>
            </View>
            <View style={styles.detailItem}>
              <Eye color="#F59E0B" size={24} />
              <Text style={styles.detailLabel}>Visibility</Text>
              <Text style={styles.detailValue}>{weather?.visibility / 1000} km</Text>
            </View>
          </View>
        </View>

        {/* ✅ 5 DAY FORECAST */}
        <Text style={styles.sectionTitle}>5-Day Forecast</Text>
        {forecast.map((item, index) => (
          <View key={index} style={styles.forecastCard}>
            <Text style={styles.forecastTime}>
              {new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <View style={styles.forecastCenter}>
              {item.weather[0].main === 'Clear'? <Sun color="#F59E0B" size={32} /> :
               item.weather[0].main === 'Clouds'? <Cloud color="#6B7280" size={32} /> :
               <CloudRain color="#3B82F6" size={32} />}
              <Text style={styles.forecastCondition}>{item.weather[0].main}</Text>
            </View>
            <Text style={styles.forecastTemp}>{Math.round(item.main.temp)}°C</Text>
          </View>
        ))}

        {/* ✅ FARMING TIP */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>🌾 Farming Tip</Text>
          <Text style={styles.tipText}>
            {weather?.main?.temp > 30
             ? 'High temperature detected. Irrigate crops early morning or evening to avoid water loss.'
              : weather?.weather[0]?.main === 'Rain'
             ? 'Rain expected. Avoid fertilizer application today. Protect harvested crops.'
              : 'Weather is suitable for field work. Good time for spraying pesticides.'}
          </Text>
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#fff', fontSize: 16, marginTop: 12, fontWeight: '600' },
  header: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 15,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)'
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },
  scroll: { flex: 1 },
  weatherCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    margin: 15,
    padding: 25,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 15 },
  cityName: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  mainWeather: { alignItems: 'center', marginBottom: 25 },
  temp: { fontSize: 64, fontWeight: '800', color: '#1F2937', marginTop: 10 },
  condition: { fontSize: 22, fontWeight: '600', color: '#4B5563', marginTop: 5 },
  desc: { fontSize: 16, color: '#6B7280', textTransform: 'capitalize', marginTop: 4 },
  detailsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  detailItem: {
    backgroundColor: '#F9FAFB',
    width: '47.5%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center'
  },
  detailLabel: { fontSize: 12, color: '#6B7280', marginTop: 8, fontWeight: '600' },
  detailValue: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginLeft: 15, marginTop: 10, marginBottom: 12 },
  forecastCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 18,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  forecastTime: { fontSize: 14, fontWeight: '600', color: '#4B5563', width: 70 },
  forecastCenter: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center' },
  forecastCondition: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  forecastTemp: { fontSize: 20, fontWeight: '700', color: '#16A34A', width: 60, textAlign: 'right' },
  tipCard: {
    backgroundColor: 'rgba(254, 243, 199, 0.95)',
    margin: 15,
    marginBottom: 30,
    padding: 20,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B'
  },
  tipTitle: { fontSize: 16, fontWeight: '700', color: '#92400E', marginBottom: 8 },
  tipText: { fontSize: 14, color: '#78350F', lineHeight: 20 }
});
