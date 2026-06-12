import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Leaf } from 'lucide-react-native';
import { useProfile } from '../Context/ProfileContext';
export default function LanguageScreen({ navigation }) {
  const { updateProfile } = useProfile();

  const selectLang = (lang) => {
    updateProfile('language', lang);
    navigation.navigate('ONBOARDING');
  };

  const LangBtn = ({eng, native, code}) => (
    <TouchableOpacity style={styles.langCard} onPress={() => selectLang(code)}>
      <Text style={styles.langEng}>{eng}</Text>
      <Text style={styles.langNative}>{native}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Leaf color="#4CAF50" size={50} />
      </View>
      <Text style={styles.title}>Welcome to KISAN</Text>
      <Text style={styles.subtitle}>Select your preferred language</Text>

      <LangBtn eng="English" native="English" code="en" />
      <LangBtn eng="Telugu" native="తెలుగు" code="te" />
      <LangBtn eng="Tamil" native="தமிழ்" code="ta" />
      <LangBtn eng="Hindi" native="हिंदी" code="hi" />
      <LangBtn eng="Kannada" native="ಕನ್ನಡ" code="kn" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
  logoCircle: { backgroundColor: '#F0FFF4', padding: 20, borderRadius: 60, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#2d5016', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#4a5568', marginBottom: 30 },
  langCard: { backgroundColor: 'white', width: '100%', padding: 18, margin: 6, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', elevation: 2, borderWidth: 1, borderColor: '#eee' },
  langEng: { fontSize: 18, color: '#2d3748', fontWeight: '500' },
  langNative: { fontSize: 18, color: '#4CAF50', fontWeight: '600' },
});
