import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Leaf } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS } from '../../constants/Theme';

export default function LanguageScreen() {
  const router = useRouter();
  const languages = [
    { name: 'English', native: 'English' },
    { name: 'Telugu', native: 'తెలుగు' },
    { name: 'Tamil', native: 'தமிழ்' },
    { name: 'Hindi', native: 'हिंदी' },
    { name: 'Kannada', native: 'ಕನ್ನಡ' },
  ];

  const selectLanguage = async (lang) => {
    await AsyncStorage.setItem('language', lang);
    router.push('/screens/FarmerProfile');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.logoCircle}>
        <Leaf size={40} color={COLORS.primaryLight} strokeWidth={2.5} />
      </View>
      <Text style={styles.title}>{FONTS.welcome}</Text>
      <Text style={styles.subtitle}>{FONTS.language}</Text>
      {languages.map((lang, i) => (
        <TouchableOpacity key={i} style={styles.langCard} onPress={() => selectLanguage(lang.name)}>
          <Text style={styles.langLeft}>{lang.name}</Text>
          <Text style={styles.langRight}>{lang.native}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 24, alignItems: 'center', paddingTop: 100 },
  logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.leafBg, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  title: { fontSize: 32, fontWeight: '700', color: COLORS.primary, marginBottom: 8 },
  subtitle: { fontSize: 14, color: COLORS.textLight, marginBottom: 40 },
  langCard: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.card, paddingVertical: 18, paddingHorizontal: 20, borderRadius: 12, marginBottom: 12, elevation: 2 },
  langLeft: { fontSize: 18, fontWeight: '600', color: COLORS.text },
  langRight: { fontSize: 18, fontWeight: '600', color: COLORS.primaryLight },
});
