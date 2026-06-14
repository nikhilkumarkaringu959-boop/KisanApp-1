// app/fertilizer.js
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { ArrowLeft, Tractor, FlaskConical, Leaf, Sprout, Sparkles, Droplets, Award } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FertilizerCalculator() {
  const router = useRouter();
  const [cropName, setCropName] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const profile = await AsyncStorage.getItem('userProfile');
      if (profile) {
        setUserProfile(JSON.parse(profile));
      }
    } catch (e) {
      console.error('Profile load error:', e);
    }
  };

  const calculateFertilizer = async () => {
    if (!cropName.trim()) {
      setError('Crop name enter chey mowa');
      return;
    }
    if (!userProfile ||!userProfile.landSize ||!userProfile.soilType) {
      setError('Profile lo land size & soil type save chey mowa');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const prompt = `You are an expert AI Agronomist (వ్యవసాయశాస్త్రవేత్త). Analyze the user's crop data and provide a HIGHLY ACCURATE, customized fertilizer schedule with chemical + organic options + best brand recommendations.

The user will provide:
- Crop Name: ${cropName}
- Total Acres: ${userProfile.landSize}
- Soil Type: ${userProfile.soilType}

Return STRICTLY structured JSON (No text outside JSON) with:

1. "crop_summary": 1-line nutrient needs for this crop
2. "total_summary": Total fertilizer requirement summary for ${userProfile.landSize} acres - total bags/kg of each fertilizer needed for entire crop cycle
3. "chemical_calculator": Exact total quantity for ${userProfile.landSize} acres:
   - Urea (Nitrogen source) - in kg and bags (50kg bag)
   - DAP (Phosphorus source) - in kg and bags (50kg bag)
   - MOP (Potassium source) - in kg and bags (50kg bag)
   - Complex fertilizers (19:19:19, 20:20:0:13, 10:26:26, etc)
   - Micronutrients if needed (Zinc Sulphate, Boron, etc)
4. "organic_calculator": Exact organic alternatives for ${userProfile.landSize} acres:
   - Vermicompost (kg or tons)
   - Farmyard Manure (పశువులఎరువు) (tons)
   - Neem Cake (వేపపిండి) (kg)
   - Jeevamrutham (liters)
   - Panchagavya (liters)
   - Bio-fertilizers (Azotobacter, PSB, KMB - kg)
5. "recommended_brands": Array of 5-6 best fertilizer brands in India:
   - "brand_name": Company name (IFFCO, Coromandel, Zuari, Nagarjuna, GSFC, NFL, etc)
   - "product_name": Specific fertilizer name
   - "type": Chemical or Organic
   - "best_for": Which crop stage/nutrient
   - "price_range": Approximate price per bag/liter
6. "situation_guide": Array of 4 distinct crop stages (MUST include all 4):
   Stage 1: Basal/Dapudu (దాపుడు) - At sowing/transplanting
   Stage 2: Vegetative/Tillering (పిలకలు/ఏపుగా పెరిగే దశ)
   Stage 3: Flowering/Panicle Initiation (పూత/వెన్ను దశ)
   Stage 4: Grain Filling/Maturity (గింజ పాలుపోసుకునే దశ)

   For each stage provide:
   - "stage_name" (English and Telugu)
   - "days_after_sowing": When to apply (e.g., "0-7 days", "25-30 days")
   - "chemical_dosage": Exact kg/acre to apply at this stage
   - "organic_dosage": Exact kg/liter per acre
   - "spray_quantity": If foliar spray needed, exact liters/acre + water ratio + pump tanks needed
   - "application_tip": How to apply + timing + warning (soil moisture, weather, etc)
   - "best_products": 2-3 recommended brand products for this stage

Scale ALL calculations accurately for ${userProfile.landSize} acres. Use real Indian market data, current fertilizer prices, and brands. Be very specific with quantities and timing.`;

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_GEMINI_API_KEY', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        })
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const jsonText = data.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(jsonText);
      setResult(parsed);
    } catch (err) {
      setError('AI nunchi data rale mowa. API key check chey');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color="#1B4332" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fertilizer Calculator</Text>
        <FlaskConical color="#1B4332" size={24} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {userProfile && (
          <View style={styles.farmCard}>
            <Tractor color="#1B4332" size={34} strokeWidth={2} />
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.farmLabel}>FARM DATA</Text>
              <Text style={styles.farmValue}>
                {userProfile.landSize} Acres • {userProfile.soilType}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>CROP NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Paddy, Cotton, Wheat"
            placeholderTextColor="#94A3B8"
            value={cropName}
            onChangeText={setCropName}
            autoCapitalize="words"
          />

          <TouchableOpacity
            style={[styles.calcBtn, loading && styles.calcBtnDisabled]}
            onPress={calculateFertilizer}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <Text style={styles.calcBtnText}>Calculate Fertilizers</Text>
            )}
          </TouchableOpacity>

          {error? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {result && (
          <>
            {/* Crop Summary */}
            <View style={styles.resultCard}>
              <View style={styles.cardHeader}>
                <Sparkles color="#22C55E" size={22} />
                <Text style={styles.sectionTitle}>Crop Summary</Text>
              </View>
              <Text style={styles.summaryText}>{result.crop_summary}</Text>
            </View>

            {/* Total Summary */}
            {result.total_summary && (
              <View style={styles.resultCard}>
                <View style={styles.cardHeader}>
                  <Award color="#F59E0B" size={22} />
                  <Text style={styles.sectionTitle}>Total Requirement - Full Cycle</Text>
                </View>
                <Text style={styles.totalSummaryText}>{result.total_summary}</Text>
              </View>
            )}

            {/* Chemical Calculator */}
            <View style={styles.resultCard}>
              <View style={styles.cardHeader}>
                <FlaskConical color="#3B82F6" size={22} />
                <Text style={styles.sectionTitle}>Chemical Fertilizers - Total</Text>
              </View>
              {Object.entries(result.chemical_calculator).map(([key, value], idx) => (
                <View key={idx} style={[styles.fertRow, idx === Object.keys(result.chemical_calculator).length - 1 && { borderBottomWidth: 0 }]}>
                  <Text style={styles.fertLabel}>{key}</Text>
                  <Text style={styles.fertValue}>{value}</Text>
                </View>
              ))}
            </View>

            {/* Organic Calculator */}
            <View style={styles.resultCard}>
              <View style={styles.cardHeader}>
                <Sprout color="#22C55E" size={22} />
                <Text style={styles.sectionTitle}>Organic Alternatives - Total</Text>
              </View>
              {Object.entries(result.organic_calculator).map(([key, value], idx) => (
                <View key={idx} style={[styles.fertRow, idx === Object.keys(result.organic_calculator).length - 1 && { borderBottomWidth: 0 }]}>
                  <Text style={styles.fertLabel}>{key}</Text>
                  <Text style={styles.fertValue}>{value}</Text>
                </View>
              ))}
            </View>

            {/* Recommended Brands */}
            {result.recommended_brands && (
              <View style={styles.resultCard}>
                <View style={styles.cardHeader}>
                  <Award color="#A855F7" size={22} />
                  <Text style={styles.sectionTitle}>Best Brands in India</Text>
                </View>
                {result.recommended_brands.map((brand, idx) => (
                  <View key={idx} style={styles.brandBox}>
                    <View style={styles.brandHeader}>
                      <Text style={styles.brandName}>{brand.brand_name}</Text>
                      <View style={[styles.brandTag, brand.type === 'Chemical'? styles.chemTag : styles.orgTag]}>
                        <Text style={styles.brandTagText}>{brand.type}</Text>
                      </View>
                    <Text style={styles.productName}>📦 {brand.product_name}</Text>
                    <Text style={styles.bestFor}>✓ Best for: {brand.best_for}</Text>
                    {brand.price_range && (
                      <Text style={styles.priceRange}>💰 {brand.price_range}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* 4 Stage Schedule */}
            <View style={[styles.resultCard, { marginBottom: 40 }]}>
              <Text style={styles.sectionTitle}>📅 4-Stage Application Schedule</Text>
              {result.situation_guide.map((stage, idx) => (
                <View key={idx} style={styles.stageBox}>
                  <View style={styles.stageHeader}>
                    <View style={styles.stageNumber}>
                      <Text style={styles.stageNumberText}>{idx + 1}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.stageName}>{stage.stage_name}</Text>
                      {stage.days_after_sowing && (
                        <Text style={styles.stageDays}>📆 {stage.days_after_sowing}</Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.dosageBox}>
                    <Text style={styles.dosageLabel}>🧪 Chemical Dosage:</Text>
                    <Text style={styles.dosageText}>{stage.chemical_dosage}</Text>
                  </View>

                  <View style={styles.dosageBox}>
                    <Text style={styles.dosageLabel}>🌿 Organic Dosage:</Text>
                    <Text style={styles.dosageText}>{stage.organic_dosage}</Text>
                  </View>

                  {stage.spray_quantity && (
                    <View style={styles.sprayBox}>
                      <Droplets color="#3B82F6" size={18} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.sprayLabel}>Spray Quantity:</Text>
                        <Text style={styles.sprayText}>{stage.spray_quantity}</Text>
                      </View>
                    </View>
                  )}

                  {stage.best_products && stage.best_products.length > 0 && (
                    <View style={styles.productsBox}>
                      <Text style={styles.productsLabel}>⭐ Recommended Products:</Text>
                      {stage.best_products.map((prod, i) => (
                        <Text key={i} style={styles.productItem}>• {prod}</Text>
                      ))}
                    </View>
                  )}

                  <View style={styles.tipBox}>
                    <Text style={styles.tipText}>💡 {stage.application_tip}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
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
  backBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F5F9',
    alignItems: 'center', justifyContent: 'center'
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1B4332' },
  scrollView: { flex: 1 },
  farmCard: {
    backgroundColor: '#D1FAE5', margin: 16, padding: 18, borderRadius: 16,
    flexDirection: 'row', alignItems: 'center'
  },
  farmLabel: {
    fontSize: 12, fontWeight: '800', color: '#1B4332',
    letterSpacing: 0.5, marginBottom: 4
  },
  farmValue: { fontSize: 19, fontWeight: '800', color: '#1B4332' },
  inputSection: { paddingHorizontal: 16, paddingBottom: 16 },
  inputLabel: {
    fontSize: 12, fontWeight: '800', color: '#334155',
    marginBottom: 8, letterSpacing: 0.5
  },
  input: {
    borderWidth: 1.5, borderColor: '#CBD5E1', borderRadius: 14,
    padding: 16, fontSize: 16, backgroundColor: '#F8FAFC',
    color: '#0F172A', fontWeight: '500'
  },
  calcBtn: {
    backgroundColor: '#10B981', padding: 18, borderRadius: 16,
    marginTop: 16, alignItems: 'center', elevation: 3,
    shadowColor: '#10B981', shadowOpacity: 0.3
  },
  calcBtnDisabled: { backgroundColor: '#86EFAC' },
  calcBtnText: { color: '#FFF', fontWeight: '800', fontSize: 17, letterSpacing: 0.5 },
  errorText: { color: '#EF4444', marginTop: 12, textAlign: 'center', fontWeight: '600', fontSize: 14 },
  resultCard: {
    backgroundColor: '#FFF', margin: 16, marginTop: 0, padding: 20, borderRadius: 20,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8
  },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginBottom: 16, paddingBottom: 12,
    borderBottomWidth: 2, borderBottomColor: '#E2E8F0'
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1B4332' },
  summaryText: {
    fontSize: 15, color: '#475569', lineHeight: 22,
    backgroundColor: '#F0FDF4', padding: 14, borderRadius: 12
  },
  totalSummaryText: {
    fontSize: 15, color: '#1B4332', lineHeight: 24, fontWeight: '700',
    backgroundColor: '#FEF3C7', padding: 16, borderRadius: 12,
    borderLeftWidth: 4, borderLeftColor: '#F59E0B'
  },
  fertRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 13,
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9'
  },
  fertLabel: { fontSize: 15, fontWeight: '600', color: '#334155', flex: 1 },
  fertValue: { fontSize: 15, fontWeight: '800', color: '#22C55E', textAlign: 'right' },
  brandBox: {
    backgroundColor: '#F8FAFC', padding: 14, borderRadius: 12,
    marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0'
  },
  brandHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  brandName: { fontSize: 16, fontWeight: '800', color: '#1B4332' },
  brandTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  chemTag: { backgroundColor: '#DBEAFE' },
  orgTag: { backgroundColor: '#D1FAE5' },
  brandTagText: { fontSize: 11, fontWeight: '700', color: '#1E293B' },
  productName: { fontSize: 14, fontWeight: '600', color: '#475569', marginBottom: 4 },
  bestFor: { fontSize: 13, color: '#64748B', fontStyle: 'italic', marginBottom: 2 },
  priceRange: { fontSize: 13, color: '#059669', fontWeight: '700' },
  stageBox: {
    backgroundColor: '#F8FAFC', padding: 16, borderRadius: 14,
    marginBottom: 16, borderWidth: 2, borderColor: '#E2E8F0'
  },
  stageHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  stageNumber: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#22C55E',
    alignItems: 'center', justifyContent: 'center'
  },
  stageNumberText: { fontSize: 18, fontWeight: '900', color: '#FFF' },
  stageName: { fontSize: 16, fontWeight: '800', color: '#1B4332' },
  stageDays: { fontSize: 13, fontWeight: '600', color: '#64748B', marginTop: 2 },
  dosageBox: { marginBottom: 10 },
  dosageLabel: { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 4 },
  dosageText: { fontSize: 14, color: '#1E293B', lineHeight: 20, fontWeight: '500' },
  sprayBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    backgroundColor: '#DBEAFE', padding: 12, borderRadius: 10, marginBottom: 10
  },
  sprayLabel: { fontSize: 13, fontWeight: '700', color: '#1E40AF', marginBottom: 2 },
  sprayText: { fontSize: 13, fontWeight: '600', color: '#1E3A8A', lineHeight: 18 },
  productsBox: {
    backgroundColor: '#F0FDF4', padding: 12, borderRadius: 10,
    marginBottom: 10, borderLeftWidth: 3, borderLeftColor: '#22C55E'
  },
  productsLabel: { fontSize: 13, fontWeight: '700', color: '#1B4332', marginBottom: 6 },
  productItem: { fontSize: 13, color: '#166534', lineHeight: 20, fontWeight: '600' },
  tipBox: {
    backgroundColor: '#FEF3C7', padding: 12, borderRadius: 10,
    marginTop: 8, borderLeftWidth: 3, borderLeftColor: '#F59E0B'
  },
  tipText: { fontSize: 13, color: '#92400E', fontWeight: '600', lineHeight: 18 },
});
