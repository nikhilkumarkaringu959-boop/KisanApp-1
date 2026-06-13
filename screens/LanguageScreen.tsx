import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LanguageContext } from '../contexts/LanguageContext';
import { useNavigation } from '@react-navigation/native';
import { Sprout } from 'lucide-react-native';

export default function LanguageSelectScreen() {
  const navigation = useNavigation();
  const { changeLanguage } = useContext(LanguageContext);

  const handleLanguageSelect = async (langCode) => {
    await changeLanguage(langCode); // 'en', 'te', 'ta', 'hi', 'kn'
    navigation.navigate('FarmerProfile');
  };

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Sprout color="#4CAF50" size={40} />
        </View>
      </View>

      <Text style={styles.title}>Welcome to KISAN</Text>
      <Text style={styles.subtitle}>Select your preferred language</Text>

      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={styles.langCard}
          onPress={() => handleLanguageSelect(lang.code)}
        >
          <Text style={styles.langName}>{lang.name}</Text>
          <Text style={styles.langNative}>{lang.native}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E7D32',
    textAlign: 'center',
    fontFamily: 'serif', // nee font style
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'serif',
    marginBottom: 40,
  },
  langCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  langName: {
    fontSize: 18,
    color: '#212121',
    fontFamily: 'serif',
    fontWeight: '500',
  },
  langNative: {
    fontSize: 18,
    color: '#2E7D32',
    fontFamily: 'serif',
    fontWeight: '600',
  },
});
