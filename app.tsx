import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // expo install @expo/vector-icons

export default function App() {
  const [screen, setScreen] = useState('Home');

  // NUVVU PAMPINA EXACT HOME SCREEN
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <ImageBackground 
        source={{uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80'}} 
        style={styles.bg}
      >
        {/* HEADER - Green with App Name + 3 dots */}
        <View style={styles.header}>
          <Ionicons name="leaf" size={24} color="white" />
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.headerTitle}>KISAN</Text>
            <Text style={styles.headerSub}>THE SMART FARMING ASSISTANT</Text>
          </View>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </View>

        {/* WELCOME CARD */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>Welcome back, username!</Text>
          <Text style={styles.welcomeSub}>Your smart farming is ready</Text>
        </View>

        {/* 6 BUTTONS IN 2x3 GRID - EXACT AS SCREENSHOT */}
        <FlatList
          data={[
            {id: '1', name: 'Crop Information', icon: 'leaf-outline', desc: 'Crop details'},
            {id: '2', name: 'Weather Forecast', icon: 'cloud-outline', desc: 'Weather updates'},
            {id: '3', name: 'Fertilizer Calculator', icon: 'flask-outline', desc: 'Calculate fertilizer'},
            {id: '4', name: 'Smart Pest & Disease Control', icon: 'bug-outline', desc: 'Scan pests'},
            {id: '5', name: 'Smart Farming Tips', icon: 'bulb-outline', desc: 'Expert tips'},
            {id: '6', name: 'Government Schemes', icon: 'document-text-outline', desc: 'Govt benefits'},
          ]}
          numColumns={2}
          contentContainerStyle={{padding: 10}}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.card}>
              <View style={styles.iconBox}>
                <Ionicons name={item.icon} size={28} color="#2E7D32" />
              </View>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </TouchableOpacity>
          )}
        />

        {/* BOTTOM NAV - EXACT 3 TABS */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color="#2E7D32" />
            <Text style={styles.navTextActive}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.aiButton}>
              <Ionicons name="leaf" size={24} color="white" />
            </View>
            <Text style={styles.navText}>KISAN AI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person-outline" size={24} color="gray" />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    backgroundColor: '#1B5E20', 
    padding: 15, 
    alignItems: 'center' 
  },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  headerSub: { color: 'white', fontSize: 10 },
  welcomeCard: { 
    backgroundColor: 'rgba(255,255,255,0.9)', 
    margin: 15, 
    padding: 15, 
    borderRadius: 12 
  },
  welcomeText: { fontSize: 16, fontWeight: 'bold' },
  welcomeSub: { fontSize: 12, color: 'gray' },
  card: { 
    flex: 1, 
    backgroundColor: 'white', 
    margin: 8, 
    padding: 15, 
    borderRadius: 12,
    elevation: 3,
    minHeight: 120
  },
  iconBox: {
    backgroundColor: '#E8F5E9',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  cardTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  cardDesc: { fontSize: 11, color: 'gray' },
  bottomNav: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee'
  },
  navItem: { flex: 1, alignItems: 'center' },
  navText: { fontSize: 12, color: 'gray', marginTop: 4 },
  navTextActive: { fontSize: 12, color: '#2E7D32', fontWeight: 'bold', marginTop: 4 },
  aiButton: {
    backgroundColor: '#2E7D32',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    borderWidth: 4,
    borderColor: 'white'
  }
});
