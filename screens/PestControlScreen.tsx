import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

export default function PestControlScreen() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const scan = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult({
        issue: "Brown Plant Hopper (BPH)",
        confidence: "94%",
        symptoms: ["Drying in circular patches", "Brown insects at plant base"],
        chemical: "Spray Pymetrozine 50% WG @ 120g/acre in 200L water",
        organic: "Spray Neem oil 10000 ppm @ 2ml/liter",
        prevention: "Maintain spacing. Use resistant varieties. Alternate wetting & drying"
      });
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {!result ? (
        <View style={styles.scanBox}>
          <View style={styles.cameraCircle}>
            <Text style={styles.cameraIcon}>📷</Text>
            {analyzing && <View style={styles.spinner} />}
          </View>
          <Text style={styles.scanTitle}>Identify Pests Instantly</Text>
          <Text style={styles.scanDesc}>Take a photo of infected leaf to get AI solutions</Text>
          <TouchableOpacity style={[styles.scanBtn, analyzing && styles.scanBtnActive]} onPress={scan} disabled={analyzing}>
            {analyzing ? <Text style={styles.scanBtnText}>🔍 Analyzing...</Text> : <Text style={styles.scanBtnText}>Scan Crop / Upload Photo</Text>}
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.resultScroll}>
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={styles.issueName}>{result.issue}</Text>
              <View style={styles.confBadge}>
                <Text style={styles.confText}>{result.confidence} Match</Text>
              </View>
            </View>

            <Text style={styles.sectionLabel}>Symptoms</Text>
            {result.symptoms.map((s, i) => <Text key={i} style={styles.symptom}>• {s}</Text>)}

            <View style={styles.solutionBox}>
              <Text style={styles.solTitle}>🧪 Chemical Solution</Text>
              <Text style={styles.solText}>{result.chemical}</Text>
            </View>

            <View style={[styles.solutionBox, styles.solutionGreen]}>
              <Text style={styles.solTitleGreen}>🌿 Organic Solution</Text>
              <Text style={styles.solText}>{result.organic}</Text>
            </View>

            <View style={styles.preventBox}>
              <Text style={styles.preventTitle}>🛡️ Prevention Tips</Text>
              <Text style={styles.preventText}>{result.prevention}</Text>
            </View>

            <TouchableOpacity style={styles.againBtn} onPress={() => setResult(null)}>
              <Text style={styles.againText}>Scan Another Crop 📷</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc' },
  scanBox: { backgroundColor: 'white', margin: 15, padding: 40, borderRadius: 25, alignItems: 'center', elevation: 2 },
  cameraCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  cameraIcon: { fontSize: 50 },
  spinner: { position: 'absolute', width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#EF4444', borderTopColor: 'transparent' },
  scanTitle: { fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 },
  scanDesc: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 25 },
  scanBtn: { backgroundColor: '#DC2626', padding: 18, borderRadius: 15, width: '100%', alignItems: 'center' },
  scanBtnActive: { backgroundColor: '#1F2937' },
  scanBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  resultScroll: { flex: 1 },
  resultCard: { backgroundColor: 'white', margin: 15, padding: 20, borderRadius: 15, elevation: 3 },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
  issueName: { fontSize: 20, fontWeight: 'bold', color: '#B91C1C', flex: 1 },
  confBadge: { backgroundColor: '#D1FAE5', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  confText: { fontSize: 11, fontWeight: 'bold', color: '#065F46' },
  sectionLabel: { fontSize: 12, fontWeight: 'bold', color: '#6B7280', marginTop: 15, marginBottom: 8, textTransform: 'uppercase' },
  symptom: { fontSize: 14, color: '#374151', marginBottom: 5 },
  solutionBox: { backgroundColor: '#FEF2F2', padding: 15, borderRadius: 12, marginTop: 15, borderWidth: 1, borderColor: '#FECACA' },
  solutionGreen: { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' },
  solTitle: { fontSize: 14, fontWeight: 'bold', color: '#991B1B', marginBottom: 8 },
  solTitleGreen: { fontSize: 14, fontWeight: 'bold', color: '#065F46', marginBottom: 8 },
  solText: { fontSize: 14, color: '#1F2937', lineHeight: 20 },
  preventBox: { backgroundColor: '#EFF6FF', padding: 15, borderRadius: 12, marginTop: 15 },
  preventTitle: { fontSize: 12, fontWeight: 'bold', color: '#1E40AF', marginBottom: 8 },
  preventText: { fontSize: 14, color: '#1E3A8A', lineHeight: 20 },
  againBtn: { backgroundColor: '#f3f4f6', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  againText: { fontSize: 14, fontWeight: 'bold', color: '#4B5563' },
});
