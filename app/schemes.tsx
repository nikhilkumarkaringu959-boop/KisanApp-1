import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import i18n from '../i18n'; // i18n import

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY; // SECURE

const states = [
  { id: 'Telangana', name: 'Telangana', nameTel: 'తెలంగాణ', nameHi: 'तेलंगाना', nameTa: 'தெலங்கானா', nameKn: 'ತೆಲಂಗಾಣ' },
  { id: 'Andhra Pradesh', name: 'Andhra Pradesh', nameTel: 'ఆంధ్రప్రదేశ్', nameHi: 'आंध्र प्रदेश', nameTa: 'ஆந்திர பிரதேசம்', nameKn: 'ಆಂಧ್ರ ಪ್ರದೇಶ' },
  { id: 'Karnataka', name: 'Karnataka', nameTel: 'కర్ణాటక', nameHi: 'कर्नाटक', nameTa: 'கர்நாடகா', nameKn: 'ಕರ್ನಾಟಕ' },
  { id: 'Tamil Nadu', name: 'Tamil Nadu', nameTel: 'తమిళనాడు', nameHi: 'तमिलनाडु', nameTa: 'தமிழ்நாடு', nameKn: 'ತಮಿಳುನಾಡು' }
];

export default function SchemesScreen() {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState('Telangana');
  const [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState<any[]>([]);

  const lang = i18n.locale as 'en' | 'te' | 'hi' | 'ta' | 'kn';

  const getStateName = (stateId: string) => {
    const state = states.find(s => s.id === stateId);
    if(lang === 'te') return state?.nameTel;
    if(lang === 'hi') return state?.nameHi;
    if(lang === 'ta') return state?.nameTa;
    if(lang === 'kn') return state?.nameKn;
    return state?.name;
  }

  const getText = (obj: any) => obj?.[lang] || obj?.['en'];
  const getList = (obj: any) => obj?.[lang] || obj?.['en'] || [];

  const fetchGovtSchemes = async () => {
    if(!GEMINI_API_KEY){
      alert("API Key missing. EAS Secret lo set cheyi");
      return;
    }

    setLoading(true);
    setSchemes([]);

    const prompt = `
    You are an expert Government Schemes Advisor for Indian Agriculture 2026.
    State: ${selectedState}. Current Year: 2026.
    Use live Google Search to get latest, factual updates. No fake news.

    Return ONLY a valid JSON array of 2-3 main schemes for ${selectedState}:
    [
      {
        "scheme_name": {
          "en": "Official name",
          "te": "Telugu name",
          "hi": "Hindi name",
          "ta": "Tamil name",
          "kn": "Kannada name"
        },
        "latest_status_2026": {
          "en": "Latest update",
          "te": "Telugu update",
          "hi": "Hindi update",
          "ta": "Tamil update",
          "kn": "Kannada update"
        },
        "eligibility_and_benefits": {
          "en": ["Point 1", "Point 2"],
          "te": ["Point 1", "Point 2"],
          "hi": ["Point 1", "Point 2"],
          "ta": ["Point 1", "Point 2"],
          "kn": ["Point 1", "Point 2"]
        },
        "required_documents": ["Aadhaar Card", "Bank Passbook", "Land Passbook"],
        "official_links": ["https://official.gov.in/link1"]
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
          tools: [{ "google_search": {} }]
        })
      });

      const data = await response.json();
      const jsonText = data.candidates[0].content.parts[0].text;
      const cleanJson = jsonText.replace(/```json/g, '').replace(/```/g, '');
      setSchemes(JSON.parse(cleanJson));
    } catch (err) {
      alert(i18n.t('schemesFetchError'));
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => alert('Link open avvaledu'));
  };

  return (
    <LinearGradient colors={['#E8F5E9', '#FFFFFF']} style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{i18n.t('govtSchemes')}</Text>

        <View style={styles.card}>
          <Text style={styles.label}>{i18n.t('selectState')}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedState}
              onValueChange={(itemValue) => setSelectedState(itemValue)}
            >
              {states.map(state => (
                <Picker.Item key={state.id} label={getStateName(state.id)} value={state.id} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity style={styles.button} onPress={fetchGovtSchemes} disabled={loading}>
            {loading? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{i18n.t('checkSchemes')}</Text>}
          </TouchableOpacity>
        </View>

        {loading && <Text style={styles.infoText}>{i18n.t('fetchingSchemes')}</Text>}

        {schemes.map((scheme, index) => (
          <View key={index} style={styles.schemeCard}>
            <Text style={styles.schemeName}>{getText(scheme.scheme_name)}</Text>
            <Text style={styles.status}>{getText(scheme.latest_status_2026)}</Text>

            <Text style={styles.subTitle}>{i18n.t('eligibility')}</Text>
            {getList(scheme.eligibility_and_benefits).map((item: string, i: number) => (
              <Text key={i} style={styles.listItem}>• {item}</Text>
            ))}

            <Text style={styles.subTitle}>{i18n.t('documents')}</Text>
            {scheme.required_documents.map((doc: string, i: number) => (
              <Text key={i} style={styles.listItem}>• {doc}</Text>
            ))}

            <Text style={styles.subTitle}>{i18n.t('officialLinks')}</Text>
            {scheme.official_links.map((link: string, i: number) => (
              <TouchableOpacity key={i} onPress={() => openLink(link)}>
                <Text style={styles.link}>{i18n.t('goToWebsite')}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#1B5E20' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, marginBottom: 20, elevation: 3 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, marginBottom: 15 },
  button: { backgroundColor: '#2E7D32', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  infoText: { textAlign: 'center', marginVertical: 20, fontSize: 16 },
  schemeCard: { backgroundColor: '#fff', padding: 20, borderRadius: 15, marginBottom: 15, elevation: 2 },
  schemeName: { fontSize: 20, fontWeight: 'bold', color: '#2E7D32', marginBottom: 10 },
  status: { fontSize: 14, color: '#555', marginBottom: 15 },
  subTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 5 },
  listItem: { fontSize: 14, marginLeft: 10, marginBottom: 3 },
  link: { color: '#1976D2', textDecorationLine: 'underline', marginBottom: 5 }
});
