import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'te', name: 'Telugu (తెలుగు)' },
  { code: 'ta', name: 'Tamil (தமிழ்)' },
  { code: 'hi', name: 'Hindi (हिंदी)' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
];

export default function LanguageScreen() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  // App open ayyaka already language select chesinda check cheyadam
  useEffect(() => {
    checkLanguage();
  }, []);

  const checkLanguage = async () => {
    const savedLang = await AsyncStorage.getItem('appLanguage');
    if (savedLang) {
      router.replace('/home'); // Already select cheste direct home ki
    } else {
      setChecking(false);
    }
  }

  const selectLanguage = async (langCode: string) => {
    await AsyncStorage.setItem('appLanguage', langCode);
    router.replace('/home'); // Select chesaka home ki
  }

  if (checking) return null;

  return (
    <View style={styles.container}>
      {/* LOGO */}
      <View style={styles.logoCircle}>
        <Ionicons name="leaf" size={50} color="white" />
      </View>

      <Text style={styles.title}>KISAN</Text>
      <Text style={styles.subtitle}>The Smart Farming Assistant</Text>
      
      <Text style={styles.selectText}>Please select your language</Text>
      <Text style={styles.selectTextTel}>దయచేసి మీ భాషను ఎంచుకోండి</Text>

      {/* LANGUAGE BUTTONS */}
      {languages.map((lang) => (
        <TouchableOpacity 
          key={lang.code} 
          style={styles.langBtn} 
          onPress={() => selectLanguage(lang.code)}
        >
          <Text style={styles.langText}>{lang.name}</Text>
        </TouchableOpacity>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#E8F5E9', 
    alignItems: 'center', 
    paddingTop: 80, 
    paddingHorizontal: 20 
  },
  logoCircle: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: '#4CAF50', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 15,
    elevation: 5
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#1B5E20' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#2E7D32', 
    marginBottom: 30 
  },
  selectText: { 
    fontSize: 14, 
    color: '#555', 
    marginBottom: 5 
  },
  selectTextTel: { 
    fontSize: 14, 
    color: '#555', 
    marginBottom: 25 
  },
  langBtn: { 
    width: '100%', 
    backgroundColor: 'white', 
    padding: 16, 
    borderRadius: 12, 
    borderWidth: 2, 
    borderColor: '#4CAF50', 
    marginBottom: 12, 
    alignItems: 'center' 
  },
  langText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#2E7D32' 
  }
});
