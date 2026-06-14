import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ArrowLeft, CloudRain, Droplets, Wind, Sun, Cloud, MapPin } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function Weather() {
  const router = useRouter();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      // Open-Meteo Free API - No key needed
      const res = await axios.get(
        'https://api.open-meteo.com/v1/forecast?latitude=17.385&longitude=78.4867&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia/Kolkata&forecast_days=7'
      );

      const current = res.data.current;
      const hourly = res.data.hourly;
      const daily = res.data.daily;

      // 24-hour forecast - next 4 intervals
      const hourlyData = [];
      for (let i = 0; i < 24; i += 6) {
        const time = new Date(hourly.time[i]);
        hourlyData.push({
          time: i === 0? 'Now' : time.toLocaleTimeString('en-IN', { hour: 'numeric' }),
          temp: Math.round(hourly.temperature_2m[i]),
        });
      }

      // 7-day forecast
      const dailyData = daily.time.map((date, i) => ({
        day: i === 0? 'Today' : new Date(date).toLocaleDateString('en-IN', { weekday: 'short' }),
        rain: daily.precipitation_probability_max[i],
        max: Math.round(daily.temperature_2m_max[i]),
        min: Math.round(daily.temperature_2m_min[i]),
      }));

      setWeather({
        temp: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        wind: current.wind_speed_10m,
        rain: current.precipitation,
        hourly: hourlyData,
        daily: dailyData,
      });
      setFetched(true);
    } catch (error) {
      console.log('Weather Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (size = 32) => {
    if (weather?.rain > 0) return <CloudRain color="#3B82F6" size={size} />;
    return <Sun color="#F59E0B" size={size} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color="#FFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Real-time Weather</Text>
      </View>

      <ScrollView style={styles.content}>
        {!fetched? (
          <View style={styles.fetchCard}>
            <CloudRain color="#3B82F6" size={64} strokeWidth={1.5} />
            <Text style={styles.fetchTitle}>Get Live Weather Forecast</Text>
            <Text style={styles.fetchSub}>Fetch real-time data for your farm's location.</Text>
            <TouchableOpacity
              style={styles.fetchBtn}
              onPress={fetchWeather}
              disabled={loading}
            >
              {loading? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.fetchBtnText}>Fetch Weather</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.currentCard}>
              <View style={styles.locationRow}>
                <MapPin color="#FFF" size={18} />
                <Text style={styles.locationText}>Your Location</Text>
              </View>

              <View style={styles.tempRow}>
                <Text style={styles.tempBig}>{weather.temp}°C</Text>
                <Text style={styles.condition}>Clear Sky</Text>
              </View>

              <View style={styles.statsBox}>
                <View style={styles.statItem}>
                  <Droplets color="#FFF" size={20} />
                  <Text style={styles.statValue}>{weather.humidity}%</Text>
                </View>
                <View style={styles.statItem}>
                  <Wind color="#FFF" size={20} />
                  <Text style={styles.statValue}>{weather.wind} km/h</Text>
                </View>
                <View style={styles.statItem}>
                  <CloudRain color="#FFF" size={20} />
                  <Text style={styles.statValue}>{weather.rain} mm</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>24-Hour Forecast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
              {weather.hourly.map((hour, index) => (
                <View key={index} style={styles.hourCard}>
                  <Text style={styles.hourTime}>{hour.time}</Text>
                  <Sun color="#F59E0B" size={28} />
                  <Text style={styles.hourTemp}>{hour.temp}°</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.dailyCard}>
              <Text style={styles.dailyTitle}>7-Day Forecast</Text>
              {weather.daily.map((day, index) => (
                <View key={index} style={styles.dayRow}>
                  <Text style={styles.dayName}>{day.day}</Text>
                  <View style={styles.dayRain}>
                    <Droplets color="#3B82F6" size={16} />
                    <Text style={styles.dayRainText}>{day.rain}%</Text>
                  </View>
                  <Text style={styles.dayTemp}>{day.max}° / {day.min}°</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { backgroundColor: '#2563EB', padding: 16, paddingTop: 60, flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF', fontStyle: 'italic' },
  content: { flex: 1 },
  fetchCard: { backgroundColor: '#FFF', margin: 20, padding: 32, borderRadius: 20, alignItems: 'center', elevation: 2 },
  fetchTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginTop: 20, fontStyle: 'italic' },
  fetchSub: { fontSize: 14, color: '#64748B', marginTop: 8, textAlign: 'center', fontStyle: 'italic' },
  fetchBtn: { backgroundColor: '#2563EB', paddingHorizontal: 48, paddingVertical: 14, borderRadius: 12, marginTop: 24, minWidth: 200, alignItems: 'center' },
  fetchBtnText: { fontSize: 16, fontWeight: 'bold', color: '#FFF', fontStyle: 'italic' },
  currentCard: { backgroundColor: '#2563EB', margin: 16, padding: 24, borderRadius: 20, elevation: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  locationText: { fontSize: 14, color: '#DBEAFE', fontStyle: 'italic' },
  tempRow: { marginTop: 12 },
  tempBig: { fontSize: 56, fontWeight: 'bold', color: '#FFF' },
  condition: { fontSize: 18, color: '#DBEAFE', marginTop: 4 },
  statsBox: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#1E40AF', padding: 16, borderRadius: 12, marginTop: 20 },
  statItem: { alignItems: 'center', gap: 4 },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginHorizontal: 16, marginTop: 24, marginBottom: 12, fontStyle: 'italic' },
  hourlyScroll: { paddingLeft: 16 },
  hourCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, alignItems: 'center', marginRight: 12, minWidth: 80, elevation: 1 },
  hourTime: { fontSize: 13, color: '#64748B', marginBottom: 8 },
  hourTemp: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginTop: 8 },
  dailyCard: { backgroundColor: '#FFF', margin: 16, padding: 20, borderRadius: 16, elevation: 1 },
  dailyTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 16, fontStyle: 'italic' },
  dayRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  dayName: { flex: 1, fontSize: 15, color: '#1E293B', fontWeight: '600' },
  dayRain: { flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1 },
  dayRainText: { fontSize: 14, color: '#3B82F6', fontWeight: '600' },
  dayTemp: { fontSize: 15, color: '#1E293B', fontWeight: '600', minWidth: 80, textAlign: 'right' },
});
