import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Camera, Upload, Bug, Shield, Droplets, Sun } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function PestControlScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [disease, setDisease] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ CAMERA PHOTO
  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status!== 'granted') {
        Alert.alert('Permission Denied', 'Allow camera access');
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        detectDisease(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  // ✅ GALLERY PHOTO
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status!== 'granted') {
        Alert.alert('Permission Denied', 'Allow photo access');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        detectDisease(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  // ✅ DISEASE DETECTION + SOLUTIONS
  const detectDisease = (imageUri) => {
    setLoading(true);

    // Real API: Plant.id / Gemini Vision ikkada call chey
    // Ippudu mock data
    setTimeout(() => {
      setDisease({
        name: 'Leaf Blight',
        scientificName: 'Alternaria solani',
        severity: 'High',
        confidence: '92%',
        symptoms: [
          'Brown circular spots on leaves',
          'Yellow halos around spots',
          'Leaves turning yellow and dropping'
        ],
        causes: [
          'High humidity + warm temperature',
          'Poor air circulation',
          'Infected seeds or soil'
        ],
        organicSolutions: [
          'Neem oil spray - 5ml per liter water',
          'Copper fungicide - spray weekly',
          'Remove infected leaves immediately',
          'Improve field drainage'
        ],
        chemicalSolutions: [
          'Mancozeb 75% WP - 2g per liter',
          'Carbendazim 50% WP - 1g per liter',
          'Spray every 10 days till symptoms stop'
        ],
        prevention: [
          'Use disease-free seeds',
          'Crop rotation with non-host crops',
          'Maintain proper plant spacing',
          'Avoid overhead irrigation'
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <LinearGradient colors={['#1A9B6C', '#0D5A3E']} style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Smart Pest Control</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.uploadCard}>
          <Text style={styles.cardTitle}>Detect Crop Disease</Text>
          <Text style={styles.cardDesc}>Take photo of infected leaf/plant for instant diagnosis</Text>

          {selectedImage? (
            <View style={styles.imageBox}>
              <Image source={{ uri: selectedImage }} style={styles.previewImage} />
              <TouchableOpacity style={styles.changeBtn} onPress={() => {setSelectedImage(null); setDisease(null);}}>
                <Text style={styles.changeBtnText}>New Photo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.uploadBtn} onPress={takePhoto}>
                <Camera color="#EF4444" size={28} />
                <Text style={styles.uploadBtnText}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
                <Upload color="#EF4444" size={28} />
                <Text style={styles.uploadBtnText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#16A34A" />
            <Text style={styles.loadingText}>Analyzing Disease...</Text>
          </View>
        )}

        {/* ✅ DISEASE RESULT */}
        {disease &&!loading && (
          <>
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Bug color="#EF4444" size={28} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.diseaseName}>{disease.name}</Text>
                  <Text style={styles.scientificName}>{disease.scientificName}</Text>
                </View>
                <View style={[styles.severityBadge, { backgroundColor: disease.severity === 'High'? '#FEE2E2' : '#FEF3C7' }]}>
                  <Text style={[styles.severityText, { color: disease.severity === 'High'? '#DC2626' : '#D97706' }]}>
                    {disease.severity}
                  </Text>
                </View>
              </View>
              <Text style={styles.confidence}>Confidence: {disease.confidence}</Text>
            </View>

            {/* ✅ SYMPTOMS */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>🔍 Symptoms</Text>
              {disease.symptoms.map((item, idx) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* ✅ CAUSES */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>⚠️ Causes</Text>
              {disease.causes.map((item, idx) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* ✅ ORGANIC SOLUTIONS */}
            <View style={[styles.sectionCard, { borderLeftWidth: 4, borderLeftColor: '#16A34A' }]}>
              <View style={styles.solutionHeader}>
                <Shield color="#16A34A" size={20} />
                <Text style={styles.sectionTitle}>Organic Solutions</Text>
              </View>
              {disease.organicSolutions.map((item, idx) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={styles.bullet}>✓</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* ✅ CHEMICAL SOLUTIONS */}
            <View style={[styles.sectionCard, { borderLeftWidth: 4, borderLeftColor: '#DC2626' }]}>
              <View style={styles.solutionHeader}>
                <Droplets color="#DC2626" size={20} />
                <Text style={styles.sectionTitle}>Chemical Solutions</Text>
              </View>
              {disease.chemicalSolutions.map((item, idx) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={styles.bullet}>✓</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* ✅ PREVENTION */}
            <View style={[styles.sectionCard, { borderLeftWidth: 4, borderLeftColor: '#3B82F6', marginBottom: 30 }]}>
              <View style={styles.solutionHeader}>
                <Sun color="#3B82F6" size={20} />
                <Text style={styles.sectionTitle}>Prevention Tips</Text>
              </View>
              {disease.prevention.map((item, idx) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ))}
            </View>
          </>
        )}

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 15,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)'
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },
  scroll: { flex: 1 },
  uploadCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 2
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 6 },
  cardDesc: { fontSize: 14, color: '#6B7280', marginBottom: 20 },
  buttonRow: { flexDirection: 'row', gap: 12 },
  uploadBtn: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#EF4444',
    borderStyle: 'dashed'
  },
  uploadBtnText: { fontSize: 14, fontWeight: '600', color: '#EF4444', marginTop: 8 },
  imageBox: { alignItems: 'center' },
  previewImage: { width: '100%', height: 200, borderRadius: 12, marginBottom: 12 },
  changeBtn: { backgroundColor: '#EF4444', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  changeBtnText: { color: '#fff', fontWeight: '600' },
  loadingBox: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    margin: 15,
    padding: 30,
    borderRadius: 15,
    alignItems: 'center'
  },
  loadingText: { fontSize: 16, color: '#16A34A', fontWeight: '600', marginTop: 12 },
  resultCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 2
  },
  resultHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  diseaseName: { fontSize: 20, fontWeight: '700', color: '#1F2937' },
  scientificName: { fontSize: 13, color: '#6B7280', fontStyle: 'italic' },
  severityBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  severityText: { fontSize: 12, fontWeight: '700' },
  confidence: { fontSize: 14, color: '#16A34A', fontWeight: '600', marginTop: 8 },
  sectionCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 2
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  solutionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  listItem: { flexDirection: 'row', marginBottom: 10, paddingRight: 10 },
  bullet: { fontSize: 16, color: '#16A34A', fontWeight: '700', marginRight: 8, width: 15 },
  listText: { flex: 1, fontSize: 14, color: '#4B5563', lineHeight: 20 }
});
