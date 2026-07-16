import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import i18n from '../i18n'; // i18n import

export default function WeatherScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState('');
  const [locationName, setLocationName] = useState('Your Location');
  const [aiTip, setAiTip] = useState(''); // NEW: AI Tip kosam

  const GEMINI_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY; // NEW

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    setWeather(null);
    setAiTip('');

    try {
      // 1. LOCATION TEESUKOVADAM + District Name
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status!== 'granted') {
        setError(i18n.t('locationDenied'));
        setLoading(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      let address = await Location.reverseGeocodeAsync({latitude, longitude});
      const place = address[0].district || address[0].city || 'Your Location';
      setLocationName(place);

      // 2. OPEN-METEO API CALL - Free, No Key Needed
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weathercode&hourly=temperature_2m,weathercode,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max&timezone=auto&forecast_days=10`;

      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);

      // 3. NEW: GEMINI KI PAMPADAM - Smart Tip adagadam
      await getGeminiTip(data, place);

    } catch (err) {
      setError(i18n.t('fetchError'));
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // NEW FUNCTION: Gemini nundi tip theesukovadam
  const getGeminiTip = async (weatherData: any, place: string) => {
    if(!GEMINI_KEY) return;

    const temp = weatherData.current.temperature_2m;
    const humidity = weatherData.current.relative_humidity_2m;
    const weatherText = getWeatherText(weatherData.current.weathercode);

    const prompt = `You are an agriculture expert for Indian farmers. Location: ${place}, India. Current weather: ${temp}°C, ${weatherText}, Humidity: ${humidity}%.
    Give 3 short Telugu farming tips. What crop to grow, what to spray, what to avoid. Keep it short and useful.`;

    try {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );
      const geminiData = await geminiRes.json();
      setAiTip(geminiData.candidates[0].content.parts[0].text);
    } catch (e) {
      console.log("Gemini Error:", e);
    }
  }

  const getWeatherIcon = (code: number) => {
    if(code === 0) return 'sunny';
    if(code < 3) return 'partly-sunny';
    if(code < 48) return 'cloudy';
    if(code < 67) return 'rainy';
    return 'thunderstorm';
  }

  const getWeatherText = (code: number) => {
    if(code === 0) return i18n.locale === 'te'? 'స్వచ్ఛమైన ఆకాశం' : 'Clear Sky';
    if(code < 3) return i18n.locale === 'te'? 'పాక్షికంగా మేఘాలు' : 'Partly Cloudy';
    if(code < 48) return i18n.locale === 'te'? 'మేఘాలు' : 'Cloudy';
    if(code < 67) return i18n.locale === 'te'? 'వర్షం' : 'Rain';
    return i18n.locale === 'te'? 'తుఫాను' : 'Storm';
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{i18n.t('weather')}</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        {!weather &&!loading && (
          <View style={styles.fetchCard}>
            <Ionicons name="cloud" size={80} color="#2196F3" />
            <Text style={styles.fetchTitle}>{i18n.t('fetchWeather')}</Text>
            <Text style={styles.fetchDesc}>{i18n.t('fetchDesc')}</Text>
            <TouchableOpacity style={styles.fetchBtn} onPress={fetchWeather}>
              <Text style={styles.fetchBtnText}>{i18n.t('fetchBtn')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {loading && <ActivityIndicator size="large" color="#2196F3" style={{marginTop: 50}} />}

        {error && <Text style={styles.errorText}>{error}</Text>}

        {weather && (
          <>
            {/* CURRENT WEATHER CARD */}
            <View style={styles.currentCard}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="location" size={16} color="white" />
                <Text style={styles.locationText}> {locationName}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={styles.tempText}>{weather.current.temperature_2m}°C</Text>
                <Text style={styles.conditionText}>{getWeatherText(weather.current.weathercode)}</Text>
              </View>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Ionicons name="water" size={20} color="white" />
                  <Text style={styles.statLabel}>{i18n.t('humidity')}</Text>
                  <Text style={styles.statValue}>{weather.current.relative_humidity_2m}%</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="speedometer" size={20} color="white" />
                  <Text style={styles.statLabel}>{i18n.t('wind')}</Text>
                  <Text style={styles.statValue}>{weather.current.wind_speed_10m} km/h</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="cloud-rain" size={20} color="white" />
                  <Text style={styles.statLabel}>{i18n.t('rain')}</Text>
                  <Text style={styles.statValue}>{weather.current.precipitation} mm</Text>
                </View>
              </View>
            </View>

            {/* NEW: AI SMART TIP CARD */}
            {aiTip && (
              <View style={styles.tipCard}>
                <Text style={styles.tipTitle}>🌾 {i18n.locale === 'te'? 'AI రైతు సలహా' : 'AI Farmer Tip'}</Text>
                <Text style={styles.tipText}>{aiTip}</Text>
              </View>
            )}

            {/* 24 HOUR FORECAST */}
            <Text style={styles.sectionTitle}>{i18n.t('hourForecast')}</Text>
            <FlatList
              data={weather.hourly.time.slice(0, 24)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 15}}
              keyExtractor={(item) => item}
              renderItem={({item, index}) => (
                <View style={styles.hourCard}>
                  <Text style={styles.hourText}>{index === 0? i18n.t('now') : new Date(item).getHours() + ' PM'}</Text>
                  <Ionicons name={getWeatherIcon(weather.hourly.weathercode[index]) as any} size={30} color="#FFC107" />
                  <Text style={styles.hourTemp}>{Math.round(weather.hourly.temperature_2m[index])}°</Text>
                </View>
              )}
            />

            {/* 10 DAY FORECAST */}
            <View style={styles.dailyCard}>
              <Text style={styles.sectionTitle}>{i18n.t('dayForecast')}</Text>
              {weather.daily.time.map((day: string, index: number) => (
                <View key={day} style={styles.dayRow}>
                  <Text style={styles.dayName}>{index === 0? i18n.t('today') : new Date(day).toLocaleDateString(i18n.locale, {weekday: 'short'})}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="water" size={14} color="#2196F3" />
                    <Text style={styles.rainText}> {weather.daily.precipitation_probability_max[index]}%</Text>
                  </View>
                  <Text style={styles.dayTemp}>{Math.round(weather.daily.temperature_2m_max[index])}° / <Text style={{color: 'gray'}}>{Math.round(weather.daily.temperature_2m_min[index])}°</Text></Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)')}>
          <Ionicons name="home-outline" size={24} color="gray" />
          <Text style={styles.navText}>{i18n.t('home')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.aiBtn}>
          <Ionicons name="leaf" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/profile')}>
          <Ionicons name="person-outline" size={24} color="gray" />
          <Text style={styles.navText}>{i18n.t('profile')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD' },
  header: { backgroundColor: '#2196F3', padding: 15, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white', fontStyle: 'italic' },
  fetchCard: { backgroundColor: 'white', margin: 20, padding: 30, borderRadius: 20, alignItems: 'center', elevation: 3 },
  fetchTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 15 },
  fetchDesc: { fontSize: 12, color: 'gray', textAlign: 'center', marginTop: 8, marginBottom: 20 },
  fetchBtn: { backgroundColor: '#2196F3', width: '100%', padding: 15, borderRadius: 12, alignItems: 'center' },
  fetchBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold', fontStyle: 'italic' },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
  currentCard: { backgroundColor: '#2196F3', margin: 15, padding: 20, borderRadius: 20 },
  locationText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  tempText: { fontSize: 48, fontWeight: 'bold', color: 'white', marginTop: 10 },
  conditionText: { fontSize: 16, color: 'white', fontStyle: 'italic' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'rgba(0,0,0,0.2)', padding: 12, borderRadius: 12, marginTop: 15 },
  statItem: { alignItems: 'center' },
  statLabel: { color: 'white', fontSize: 10, marginTop: 2 },
  statValue: { color: 'white', fontWeight: 'bold', marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 15, marginTop: 10, marginBottom: 10 },
  hourCard: { backgroundColor: 'white', padding: 12, borderRadius: 12, marginRight: 10, alignItems: 'center', width: 70, elevation: 2 },
  hourText: { fontSize: 12, color: 'gray' },
  hourTemp: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  dailyCard: { backgroundColor: 'white', margin: 15, padding: 15, borderRadius: 15, elevation: 2 },
  dayRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' },
  dayName: { fontSize: 15, fontWeight: '600' },
  rainText: { color: '#2196F3', fontWeight: 'bold' },
  dayTemp: { fontSize: 15, fontWeight: 'bold' },
  // NEW STYLES
  tipCard: { backgroundColor: '#E8F5E9', margin: 15, padding: 15, borderRadius: 15, borderLeftWidth: 4, borderColor: '#4CAF50' },
  tipTitle: { fontSize: 16, fontWeight: 'bold', color: '#2E7D32', marginBottom: 8 },
  tipText: { fontSize: 14, color: '#333', lineHeight: 20 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 10 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 4 },
  aiBtn: { width: 65, height: 65, borderRadius: 32, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', marginTop: -20, elevation: 8 }
});
