import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import i18n from '../i18n'; // i18n import

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY; // SECURE

export default function PestScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('chemical');

  const pickImage = async (fromCamera: boolean) => {
    let result = fromCamera
    ? await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.8, base64: true })
      : await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 0.8, base64: true });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeImage(result.assets[0].base64!);
    }
  };

  const analyzeImage = async (base64: string) => {
    if(!GEMINI_API_KEY){
      Alert.alert("Error", "API Key missing. EAS Secret lo set cheyi");
      return;
    }

    setLoading(true);
    setResult(null);

    const prompt = `
    You are an expert AI Plant Pathologist and Entomologist from India.
    Analyze this plant leaf image and identify the pest or disease.
    Return ONLY a valid JSON object in 5 languages: Telugu, Hindi, Tamil, Kannada, English.
    {
      "identified_issue": {
        "en": "Rice Blast",
        "te": "వరి బ్లాస్ట్",
        "hi": "धान ब्लास्ट",
        "ta": "நெல் வெடிப்பு",
        "kn": "ಭತ್ತದ ಬ್ಲಾಸ್ಟ್"
      },
      "confidence_score": "85%",
      "symptoms": {
        "en": ["Brown spots on leaves", "Lesions with gray center"],
        "te": ["ఆకులపై గోధుమ రంగు మచ్చలు", "బూడిద రంగు మధ్యతో గాయాలు"],
        "hi": ["पत्तियों पर भूरे धब्बे", "भूरे केंद्र वाले घाव"],
        "ta": ["இலைகளில் பழுப்பு புள்ளிகள்", "சாம்பல் மையத்துடன் காயங்கள்"],
        "kn": ["ಎಲೆಗಳ ಮೇಲೆ ಕಂದು ಚುಕ್ಕೆಗಳು", "ಬೂದು ಮಧ್ಯದೊಂದಿಗೆ ಗಾಯಗಳು"]
      },
      "solutions": {
        "chemical_control": {
          "en": ["Tricyclazole 75% WP - 2g per liter", "Hexaconazole 5% EC - 2ml per liter"],
          "te": ["ట్రైసైక్లజోల్ 75% WP - లీటరుకు 2గ్రా", "హెక్సాకోనజోల్ 5% EC - లీటరుకు 2మి.లీ"],
          "hi": ["ट्राइसाइक्लाज़ोल 75% WP - प्रति लीटर 2ग्रा", "हेक्साकोनाज़ोल 5% EC - प्रति लीटर 2मिली"],
          "ta": ["ட்ரைசைக்ளசோல் 75% WP - லிட்டருக்கு 2கிராம்", "ஹெக்சாகோனசோல் 5% EC - லிட்டருக்கு 2மிலி"],
          "kn": ["ಟ್ರೈಸೈಕ್ಲಜೋಲ್ 75% WP - ಲೀಟರ್‌ಗೆ 2ಗ್ರಾಂ", "ಹೆಕ್ಸಾಕೋನಜೋಲ್ 5% EC - ಲೀಟರ್‌ಗೆ 2ಮಿಲಿ"]
        },
        "organic_control": {
          "en": ["Neem oil 5ml per liter spray", "3G Kashayam spray"],
          "te": ["వేప నూనె లీటరుకు 5మి.లీ స్ప్రే", "3G కషాయం స్ప్రే"],
          "hi": ["नीम का तेल प्रति लीटर 5मिली स्प्रे", "3G कषाय स्प्रे"],
          "ta": ["வேப்ப எண்ணெய் லிட்டருக்கு 5மிலி தெளிப்பு", "3G கஷாயம் தெளிப்பு"],
          "kn": ["ಬೇವಿನ ಎಣ್ಣೆ ಲೀಟರ್‌ಗೆ 5ಮಿಲಿ ಸ್ಪ್ರೇ", "3G ಕಷಾಯ ಸ್ಪ್ರೇ"]
        }
      },
      "prevention_tips": {
        "en": ["Crop rotation", "Avoid water stagnation"],
        "te": ["పంట మార్పిడి చేయడం", "పొలంలో నీరు నిల్వ ఉండకుండా చూడడం"],
        "hi": ["फसल चक्रण", "खेत में पानी जमा न होने दें"],
        "ta": ["பயிர் சுழற்சி", "வயலில் தண்ணீர் தேங்காமல் பார்த்துக்கொள்ளவும்"],
        "kn": ["ಬೆಳೆ ಸರದಿ", "ಗದ್ದೆಯಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ"]
      }
    }
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: "image/jpeg", data: base64 } }
            ]
          }]
        })
      });

      const data = await response.json();
      const jsonText = data.candidates[0].content.parts[0].text;
      const cleanJson = jsonText.replace(/```json/g, '').replace(/```/g, '');
      setResult(JSON.parse(cleanJson));
    } catch (err) {
      Alert.alert("Error", i18n.t('analysisFailed'));
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Language batti data select cheyadam
  const lang = i18n.locale as 'en' | 'te' | 'hi' | 'ta' | 'kn';
  const getText = (obj: any) => obj?.[lang] || obj?.['en'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="white" /></TouchableOpacity>
        <Text style={styles.headerTitle}>{i18n.t('pestScan')}</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        {!image && (
          <View style={styles.scanCard}>
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png'}} style={styles.cameraIcon} />
            <Text style={styles.scanTitle}>{i18n.t('identifyPests')}</Text>
            <Text style={styles.scanDesc}>{i18n.t('scanDesc')}</Text>

            <TouchableOpacity style={styles.scanBtn} onPress={() => pickImage(true)}>
              <Text style={styles.scanBtnText}>{i18n.t('scanCrop')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.galleryBtn} onPress={() => pickImage(false)}>
              <Text style={styles.galleryBtnText}>{i18n.t('selectGallery')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#D32F2F" />
            <Text style={styles.loadingText}>{i18n.t('detecting')}</Text>
          </View>
        )}

        {result && image && (
          <View>
            <View style={styles.imageRow}>
              <View style={styles.imgBox}>
                <Text style={styles.imgLabel}>{i18n.t('yourPhoto')}</Text>
                <Image source={{uri: image}} style={styles.resultImage} />
              </View>
              <View style={styles.imgBox}>
                <Text style={styles.imgLabel}>{i18n.t('reference')}</Text>
                <Image source={{uri: 'https://www.icar.org.in/sites/default/files/rice-blast-disease.jpg'}} style={styles.resultImage} />
              </View>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.issueName}>{getText(result.identified_issue)}</Text>
              <Text style={styles.confidence}>{i18n.t('accuracy')}: {result.confidence_score}</Text>

              <Text style={styles.sectionHeader}>{i18n.t('symptoms')}</Text>
              {getText(result.symptoms)?.map((s: string, i: number) => <Text key={i} style={styles.bullet}>• {s}</Text>)}

              <View style={styles.tabRow}>
                <TouchableOpacity onPress={() => setActiveTab('chemical')} style={[styles.tab, activeTab==='chemical' && styles.activeTab]}>
                  <Text style={activeTab==='chemical'? styles.activeTabText : styles.tabText}>{i18n.t('chemical')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('organic')} style={[styles.tab, activeTab==='organic' && styles.activeTab]}>
                  <Text style={activeTab==='organic'? styles.activeTabText : styles.tabText}>{i18n.t('organic')}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.solutionBox}>
                {activeTab === 'chemical' && getText(result.solutions.chemical_control)?.map((s: string, i: number) => <Text key={i} style={styles.solutionText}>🌿 {s}</Text>)}
                {activeTab === 'organic' && getText(result.solutions.organic_control)?.map((s: string, i: number) => <Text key={i} style={styles.solutionText}>🍃 {s}</Text>)}
              </View>

              <Text style={styles.sectionHeader}>{i18n.t('prevention')}</Text>
              {getText(result.prevention_tips)?.map((p: string, i: number) => <Text key={i} style={styles.bullet}>✓ {p}</Text>)}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)')}><Ionicons name="home-outline" size={24} color="gray" /><Text style={styles.navText}>{i18n.t('home')}</Text></TouchableOpacity>
        <TouchableOpacity style={styles.aiBtn}><Ionicons name="leaf" size={28} color="white" /></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/profile')}><Ionicons name="person-outline" size={24} color="gray" /><Text style={styles.navText}>{i18n.t('profile')}</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFEBEE' },
  header: { backgroundColor: '#D32F2F', padding: 15, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  scanCard: { backgroundColor: 'white', margin: 20, padding: 30, borderRadius: 20, alignItems: 'center', elevation: 3 },
  cameraIcon: { width: 80, height: 80, marginBottom: 15 },
  scanTitle: { fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', marginBottom: 8 },
  scanDesc: { fontSize: 14, color: 'gray', textAlign: 'center', marginBottom: 20 },
  scanBtn: { backgroundColor: '#D32F2F', width: '100%', padding: 16, borderRadius: 12, alignItems: 'center' },
  scanBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold', fontStyle: 'italic' },
  galleryBtn: { marginTop: 12 },
  galleryBtnText: { color: '#D32F2F', fontWeight: '600' },
  loadingBox: { alignItems: 'center', marginTop: 50 },
  loadingText: { marginTop: 10, fontSize: 16, fontWeight: 'bold', color: '#D32F2F' },
  imageRow: { flexDirection: 'row', padding: 15, gap: 10 },
  imgBox: { flex: 1 },
  imgLabel: { fontSize: 12, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  resultImage: { width: '100%', height: 150, borderRadius: 12 },
  resultCard: { backgroundColor: 'white', margin: 15, padding: 15, borderRadius: 12, elevation: 2 },
  issueName: { fontSize: 20, fontWeight: 'bold', color: '#D32F2F' },
  confidence: { fontSize: 12, color: 'gray', marginBottom: 10 },
  sectionHeader: { fontSize: 15, fontWeight: 'bold', marginTop: 12, marginBottom: 6 },
  bullet: { fontSize: 13, marginLeft: 5, marginBottom: 4 },
  tabRow: { flexDirection: 'row', marginTop: 10, backgroundColor: '#F5F5F5', borderRadius: 8 },
  tab: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: '#D32F2F' },
  tabText: { color: 'gray', fontWeight: '600' },
  activeTabText: { color: 'white', fontWeight: 'bold' },
  solutionBox: { marginVertical: 10 },
  solutionText: { fontSize: 13, marginBottom: 6 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 10 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 4 },
  aiBtn: { width: 65, height: 65, borderRadius: 32, backgroundColor: '#D32F2F', justifyContent: 'center', alignItems: 'center', marginTop: -20, elevation: 8 }
});
