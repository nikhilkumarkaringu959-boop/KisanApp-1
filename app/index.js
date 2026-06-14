// app/index.js
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Leaf } from 'lucide-react-native';

const languages = [
  { name: 'English', native: 'English' },
  { name: 'Telugu', native: 'తెలుగు' },
  { name: 'Tamil', native: 'தமிழ்' },
  { name: 'Hindi', native: 'हिंदी' },
  { name: 'Kannada', native: 'ಕನ್ನಡ' },
];

export default function LanguageScreen() {
  const router = useRouter();

  const selectLanguage = async (lang) => {
    await AsyncStorage.setItem('userLanguage', lang.name);
    router.replace('/farmer-profile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Leaf color="#22C55E" size={36} strokeWidth={2} />
      </View>

      <Text style={styles.title}>Welcome to KISAN</Text>
      <Text style={styles.subtitle}>Select your preferred language</Text>

      <View style={styles.list}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.name}
            style={styles.langBtn}
            onPress={() => selectLanguage(lang)}
            activeOpacity={0.7}
          >
            <Text style={styles.langName}>{lang.name}</Text>
            <Text style={styles.langNative}>{lang.native}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    justifyContent: 'center'
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F0FDF4',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1B4332',
    textAlign: 'center',
    fontFamily: 'System'
  },
  subtitle: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 40,
    fontStyle: 'italic'
  },
  list: { gap: 14 },
  langBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }
  },
  langName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B'
  },
  langNative: {
    fontSize: 17,
    fontWeight: '700',
    color: '#22C55E'
  },
});
