import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function PestControlScreen({ navigation, route }) {
  const { language = 'Telugu' } = route.params || {};
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('chemical');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8, base64: true });
    if (!result.canceled) { setImage(result.assets[0].uri); analyzeImage(result.assets[0].base64); }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8, base64: true });
    if (!result.canceled) { setImage(result.assets[0].uri); analyzeImage(result.assets[0].base64); }
  };

  const analyzeImage = async (base64Image) => {
    setLoading(true);
    try {
      // Replace with your backend + Google Search
      const res = await axios.post('https://your-backend.com/api/analyze-pest', {
        image: base64Image, language: language
      });
      setResult(res.data);
    } catch (err) {
      Alert.alert('Error', 'Failed to analyze. Check connection.');
    } finally { setLoading(false); }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerText}>Smart Pest & Disease Control</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.scanBtn} onPress={takePhoto}>
          <MaterialCommunityIcons name="camera" size={32} color="#fff" />
          <Text style={styles.scanBtnText}>Scan Crop / Upload Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.galleryBtn} onPress={pickImage}>
          <Ionicons name="images" size={24} color="#16A34A" />
          <Text style={styles.galleryBtnText}>Upload from Gallery</Text>
        </TouchableOpacity>

        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#16A34A" />
            <Text style={styles.loadingText}>తెగులును గుర్తిస్తోంది...</Text>
            <Text style={styles.loadingSub}>Analyzing with AI + Google Search</Text>
          </View>
        )}

        {result &&!loading && (
          <View style={styles.resultsBox}>
            <View style={styles.imageCompare}>
              <View style={styles.imageBox}>
                <Text style={styles.imageLabel}>Your Crop</Text>
                <Image source={{ uri: image }} style={styles.cropImage} />
              </View>
              <View style={styles.imageBox}>
                <Text style={styles.imageLabel}>Matched: {result.confidence_score}%</Text>
                <View style={[styles.cropImage, styles.refImage]}>
                  <MaterialCommunityIcons name="bug" size={60} color="#EF4444" />
                </View>
              </View>
            </View>

            <Text style={styles.issueTitle}>{result.identified_issue}</Text>

            <View style={styles.symptomsBox}>
              <Text style={styles.sectionTitle}>Symptoms:</Text>
              {result.symptoms?.map((symptom, idx) => <Text key={idx} style={styles.symptomText}>• {symptom}</Text>)}
            </View>

            <View style={styles.tabs}>
              <TouchableOpacity style={[styles.tab, activeTab === 'chemical' && styles.activeTab]} onPress={() => setActiveTab('chemical')}>
                <Text style={[styles.tabText, activeTab === 'chemical' && styles.activeTabText]}>Chemical Solution</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.tab, activeTab === 'organic' && styles.activeTab]} onPress={() => setActiveTab('organic')}>
                <Text style={[styles.tabText, activeTab === 'organic' && styles.activeTabText]}>Organic Solution</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.solutionBox}>
              {(activeTab === 'chemical'? result.solutions?.chemical_control : result.solutions?.organic_control)?.map((item, idx) => (
                <View key={idx} style={styles.solutionItem}>
                  <MaterialCommunityIcons name={activeTab === 'chemical'? 'flask' : 'leaf'} size={20} color={activeTab === 'chemical'? '#EF4444' : '#16A34A'} />
                  <Text style={styles.solutionText}>{item}</Text>
                </View>
              ))}
            </View>

            <View style={styles.preventionBox}>
              <Text style={styles.sectionTitle}>Prevention Tips:</Text>
              {result.prevention_tips?.map((tip, idx) => <Text key={idx} style={styles.tipText}>✓ {tip}</Text>)}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#DC2626', padding: 16, paddingTop: 50 },
  headerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  scanBtn: { backgroundColor: '#DC2626', borderRadius: 16, padding: 24, alignItems: 'center', elevation: 4, marginBottom: 12 },
  scanBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  galleryBtn: { backgroundColor: '#fff', borderRadius: 12, padding: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, borderWidth: 2, borderColor: '#16A34A' },
  galleryBtnText: { color: '#16A34A', fontSize: 16, fontWeight: '600' },
  loadingBox: { backgroundColor: '#fff', borderRadius: 16, padding: 40, alignItems: 'center', marginTop: 20 },
  loadingText: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginTop: 16 },
  loadingSub: { fontSize: 13, color: '#6B7280', marginTop: 8 },
  resultsBox: { marginTop: 20 },
  imageCompare: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  imageBox: { flex: 1 },
  imageLabel: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
  cropImage: { width: '100%', height: 180, borderRadius: 12 },
  refImage: { backgroundColor: '#FEF2F2', alignItems: 'center', justifyContent: 'center' },
  issueTitle: { fontSize: 24, fontWeight: 'bold', color: '#DC2626', marginBottom: 16 },
  symptomsBox: { backgroundColor: '#FEF2F2', borderRadius: 12, padding: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 12 },
  symptomText: { fontSize: 15, color: '#374151', marginBottom: 8, lineHeight: 22 },
  tabs: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  tab: { flex: 1, backgroundColor: '#F3F4F6', padding: 14, borderRadius: 12, alignItems: 'center' },
  activeTab: { backgroundColor: '#DC2626' },
  tabText: { fontSize: 15, fontWeight: '600', color: '#6B7280' },
  activeTabText: { color: '#fff' },
  solutionBox: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16 },
  solutionItem: { flexDirection: 'row', gap: 12, marginBottom: 12, alignItems: 'flex-start' },
  solutionText: { flex: 1, fontSize: 15, color: '#1F2937', lineHeight: 22 },
  preventionBox: { backgroundColor: '#F0FDF4', borderRadius: 12, padding: 16, borderLeftWidth: 4, borderLeftColor: '#16A34A' },
  tipText: { fontSize: 15, color: '#166534', marginBottom: 10, lineHeight: 22 },
});
