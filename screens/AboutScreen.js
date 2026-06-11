import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Kisan 2.0</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.logoSection}>
          <Text style={styles.logo}>🌾</Text>
          <Text style={styles.appName}>KISAN 2.0</Text>
          <Text style={styles.version}>Version 2.0.0</Text>
          <Text style={styles.tagline}>The Smart Farming Assistant</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Key Features</Text>
          <View style={styles.featureItem}>
            <Ionicons name="cloudy" size={20} color="#16A34A" />
            <Text style={styles.featureText}>24-Hour + 10-Day Weather Forecast</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="flask" size={20} color="#16A34A" />
            <Text style={styles.featureText}>AI Fertilizer Calculator</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="chatbubbles" size={20} color="#16A34A" />
            <Text style={styles.featureText}>KISAN AI Chat Assistant</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="notifications" size={20} color="#16A34A" />
            <Text style={styles.featureText}>Weather Alerts + Govt Schemes</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="newspaper" size={20} color="#16A34A" />
            <Text style={styles.featureText}>Live Agriculture News</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="person" size={20} color="#16A34A" />
            <Text style={styles.featureText}>Farmer Profile Management</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Technology Stack</Text>
          <Text style={styles.infoText}>• React Native + Expo SDK 51</Text>
          <Text style={styles.infoText}>• Open-Meteo Weather API</Text>
          <Text style={styles.infoText}>• AsyncStorage for Data</Text>
          <Text style={styles.infoText}>• Designed for Indian Farmers</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Developer</Text>
          <TouchableOpacity style={styles.linkBtn} onPress={() => Linking.openURL('mailto:support@kisan2app.com')}>
            <Ionicons name="mail" size={18} color="#16A34A" />
            <Text style={styles.linkText}>support@kisan2app.com</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkBtn} onPress={() => Linking.openURL('https://github.com/nikhilkumarkaringu929')}>
            <Ionicons name="logo-github" size={18} color="#16A34A" />
            <Text style={styles.linkText}>GitHub Repository</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Made with 💚 for Farmers of India 🇮🇳</Text>
        <Text style={styles.copyright}>© 2026 Kisan 2.0. All rights reserved.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#16A34A' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  scrollView: { flex: 1 },
  logoSection: { alignItems: 'center', paddingVertical: 32, backgroundColor: '#fff' },
  logo: { fontSize: 64, marginBottom: 12 },
  appName: { fontSize: 28, fontWeight: 'bold', color: '#1F2937' },
  version: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  tagline: { fontSize: 16, color: '#16A34A', marginTop: 8, fontWeight: '600' },
  card: { backgroundColor: '#fff', margin: 16, padding: 20, borderRadius: 12, elevation: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  featureText: { fontSize: 15, color: '#374151', marginLeft: 12, flex: 1 },
  infoText: { fontSize: 15, color: '#4B5563', marginBottom: 8 },
  linkBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  linkText: { fontSize: 15, color: '#16A34A', marginLeft: 8, fontWeight: '600' },
  footer: { textAlign: 'center', fontSize: 14, color: '#16A34A', paddingTop: 24, fontWeight: '600' },
  copyright: { textAlign: 'center', fontSize: 12, color: '#9CA3AF', paddingBottom: 24, paddingTop: 8 },
});
