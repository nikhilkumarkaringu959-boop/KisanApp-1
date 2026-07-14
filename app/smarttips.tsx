import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const GEMINI_API_KEY = "AQ.Ab8RN6LeixmRq8HhjOFaiqZFMHFMP43Ir0sO4mcbwfTR2oB41Q";

// 10 CASH CROPS FULL LIST
const cashCrops = [
  { id: 'Cotton', name: 'Cotton', nameTel: 'పత్తి', icon: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png', desc: 'White Gold' },
  { id: 'Chilli', name: 'Chilli', nameTel: 'మిరప', icon: 'https://cdn-icons-png.flaticon.com/512/415/415733.png', desc: 'Spicy Export' },
  { id: 'Sugarcane', name: 'Sugarcane', nameTel: 'చెరుకు', icon: 'https://cdn-icons-png.flaticon.com/512/2936/2936886.png', desc: 'Sweet Cash' },
  { id: 'Maize', name: 'Maize', nameTel: 'మొక్కజొన్న', icon: 'https://cdn-icons-png.flaticon.com/512/590/590834.png', desc: 'Fodder + Grain' },
  { id: 'Turmeric', name: 'Turmeric', nameTel: 'పసుపు', icon: 'https://cdn-icons-png.flaticon.com/512/590/590830.png', desc: 'Golden Spice' },
  { id: 'Groundnut', name: 'Groundnut', nameTel: 'వేరుశనగ', icon: 'https://cdn-icons-png.flaticon.com/512/415/415736.png', desc: 'Oil Seed' },
  { id: 'Tobacco', name: 'Tobacco', nameTel: 'పొగాకు', icon: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png', desc: 'Commercial' },
  { id: 'Soybean', name: 'Soybean', nameTel: 'సోయాబీన్', icon: 'https://cdn-icons-png.flaticon.com/512/415/415735.png', desc: 'Protein Crop' },
  { id: 'Onion', name: 'Onion', nameTel: 'ఉల్లి', icon: 'https://cdn-icons-png.flaticon.com/512/2909/2909760.png', desc: 'Price King' },
  { id: 'Tomato', name: 'Tomato', nameTel: 'టమాటా', icon: 'https://cdn-icons-png.flaticon.com/512/2909/2909767.png', desc: '90 Days Crop' }
];

export default function SmartTipsScreen() {
  const router = useRouter();
  const [selectedCrop, setSelectedCrop] = useState('Cotton');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const fetchSmartTips = async () => {
    setLoading(true);
    setResult(null);

    const prompt = `
    You are an Advanced AI Agricultural Advisor for High-Yield Cash Crops in India for ${selectedCrop}.

    Return ONLY a valid JSON object in Telugu language, focused on maximizing farmer profits:
    {
      "crop_overview": "1 line profit summary for ${selectedCrop}",
      "smart_sowing_tips": {
        "seed_selection": "best hybrid/seed variety name for ${selectedCrop}",
        "spacing": "exact plant to plant and row to row spacing in cm",
        "soil_prep": "soil preparation to reduce initial cost"
      },
      "water_and_nutrient_efficiency": {
        "irrigation": "drip/furrow schedule for ${selectedCrop}",
        "fertigation": "fertilizer through drip schedule",
        "waste_reduction": "how to reduce fertilizer and water waste"
      },
      "yield_boosting_techniques": [
        "specific technique 1 for ${selectedCrop}",
        "specific technique 2 for ${selectedCrop}",
        "growth regulator or special practice"
      ],
      "market_and_harvest_strategy": {
        "harvest_time": "best harvest time and quality signs",
        "storage": "storage method to avoid loss",
        "market_insight": "MSP vs Market rate and best selling time"
      },
      "profit_multiplier_tip": "1 golden tip to increase ${selectedCrop} profit by 20%"
    }
    Use ICAR and latest data. Keep language simple for farmers.
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      const jsonText = data.candidates[0].content.parts[0].text;
      const cleanJson = jsonText.replace(/```json/g, '').replace(/```/g, '');
      setResult(JSON.parse(cleanJson));
    } catch (err) {
      alert('AI nunchi tips ravatam ledu. Internet check chey.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FFA000', '#FF6F00']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="white" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Smart Farming Tips</Text>
        <Ionicons name="trending-up" size={24} color="white" />
      </LinearGradient>

      <ScrollView contentContainerStyle={{paddingBottom: 100}}>

        <Text style={styles.sectionTitle}>వాణిజ్య పంటలు ఎంచుకోండి - 10 Crops</Text>
        <View style={styles.grid}>
          {cashCrops.map(crop => (
            <TouchableOpacity
              key={crop.id}
              style={[styles.cropCard, selectedCrop === crop.id && styles.selectedCard]}
              onPress={() => setSelectedCrop(crop.id)}
            >
              <Image source={{uri: crop.icon}} style={styles.cropIcon} />
              <Text style={styles.cropName}>{crop.nameTel}</Text>
              <Text style={styles.cropDesc}>{crop.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.smartBtn} onPress={fetchSmartTips}>
          <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.btnGradient}>
            <Ionicons name="sparkles" size={20} color="white" />
            <Text style={styles.smartBtnText}>{selectedCrop} Smart Tips</Text>
          </LinearGradient>
        </TouchableOpacity>

        {loading && (
          <View style={styles.loadingBox}>
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/2936/2936886.png'}} style={styles.growingIcon} />
            <Text style={styles.loadingText}>లాభదాయకమైన చిట్కాలను AI లెక్కిస్తోంది...</Text>
          </View>
        )}

        {result && (
          <View style={styles.resultContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>📊 {selectedCrop} Overview</Text>
              <Text style={styles.cardText}>{result.crop_overview}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>🌱 Smart Sowing Tips</Text>
              <Text style={styles.boldText}>Seed Selection: </Text><Text>{result.smart_sowing_tips.seed_selection}</Text>
              <Text style={styles.boldText}>Plant Spacing: </Text><Text>{result.smart_sowing_tips.spacing}</Text>
              <Text style={styles.boldText}>Soil Preparation: </Text><Text>{result.smart_sowing_tips.soil_prep}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>💧 Water & Nutrient Efficiency</Text>
              <Text style={styles.boldText}>నీటి యాజమాన్యం: </Text><Text>{result.water_and_nutrient_efficiency.irrigation}</Text>
              <Text style={styles.boldText}>Fertigation: </Text><Text>{result.water_and_nutrient_efficiency.fertigation}</Text>
              <Text style={styles.boldText}>Waste Reduction: </Text><Text>{result.water_and_nutrient_efficiency.waste_reduction}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>🚀 Yield Boosting Techniques</Text>
              {result.yield_boosting_techniques.map((tech: string, i: number) => (
                <Text key={i} style={styles.bullet}>• {tech}</Text>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>📈 Market & Harvest Strategy</Text>
              <Text style={styles.boldText}>Harvest Time: </Text><Text>{result.market_and_harvest_strategy.harvest_time}</Text>
              <Text style={styles.boldText}>Storage: </Text><Text>{result.market_and_harvest_strategy.storage}</Text>
              <Text style={styles.boldText}>Market Insight: </Text><Text>{result.market_and_harvest_strategy.market_insight}</Text>
            </View>

            <View style={styles.profitBox}>
              <Ionicons name="cash" size={24} color="#FFD700" />
              <Text style={styles.profitTitle}>Profit Multiplier Tip</Text>
              <Text style={styles.profitText}>{result.profit_multiplier_tip}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/home')}><Ionicons name="home-outline" size={24} color="gray" /><Text style={styles.navText}>Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.aiBtn}><Ionicons name="leaf" size={28} color="white" /></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}><Ionicons name="person-outline" size={24} color="gray" /><Text style={styles.navText}>Profile</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8E1' },
  header: { padding: 15, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', margin: 15, color: '#E65100' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 12 },
  cropCard: { width: '31%', backgroundColor: 'white', borderRadius: 12, padding: 10, alignItems: 'center', marginBottom: 12, elevation: 2, borderWidth: 2, borderColor: 'transparent' },
  selectedCard: { borderColor: '#FFA000', backgroundColor: '#FFF3E0' },
  cropIcon: { width: 40, height: 40, marginBottom: 6 },
  cropName: { fontSize: 13, fontWeight: 'bold', textAlign: 'center' },
  cropDesc: { fontSize: 10, color: 'gray', textAlign: 'center' },
  smartBtn: { margin: 15, borderRadius: 12, overflow: 'hidden', elevation: 4 },
  btnGradient: { flexDirection: 'row', padding: 16, justifyContent: 'center', alignItems: 'center', gap: 8 },
  smartBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  loadingBox: { alignItems: 'center', marginTop: 20 },
  growingIcon: { width: 60, height: 60 },
  loadingText: { marginTop: 10, fontSize: 14, fontWeight: 'bold', color: '#FF6F00' },
  resultContainer: { paddingHorizontal: 15 },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 12, elevation: 2 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#2E7D32', marginBottom: 8 },
  cardText: { fontSize: 13, lineHeight: 20 },
  boldText: { fontSize: 13, fontWeight: 'bold', marginTop: 6 },
  bullet: { fontSize: 13, marginBottom: 5 },
  profitBox: { backgroundColor: '#FFFDE7', borderWidth: 2, borderColor: '#FFD700', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  profitTitle: { fontSize: 16, fontWeight: 'bold', color: '#F57F17', marginVertical: 5 },
  profitText: { fontSize: 13, textAlign: 'center', fontStyle: 'italic' },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 10 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 4 },
  aiBtn: { width: 65, height: 65, borderRadius: 32, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', marginTop: -20, elevation: 8 }
});
