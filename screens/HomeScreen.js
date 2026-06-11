import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert, Linking, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// FREE KEY FROM newsapi.org - 100 requests/day
const NEWS_API_KEY = 'YOUR_NEWSAPI_KEY_HERE';

export default function HomeScreen({ navigation }) {
  const [farmerName, setFarmerName] = useState('Farmer');
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [farmerProfile, setFarmerProfile] = useState(null);

  useEffect(() => {
    loadFarmerData();
    fetchFarmingNews();
  }, []);

  const loadFarmerData = async () => {
    try {
      const profile = await AsyncStorage.getItem('farmerProfile');
      if (profile) {
        const data = JSON.parse(profile);
        setFarmerName(data.name || 'Farmer');
        setFarmerProfile(data);
      }
    } catch (error) {
      console.log('Profile load error:', error);
    }
  };

  const fetchFarmingNews = async () => {
    try {
      setLoadingNews(true);
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=agriculture+india+farming+crop&language=en&sortBy=publishedAt&pageSize=5&apiKey=${NEWS_API_KEY}`
      );
      const data = await res.json();
      if (data.articles) {
        setNews(data.articles);
      }
    } catch (error) {
      console.log('News fetch error:', error);
      // Fallback mock data if API fails
      setNews([
        { title: 'PM Kisan 18th Installment Released', source: { name: 'Kisan News' }, url: 'https://pmkisan.gov.in' },
        { title: 'Monsoon Update: Good Rainfall Expected', source: { name: 'IMD' }, url: 'https://mausam.imd.gov.in' }
      ]);
    } finally {
      setLoadingNews(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Kisan Vikas - Smart Farming App 🌾\n\nWeather • Fertilizer Calculator • AI Assistant\n\nDownload now!',
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share app');
    }
  };

  const handleMyFarmDetails = () => {
    if (farmerProfile) {
      Alert.alert(
        'My Farm Details',
        `Name: ${farmerProfile.name}\nDistrict: ${farmerProfile.district}\nState: ${farmerProfile.state}\nCrop: ${farmerProfile.primaryCrop || 'Not set'}\nLand Size: ${farmerProfile.landSize || 'Not set'}\nSoil Type: ${farmerProfile.soilType || 'Not set'}`,
        [{ text: 'Edit', onPress: () => navigation.navigate('ProfileMain') }, { text: 'OK' }]
      );
    } else {
      Alert.alert('No Data', 'Please complete your profile first', [
        { text: 'Go to Profile', onPress: () => navigation.navigate('ProfileMain') }
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Namaste, {farmerName} 👋</Text>
            <Text style={styles.subGreeting}>Welcome to Kisan Vikas</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications" size={28} color="#16A34A" />
          </TouchableOpacity>
        </View>

        {/* Top 3 Buttons - Nuvvu Adigina */}
        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.topBtn} onPress={() => navigation.navigate('ProfileMain')}>
            <Ionicons name="person-circle" size={32} color="#2563EB" />
            <Text style={styles.topBtnText}>My Profile</Text>
            <Text style={styles.topBtnSub}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topBtn} onPress={() => Alert.alert('Language', 'Coming Soon: Telugu/Hindi/English switch')}>
            <Ionicons name="language" size={32} color="#7C3AED" />
            <Text style={styles.topBtnText}>Language</Text>
            <Text style={styles.topBtnSub}>Change</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topBtn} onPress={() => navigation.navigate('KisanAI')}>
            <Ionicons name="leaf" size={32} color="#16A34A" />
            <Text style={styles.topBtnText}>KISAN AI</Text>
            <Text style={styles.topBtnSub}>Assistant</Text>
          </TouchableOpacity>
        </View>

        {/* News Slide Bar - REAL GOOGLE NEWS */}
        <Text style={styles.sectionTitle}>Farming News & Updates</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.newsRow}>
          {loadingNews? (
            <View style={styles.newsCard}>
              <ActivityIndicator color="#fff" />
              <Text style={styles.newsTitle}>Loading live news...</Text>
            </View>
          ) : news.length > 0? news.map((item, index) => (
            <TouchableOpacity key={index} style={styles.newsCard} onPress={() => Linking.openURL(item.url)}>
              <View style={styles.newsBadge}>
                <Text style={styles.newsBadgeText}>LIVE</Text>
              </View>
              <Text style={styles.newsTitle} numberOfLines={3}>{item.title}</Text>
              <Text style={styles.newsSource}>{item.source.name}</Text>
            </TouchableOpacity>
          )) : (
            <View style={styles.newsCard}>
              <Text style={styles.newsTitle}>No news available. Check API key.</Text>
            </View>
          )}
        </ScrollView>

        {/* Main Feature Buttons */}
        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Weather')}>
            <Ionicons name="partly-sunny" size={40} color="#2563EB" />
            <Text style={styles.cardTitle}>Weather Forecast</Text>
            <Text style={styles.cardSub}>24hr + 10 day</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Fertilizer')}>
            <Ionicons name="flask" size={40} color="#16A34A" />
            <Text style={styles.cardTitle}>Smart Fertilizer</Text>
            <Text style={styles.cardSub}>AI Calculator</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications" size={40} color="#DC2626" />
            <Text style={styles.cardTitle}>Notifications</Text>
            <Text style={styles.cardSub}>Alerts & Schemes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={handleShare}>
            <Ionicons name="share-social" size={40} color="#7C3AED" />
            <Text style={styles.cardTitle}>Share App</Text>
            <Text style={styles.cardSub}>Invite Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={handleMyFarmDetails}>
            <Ionicons name="document-text" size={40} color="#EA580C" />
            <Text style={styles.cardTitle}>My Farm Details</Text>
            <Text style={styles.cardSub}>Soil & Land</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('About')}>
            <Ionicons name="information-circle" size={40} color="#6B7280" />
            <Text style={styles.cardTitle}>About Us</Text>
            <Text style={styles.cardSub}>v1.0.0</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  greeting: { fontSize: 22, fontWeight: 'bold', color: '#1F2937' },
  subGreeting: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  topButtons: { flexDirection: 'row', justifyContent: 'space-around', padding: 16, backgroundColor: '#fff', marginBottom: 8 },
  topBtn: { alignItems: 'center', width: 100 },
  topBtnText: { fontSize: 13, color: '#374151', marginTop: 6, fontWeight: '700' },
  topBtnSub: { fontSize: 10, color: '#9CA3AF', marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginHorizontal: 16, marginTop: 16, marginBottom: 12 },
  newsRow: { paddingHorizontal: 16 },
  newsCard: { backgroundColor: '#16A34A', padding: 16, borderRadius: 12, marginRight: 12, width: 280, minHeight: 120, justifyContent: 'space-between' },
  newsBadge: { backgroundColor: '#DC2626', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', marginBottom: 8 },
  newsBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  newsTitle: { fontSize: 14, fontWeight: '600', color: '#fff', lineHeight: 20 },
  newsSource: { fontSize: 12, color: '#DCFCE7', marginTop: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8 },
  card: { width: '46%', backgroundColor: '#fff', margin: '2%', padding: 16, borderRadius: 12, alignItems: 'center', elevation: 2 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#374151', marginTop: 10, textAlign: 'center' },
  cardSub: { fontSize: 11, color: '#9CA3AF', marginTop: 4 },
});
