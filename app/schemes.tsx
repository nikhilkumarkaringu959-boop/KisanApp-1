import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

const GEMINI_API_KEY = "AQ.Ab8RN6LeixmRq8HhjOFaiqZFMHFMP43Ir0sO4mcbwfTR2oB41Q";

const states = [
  { id: 'Telangana', name: 'Telangana', nameTel: 'తెలంగాణ' },
  { id: 'Andhra Pradesh', name: 'Andhra Pradesh', nameTel: 'ఆంధ్రప్రదేశ్' },
  { id: 'Karnataka', name: 'Karnataka', nameTel: 'కర్ణాటక' },
  { id: 'Tamil Nadu', name: 'Tamil Nadu', nameTel: 'తమిళనాడు' }
];

export default function SchemesScreen() {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState('Telangana');
  const [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState<any[]>([]);

  // GEMINI + GOOGLE SEARCH API CALL
  const fetchGovtSchemes = async () => {
    setLoading(true);
    setSchemes([]);

    const prompt = `
    You are an expert Government Schemes Advisor for Indian Agriculture 2026.
    State: ${selectedState}. Current Year: 2026.
    Use live Google Search to get latest, factual updates. No fake news.
    
    Return ONLY a valid JSON array of 2-3 main schemes for ${selectedState}:
    [
      {
        "scheme_name": "Official name in English / Regional language",
        "latest_status_2026": "Latest update with date",
        "eligibility_and_benefits": ["Point 1", "Point 2", "Point 3"],
        "required_documents": ["Aadhaar Card", "Bank Passbook", "Land Passbook"],
        "official_links": ["https://official.gov.in/link1", "https://official.gov.in/link2"]
      }
    ]
    For Telangana: Must include RythuBharosa and RunaMaaphee
    For AP: Must include YSR RythuBharosa and Input Subsidy  
    For Karnataka: Must include PM-KISAN and Crop Insurance
    For Tamil Nadu: Must include Crop Loan Waiver and Input Subsidy
    Keep language simple and factual.
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          tools: [{ "google_search": {} }] // Live search enable
        })
      });

      const data = await response.json();
      const jsonText = data.candidates[0].content.parts[0].text;
      const cleanJson = jsonText.replace(/```json/g, '').replace(/```/g, '');
      setSchemes(JSON.parse(cleanJson));
    } catch (err) {
      alert('Official data fetch avvaledu. Malli try chey.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => alert('Link open avvaledu'));
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient colors={['#1565C0', '#0D47A1']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="white" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Govt Schemes & Updates</Text>
        <Ionicons name="document-text" size={24} color="white" />
      </LinearGradient>

      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        
        {/* STATE DROPDOWN */}
        <View style={styles.dropdownCard}>
          <Text style={styles.label}>మీ రాష్ట్రాన్ని ఎంచుకోండి</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedState}
              onValueChange={(itemValue) => setSelectedState(itemValue)}
              style={styles.picker}
            >
              {states.map(state => (
                <Picker.Item key={state.id} label={`${state.nameTel} - ${state.name}`} value={state.id} />
              ))}
            </Picker>
          </View>

          {/* CHECK BUTTON */}
          <TouchableOpacity style={styles.checkBtn} onPress={fetchGovtSchemes}>
            <LinearGradient colors={['#2E7D32', '#1B5E20']} style={styles.btnGradient}>
              <Ionicons name="business" size={20} color="white" />
              <Text style={styles.checkBtnText}>Check Govt Schemes & Updates</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#1565C0" />
            <Text style={styles.loadingText}>ప్రభుత్వ అధికారిక సమాచారాన్ని సేకరిస్తోంది...</Text>
          </View>
        )}

        {/* RESULTS DASHBOARD */}
        {schemes.length > 0 && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultHeader}>{selectedState} - 2026 Latest Updates</Text>
            
            {schemes.map((scheme, index) => (
              <View key={index} style={styles.schemeCard}>
                <View style={styles.cardHeader}>
                  <Ionicons name="document-text" size={22} color="#1565C0" />
                  <Text style={styles.schemeName}>{scheme.scheme_name}</Text>
                </View>

                <View style={styles.statusBox}>
                  <Text style={styles.statusLabel}>Latest Status 2026:</Text>
                  <Text style={styles.statusText}>{scheme.latest_status_2026}</Text>
                </View>

                <Text style={styles.sectionTitle}>Eligibility & Benefits</Text>
                {scheme.eligibility_and_benefits.map((point: string, i: number) => (
                  <Text key={i} style={styles.bullet}>• {point}</Text>
                ))}

                <Text style={styles.sectionTitle}>Required Documents</Text>
                <View style={styles.docRow}>
                  {scheme.required_documents.map((doc: string, i: number) => (
                    <View key={i} style={styles.docTag}><Text style={styles.docText}>{doc}</Text></View>
                  ))}
                </View>

                <Text style={styles.sectionTitle}>Official Links</Text>
                {scheme.official_links.map((link: string, i: number) => (
                  <TouchableOpacity key={i} style={styles.linkBtn} onPress={() => openLink(link)}>
                    <Ionicons name="link" size={16} color="white" />
                    <Text style={styles.linkText}>Go to Official Website {i+1}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/home')}><Ionicons name="home-outline" size={24} color="gray" /><Text style={styles.navText}>Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.aiBtn}><Ionicons name="leaf" size={28} color="white" /></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}><Ionicons name="person-outline" size={24} color="gray" /><Text style={styles.navText}>Profile</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD' },
  header: { padding: 15, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  dropdownCard: { backgroundColor: 'white', margin: 15, padding: 15, borderRadius: 12, elevation: 3 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  pickerWrapper: { backgroundColor: '#F5F5F5', borderRadius: 8 },
  picker: { height: 50 },
  checkBtn: { marginTop: 15, borderRadius: 10, overflow: 'hidden', elevation: 4 },
  btnGradient: { flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center', gap: 8 },
  checkBtnText: { color: 'white', fontSize: 15, fontWeight: 'bold' },
  loadingBox: { alignItems: 'center', marginTop: 30 },
  loadingText: { marginTop: 10, fontSize: 14, fontWeight: 'bold', color: '#1565C0' },
  resultContainer: { paddingHorizontal: 15 },
  resultHeader: { fontSize: 16, fontWeight: 'bold', color: '#0D47A1', marginBottom: 10 },
  schemeCard: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 15, elevation: 3 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  schemeName: { fontSize: 15, fontWeight: 'bold', color: '#1565C0', flex: 1 },
  statusBox: { backgroundColor: '#E8F5E9', padding: 10, borderRadius: 8, marginBottom: 10 },
  statusLabel: { fontSize: 12, fontWeight: 'bold', color: '#2E7D32' },
  statusText: { fontSize: 13, marginTop: 4 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginTop: 10, marginBottom: 6 },
  bullet: { fontSize: 13, marginBottom: 4, marginLeft: 5 },
  docRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  docTag: { backgroundColor: '#FFF3E0', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 },
  docText: { fontSize: 12, color: '#E65100' },
  linkBtn: { flexDirection: 'row', backgroundColor: '#1565C0', padding: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8 },
  linkText: { color: 'white', fontSize: 13, fontWeight: 'bold' },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 10 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 4 },
  aiBtn: { width: 65, height: 65, borderRadius: 32, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', marginTop: -20, elevation: 8 }
});
