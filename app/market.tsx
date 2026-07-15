import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const GEMINI_API_KEY = "AQ.Ab8RN6K5123hCBEdWoc-6e4xcdxWMXlprZTosAU32fPMGmkPOg";

export default function MarketScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [marketData, setMarketData] = useState<any[]>([]);
  const [locationName, setLocationName] = useState('Detecting...');
  const [lastUpdated, setLastUpdated] = useState('');

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status!== 'granted') return 'Tirupati';
    let loc = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(loc.coords);
    const place = address[0].city || address[0].district || 'Tirupati';
    setLocationName(place);
    return place;
  }

  const fetchMarketPrices = async () => {
    setLoading(true);
    const place = await getLocation();
    const today = new Date().toLocaleDateString('en-IN');

    // IPUDU ANNI CROPS ADUGUTHUNNA
    const prompt = `
    You are an expert Agriculture Market Analyst for India 2026.
    Get TODAY'S ${today} exact market prices for ALL major crops in ${place} APMC Mandi, India.

    Return ONLY valid JSON array. Include minimum 15-20 crops that are sold in ${place} mandi.
    Format:
    [
      {
        "crop_name": "Cotton",
        "crop_name_tel": "పత్తి",
        "min_price": 7200,
        "max_price": 7800,
        "avg_price": 7500,
        "unit": "per Quintal",
        "trend": "up",
        "category": "Commercial"
      }
    ]
    Rules:
    1. Use live Google Search for ${place} mandi. Prices must be 100% accurate for today.
    2. Include Cereals, Pulses, Vegetables, Fruits, Commercial crops. Minimum 15 crops.
    3. Prices in INR per Quintal. For vegetables use per Kg if needed.
    4. crop_name_tel must be in Telugu.
    5. trend = "up", "down", "stable".
    6. If ${place} data not found, use nearest district mandi.
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          tools: [{ "google_search": {} }]
        })
      });

      const data = await response.json();
      const jsonText = data.candidates[0].content.parts[0].text;
      const cleanJson = jsonText.replace(/```json/g, '').replace(/```/g, '');
      setMarketData(JSON.parse(cleanJson));
      setLastUpdated(new Date().toLocaleString('en-IN'));
    } catch (err) {
      alert('Market data fetch avvaledu');
      console.log(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMarketPrices();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMarketPrices();
  };

  const getTrend = (trend: string) => {
    if(trend === 'up') return <Ionicons name="trending-up" size={18} color="#4CAF50" />
    if(trend === 'down') return <Ionicons name="trending-down" size={18} color="#F44336" />
    return <Ionicons name="remove" size={18} color="gray" />
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FF8F00', '#E65100']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="white" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Market Prices</Text>
        <TouchableOpacity onPress={fetchMarketPrices}><Ionicons name="refresh" size={24} color="white" /></TouchableOpacity>
      </LinearGradient>

      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.infoBox}>
          <MaterialIcons name="my-location" size={18} color="#E65100" />
          <View>
            <Text style={styles.infoText}>{locationName} APMC Mandi</Text>
            <Text style={styles.updatedText}>Last Updated: {lastUpdated} | {marketData.length} Crops</Text>
          </View>
        </View>

        {loading? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#E65100" />
            <Text style={styles.loadingText}>All crops rates fetch chestondi...</Text>
          </View>
        ) : (
          <View style={styles.cardContainer}>
            {marketData.map((item, index) => (
              <View key={index} style={styles.priceCard}>
                <View style={styles.cardHeader}>
                  <View style={{flex: 1}}>
                    <Text style={styles.cropName}>{item.crop_name_tel}</Text>
                    <Text style={styles.cropNameEng}>{item.crop_name} • {item.category}</Text>
                  </View>
                  {getTrend(item.trend)}
                </View>
                <Text style={styles.avgPrice}>₹{item.avg_price} <Text style={styles.unit}>/{item.unit}</Text></Text>
                <View style={styles.priceRow}>
                  <View><Text style={styles.priceLabel}>Min</Text><Text style={styles.minPrice}>₹{item.min_price}</Text></View>
                  <View><Text style={styles.priceLabel}>Max</Text><Text style={styles.maxPrice}>₹{item.max_price}</Text></View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF3E0' },
  header: { padding: 15, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  infoBox: { flexDirection: 'row', alignItems: 'center', gap: 10, margin: 15, backgroundColor: 'white', padding: 12, borderRadius: 12, elevation: 2 },
  infoText: { fontSize: 14, fontWeight: 'bold', color: '#E65100' },
  updatedText: { fontSize: 11, color: 'gray' },
  loadingBox: { alignItems: 'center', marginTop: 50 },
  loadingText: { marginTop: 10, fontSize: 14, color: '#E65100' },
  cardContainer: { paddingHorizontal: 15, paddingBottom: 20 },
  priceCard: { backgroundColor: 'white', padding: 15, borderRadius: 15, marginBottom: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  cropName: { fontSize: 16, fontWeight: 'bold', color: '#1B5E20' },
  cropNameEng: { fontSize: 11, color: 'gray' },
  avgPrice: { fontSize: 22, fontWeight: 'bold', color: '#E65100', marginVertical: 8 },
  unit: { fontSize: 12, color: 'gray', fontWeight: 'normal' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F5F5F5', paddingTop: 8 },
  priceLabel: { fontSize: 11, color: 'gray' },
  minPrice: { fontSize: 14, fontWeight: 'bold', color: '#D32F2F', marginTop: 2 },
  maxPrice: { fontSize: 14, fontWeight: 'bold', color: '#2E7D32', marginTop: 2 },
});
