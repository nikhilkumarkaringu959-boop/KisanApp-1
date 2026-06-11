import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';

export default function ProfileScreen({ navigation }) {
  const { userData, saveUserData } = useContext(UserContext);

  const languages = [
    { code: 'english', name: 'English' },
    { code: 'telugu', name: 'తెలుగు' },
    { code: 'hindi', name: 'हिंदी' },
    { code: 'tamil', name: 'தமிழ்' },
    { code: 'kannada', name: 'ಕನ್ನಡ' },
  ];

  const changeLanguage = (langCode) => {
    saveUserData({ language: langCode });
    alert('Language updated!');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Profile 👨‍🌾</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{userData.name || 'Not Set'}</Text>
        <Text style={styles.label}>Crop Name</Text>
        <Text style={styles.value}>{userData.cropName || 'Not Set'}</Text>
        <Text style={styles.label}>Total Acres</Text>
        <Text style={styles.value}>{userData.acres || 'Not Set'}</Text>
        <Text style={styles.label}>Soil Type</Text>
        <Text style={styles.value}>{userData.soilType || 'Not Set'}</Text>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{userData.location || 'Not Set'}</Text>
      </View>
      <Text style={styles.title}>Change Language 🌐</Text>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[styles.langBtn, userData.language === lang.code && styles.activeBtn]}
          onPress={() => changeLanguage(lang.code)}
        >
          <Text style={styles.langText}>{lang.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: '#2e7d32' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 20 },
  label: { fontSize: 14, color: '#666', marginTop: 12 },
  value: { fontSize: 18, fontWeight: '600', color: '#000' },
  langBtn: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 8 },
  activeBtn: { backgroundColor: '#c8e6c9', borderWidth: 2, borderColor: '#2e7d32' },
  langText: { fontSize: 16, textAlign: 'center' }
});
