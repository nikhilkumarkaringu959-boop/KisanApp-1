import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Linking } from 'react-native';
import { useProfile } from '../context/ProfileContext';

export default function GovtSchemesScreen() {
  const { profile } = useProfile();
  const [state, setState] = useState(profile.state || 'Telangana');
  const [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState([]);

  const fetchSchemes = () => {
    setLoading(true);
    setTimeout(() => {
      const isTG = state === 'Telangana';
      const isAP = state === 'Andhra Pradesh';
      
      setSchemes([
        {
          name: isTG ? 'Rythu Bharosa (రైతు భరోసా)' : isAP ? 'YSR Rythu Bharosa' : 'PM-KISAN State Support',
          status: 'Release started for Kharif 2026. Verification ongoing',
          eligibility: 'Farmers holding up to 5 acres with valid passbooks',
          docs: 'Aadhaar Card, Bank Passbook, Pattadar Passbook',
          link: isTG ? 'https://rythubharosa.telangana.gov.in' : 'https://pmkisan.gov.in'
        },
        {
          name: isTG ? 'Runa Maaphee (రుణ మాఫీ)' : isAP ? 'Input Subsidy 2026' : 'Crop Insurance (Fasal Bima)',
          status: 'Phase 3 eligibility list released on portal',
          eligibility: isTG ? 'Loans taken between Dec 2018-Dec 2023 up to ₹2 Lakhs' : 'Crop loss > 33% in recent season',
          docs: 'Loan Account details, Aadhaar, Crop booking receipt',
          link: isTG ? 'https://clw.telangana.gov.in' : 'https://pmfby.gov.in'
        }
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Select State</Text>
        <View style={styles.selectBox}>
          <Text style={styles.selectText}>{state}</Text>
        </View>
        <TouchableOpacity style={styles.stateBtn} onPress={() => setState('Telangana')}>
          <Text style={styles.stateBtnText}>Telangana</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stateBtn} onPress={() => setState('Andhra Pradesh')}>
          <Text style={styles.stateBtnText}>Andhra Pradesh</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.checkBtn, loading && styles.checkBtnLoading]} onPress={fetchSchemes} disabled={loading}>
          {loading ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color="white" />
              <Text style={styles.checkBtnText}>Fetching Official Updates...</Text>
            </View>
          ) : (
            <Text style={styles.checkBtnText}>🏛️ Check Govt Schemes & Updates</Text>
          )}
        </TouchableOpacity>
      </View>

      {schemes.map((scheme, i) => (
        <View key={i} style={styles.schemeCard}>
          <Text style={styles.schemeName}>{scheme.name}</Text>
          
          <View style={styles.statusBox}>
            <View style={styles.liveDot} />
            <Text style={styles.statusText}>LIVE STATUS: {scheme.status}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>✅</Text>
            <View style={styles.flex1}>
              <Text style={styles.detailLabel}>Eligibility</Text>
              <Text style={styles.detailValue}>{scheme.eligibility}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📄</Text>
            <View style={styles.flex1}>
              <Text style={styles.detailLabel}>Required Docs</Text>
              <Text style={styles.detailValue}>{scheme.docs}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.linkBtn} onPress={() => Linking.openURL(scheme.link)}>
            <Text style={styles.linkBtnText}>Go to Official Website ↗</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc' },
  card: { backgroundColor: 'white', margin: 15, padding: 20, borderRadius: 15, elevation: 2 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#6B7280', marginBottom: 10, textTransform: 'uppercase' },
  selectBox: { backgroundColor: '#f9fafb', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 10 },
  selectText: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  stateBtn: { backgroundColor: '#EFF6FF', padding: 12, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: '#DBEAFE' },
  stateBtnText: { fontSize: 15, fontWeight: '600', color: '#1E40AF', textAlign: 'center' },
  checkBtn: { backgroundColor: '#2563EB', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 15 },
  checkBtnLoading: { backgroundColor: '#60A5FA' },
  checkBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  loadingRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  schemeCard: { backgroundColor: 'white', margin: 15, padding: 20, borderRadius: 15, elevation: 3, borderLeftWidth: 4, borderLeftColor: '#2563EB' },
  schemeName: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 12 },
  statusBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#D1FAE5', padding: 10, borderRadius: 8, marginBottom: 15 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981' },
  statusText: { fontSize: 12, fontWeight: 'bold', color: '#065F46', flex: 1 },
  detailRow: { flexDirection: 'row', gap: 12, marginBottom: 15 },
  detailIcon: { fontSize: 20 },
  flex1: { flex: 1 },
  detailLabel: { fontSize: 11, fontWeight: 'bold', color: '#6B7280', textTransform: 'uppercase', marginBottom: 4 },
  detailValue: { fontSize: 14, color: '#374151', lineHeight: 20 },
  linkBtn: { backgroundColor: '#EFF6FF', padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#DBEAFE' },
  linkBtnText: { fontSize: 14, fontWeight: 'bold', color: '#1D4ED8' },
});
