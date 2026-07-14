import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function WeatherScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState('Detecting...');
  const [lat, setLat] = useState(13.6288); // Default Tirupati
  const [lon, setLon] = useState(79.4192);
  const [searchCity, setSearchCity] = useState('');

  // 1. AUTO DETECT LOCATION
  const getCurrentLocation = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status!== 'granted') {
      setLocationName('Permission Denied');
      setLoading(false);
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLat(loc.coords.latitude);
    setLon(loc.coords.longitude);

    // Get city name
    let address = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
    setLocationName(`${address[0].city}, ${address[0].region}`);
    fetchWeather(loc.coords.latitude, loc.coords.longitude);
  };

  // 2. SEARCH CITY BY NAME
  const searchLocation = async () => {
    if(!searchCity) return;
    setLoading(true);
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchCity}&count=1`);
      const data = await res.json();
      if(data.results && data.results.length > 0) {
        const city = data.results[0];
        setLat(city.latitude);
        setLon(city.longitude);
        setLocationName(`${city.name}, ${city.country}`);
        fetchWeather(city.latitude, city.longitude);
      }
    } catch(e) {
      console.log(e);
      setLoading(false);
    }
  }

  // 3. FETCH WEATHER API
  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
      const res = await fetch(url);
      const data = await res.json();
      setWeather(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation(); // App open ayinappude auto detect
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#4CAF50" style={{flex:1, justifyContent: 'center'}} />;

  const current = weather?.current;
  const daily = weather?.daily;

  return (
    <ScrollView style={styles.container}>

      {/* LOCATION BAR */}
      <View style={styles.locationBar}>
        <Ionicons name="location" size={20} color="#2E7D32" />
        <Text style={styles.locationText}>{locationName}</Text>
        <TouchableOpacity onPress={getCurrentLocation}>
          <Ionicons name="refresh" size={22} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      {/* SEARCH BOX */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Enter City: Hyderabad, Delhi"
          value={searchCity}
          onChangeText={setSearchCity}
          style={styles.input}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={searchLocation}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Search</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Weather Forecast</Text>

      <View style={styles.mainCard}>
        <Text style={styles.temp}>{Math.round(current.temperature_2m)}°C</Text>
        <Text style={styles.desc}>Humidity: {current.relative_humidity_2m}%</Text>
        <Text style={styles.desc}>Wind: {current.wind_speed_10m} km/h</Text>
        <Text style={styles.desc}>Rain: {current.precipitation} mm</Text>
      </View>

      <Text style={styles.subtitle}>Next 7 Days</Text>
      {daily.time.map((day: string, i: number) => (
        <View key={day} style={styles.dayRow}>
          <Text>{new Date(day).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' })}</Text>
          <Text>🌧️ {daily.precipitation_probability_max[i]}%</Text>
          <Text>{Math.round(daily.temperature_2m_max[i])}° / {Math.round(daily.temperature_2m_min[i])}°</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#F5F5F5' },
  locationBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 12, borderRadius: 10, marginBottom: 10 },
  locationText: { flex: 1, marginLeft: 8, fontSize: 16, fontWeight: '600' },
  searchBox: { flexDirection: 'row', marginBottom: 15 },
  input: { flex: 1, backgroundColor: 'white', padding: 12, borderRadius: 10 },
  searchBtn: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 10, marginLeft: 8, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#2E7D32' },
  mainCard: { backgroundColor: 'white', padding: 20, borderRadius: 16, elevation: 3, marginBottom: 15 },
  temp: { fontSize: 48, fontWeight: 'bold', color: '#2E7D32' },
  desc: { fontSize: 16, marginTop: 4 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  dayRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: 14, borderRadius: 10, marginBottom: 6 }
});
