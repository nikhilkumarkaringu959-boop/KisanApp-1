// app/government-schemes.js
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Linking, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { ArrowLeft, Building2, ExternalLink, FileText, Shield, CheckCircle2, AlertCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const STATES = [
  { label: 'Telangana', value: 'Telangana' },
  { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
  { label: 'Karnataka', value: 'Karnataka' },
  { label: 'Tamil Nadu', value: 'Tamil Nadu' },
  { label: 'Maharashtra', value: 'Maharashtra' },
  { label: 'Punjab', value: 'Punjab' },
];

const SCHEME_QUERIES = {
  'Telangana': ['RythuBharosa Status', 'RunaMaaphee Loan Waiver Updates', 'PM-KISAN installment'],
  'Andhra Pradesh': ['YSR RythuBharosa', 'Input Subsidy Status', 'Crop Insurance'],
  'Karnataka': ['Raitha Siri', 'Crop Loan Waiver', 'PM-KISAN'],
  'Tamil Nadu': ['PM-KISAN', 'Crop Insurance FasalBima', 'Kalaignar All Village Integrated Agriculture'],
};

export default function GovernmentSchemes() {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState('Telangana');
  const [userLanguage, setUserLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    loadUserLanguage();
  }, []);

  const loadUserLanguage = async () => {
    const profile = await AsyncStorage.getItem('userProfile');
    if (profile) {
      const parsed = JSON.parse(profile);
      setUserLanguage(parsed.language || 'English');
    }
  };

  const fetchSchemes = async () => {
    setLoading(true);
    setSchemes([]);

    const queries = SCHEME_QUERIES[selectedState] || ['PM-KISAN installment'];

    const prompt = `You are an expert Government Schemes Advisor specializing in Indian Agriculture Policies. Fetch latest 2026 real-time updates for farmer financial aids, subsidies, and loan waivers.

State: ${selectedState}
Queries: ${queries.join(', ')}
User Language: ${userLanguage}

Search live Google data for current year 2026 and return JSON array of schemes. Each scheme object must have:

1. "scheme_name": Official name in English and ${selectedState === 'Telangana'? 'Telugu' : selectedState === 'Andhra Pradesh'? 'Telugu' : selectedState === 'Karnataka'? 'Kannada' : selectedState === 'Tamil Nadu'? 'Tamil' : 'English'}
2. "latest_status_2026": Present live status with dates. Example: "Telangana Government started releasing next installment on 15-Jan-2026" or "Loan waiver phase 3 eligibility list released 10-Jan-2026"
3. "eligibility_and_benefits": Array of bullets on who is eligible and exact amount per acre/year. Example: "Small & Marginal farmers with <5 acres", "₹10,000 per acre per year"
4. "required_documents": Array of documents needed: Aadhaar, Passbook, Land records, etc
5. "official_links": Array of verified government portal URLs only. Example: rythubharosa.telangana.gov.in, pmkisan.gov.in
6. "scheme_type": One of: "Income Support", "Loan Waiver", "Crop Insurance", "Input Subsidy"
7. "last_updated": Date of last official update

Return 3-4 most important schemes for ${selectedState}. Use only factual 2026 data, avoid fake news. Use simple language.`;

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_GEMINI_API_KEY', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.1
          }
        })
      });

      if (!response.ok) throw new Error('API failed');

      const data = await response.json();
      const jsonText = data.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(jsonText);
      setSchemes(Array.isArray(parsed)? parsed : [parsed]);
    } catch (err) {
      Alert.alert('Error', 'Official data fetch cheyaleka poindi mowa');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Link open cheyaleka poindi');
      }
    } catch (err) {
      Alert.alert('Error', 'Invalid URL');
    }
  };

  const getSchemeIcon = (type) => {
    switch(type) {
      case 'Income Support': return <DollarSign color="#22C55E" size={24} />;
      case 'Loan Waiver': return <Shield color="#3B82F6" size={24} />;
      case 'Crop Insurance': return <Shield color="#F59E0B" size={24} />;
      case 'Input Subsidy': return <Package color="#A855F7" size={24} />;
      default: return <FileText color="#64748B" size={24} />;
    }
  };

  const getSchemeColor = (type) => {
    switch(type) {
      case 'Income Support': return '#D1FAE5';
      case 'Loan Waiver': return '#DBEAFE';
      case 'Crop Insurance': return '#FEF3C7';
      case 'Input Subsidy': return '#F3E8FF';
      default: return '#F1F5F9';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color="#1B4332" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Govt Schemes & Updates</Text>
        <Building2 color="#1B4332" size={24} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* State Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SELECT YOUR STATE</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedState}
              onValueChange={(value) => setSelectedState(value)}
              style={styles.picker}
            >
              {STATES.map((state) => (
                <Picker.Item key={state.value} label={state.label} value={state.value} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Check Button */}
        <TouchableOpacity
          style={[styles.checkBtn, loading && styles.checkBtnDisabled]}
          onPress={fetchSchemes}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Building2 color="#FFF" size={24} />
          <Text style={styles.checkBtnText}>Check Govt Schemes & Updates</Text>
        </TouchableOpacity>

        {/* Loading State */}
        {loading && (
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color="#1B4332" />
            <Text style={styles.loadingText}>
              {userLanguage === 'Telugu'
               ? 'ప్రభుత్వఅధికారికసమాచారాన్నిసేకరిస్తోంది…'
                : 'Fetching official government updates…'}
            </Text>
          </View>
        )}

        {/* Results Cards */}
        {schemes.length > 0 &&!loading && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>Latest Updates for {selectedState} - 2026</Text>

            {schemes.map((scheme, idx) => (
              <View key={idx} style={[styles.schemeCard, { backgroundColor: getSchemeColor(scheme.scheme_type) }]}>
                <View style={styles.schemeHeader}>
                  {getSchemeIcon(scheme.scheme_type)}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.schemeName}>{scheme.scheme_name}</Text>
                    <View style={styles.typeTag}>
                      <Text style={styles.typeTagText}>{scheme.scheme_type}</Text>
                    </View>
                  {scheme.last_updated && (
                    <View style={styles.updateBadge}>
                      <CheckCircle2 color="#22C55E" size={16} />
                      <Text style={styles.updateText}>Updated</Text>
                    </View>
                  )}
                </View>

                {/* Latest Status */}
                <View style={styles.statusBox}>
                  <AlertCircle color="#F59E0B" size={18} />
                  <Text style={styles.statusText}>{scheme.latest_status_2026}</Text>
                </View>

                {/* Eligibility & Benefits */}
                <View style={styles.sectionBox}>
                  <Text style={styles.sectionBoxTitle}>✅ Eligibility & Benefits:</Text>
                  {scheme.eligibility_and_benefits.map((item, i) => (
                    <Text key={i} style={styles.bulletItem}>• {item}</Text>
                  ))}
                </View>

                {/* Required Documents */}
                <View style={styles.sectionBox}>
                  <Text style={styles.sectionBoxTitle}>📄 Required Documents:</Text>
                  <View style={styles.docGrid}>
                    {scheme.required_documents.map((doc, i) => (
                      <View key={i} style={styles.docTag}>
                        <Text style={styles.docText}>{doc}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Official Links */}
                {scheme.official_links && scheme.official_links.length > 0 && (
                  <View style={styles.linksSection}>
                    {scheme.official_links.map((link, i) => (
                      <TouchableOpacity
                        key={i}
                        style={styles.linkBtn}
                        onPress={() => openLink(link)}
                        activeOpacity={0.7}
                      >
                        <ExternalLink color="#FFF" size={18} />
                        <Text style={styles.linkBtnText}>Go to Official Website</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {scheme.last_updated && (
                  <Text style={styles.lastUpdated}>Last Updated: {scheme.last_updated}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {!loading && schemes.length === 0 && (
          <View style={styles.emptyState}>
            <Building2 color="#CBD5E1" size={64} />
            <Text style={styles.emptyText}>Select state & click button to check latest schemes</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderBottomWidth: 1, borderBottomColor: '#E2E8F0'
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1B4332' },
  scrollView: { flex: 1 },
  section: { padding: 16 },
  sectionLabel: { fontSize: 12, fontWeight: '800', color: '#334155', marginBottom: 12, letterSpacing: 0.5 },
  pickerContainer: { backgroundColor: '#F8FAFC', borderRadius: 14, borderWidth: 1.5, borderColor: '#CBD5E1', overflow: 'hidden' },
  picker: { height: 55 },
  checkBtn: { margin: 16, backgroundColor: '#1B4332', padding: 18, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, elevation: 4, shadowColor: '#1B4332', shadowOpacity: 0.3 },
  checkBtnDisabled: { opacity: 0.6 },
  checkBtnText: { color: '#FFF', fontWeight: '900', fontSize: 17, letterSpacing: 0.5 },
  loadingCard: { margin: 16, padding: 40, backgroundColor: '#F0F9FF', borderRadius: 20, alignItems: 'center', borderWidth: 2, borderColor: '#BAE6FD' },
  loadingText: { fontSize: 15, fontWeight: '700', color: '#075985', marginTop: 16, textAlign: 'center' },
  resultsSection: { padding: 16 },
  resultsTitle: { fontSize: 18, fontWeight: '800', color: '#1B4332', marginBottom: 16 },
  schemeCard: { padding: 20, borderRadius: 20, marginBottom: 16, borderWidth: 2, borderColor: '#E2E8F0' },
  schemeHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 16 },
  schemeName: { fontSize: 18, fontWeight: '800', color: '#1B4332', marginBottom: 6 },
  typeTag: { backgroundColor: 'rgba(0,0,0,0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  typeTagText: { fontSize: 11, fontWeight: '700', color: '#1E293B' },
  updateBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#D1FAE5', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  updateText: { fontSize: 11, fontWeight: '700', color: '#065F46' },
  statusBox: { flexDirection: 'row', gap: 10, backgroundColor: '#FEF3C7', padding: 14, borderRadius: 12, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: '#F59E0B' },
  statusText: { flex: 1, fontSize: 14, fontWeight: '600', color: '#92400E', lineHeight: 20 },
  sectionBox: { marginBottom: 16 },
  sectionBoxTitle: { fontSize: 14, fontWeight: '800', color: '#1B4332', marginBottom: 10 },
  bulletItem: { fontSize: 14, color: '#475569', lineHeight: 22, marginBottom: 6 },
  docGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  docTag: { backgroundColor: '#F1F5F9', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#CBD5E1' },
  docText: { fontSize: 13, fontWeight: '600', color: '#334155' },
  linksSection: { gap: 10 },
  linkBtn: { backgroundColor: '#1B4332', padding: 16, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  linkBtnText: { color: '#FFF', fontWeight: '800', fontSize: 15 },
  lastUpdated: { fontSize: 11, color: '#64748B', marginTop: 12, fontStyle: 'italic' },
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyText: { fontSize: 15, color: '#94A3B8', marginTop: 16, textAlign: 'center', fontWeight: '600' },
});
