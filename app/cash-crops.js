// app/cash-crops.js
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Animated, Alert } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Sparkles, Droplets, TrendingUp, Package, Award, ChevronDown, ChevronUp, DollarSign, Globe, Building2, Factory, Calendar, Thermometer, Bug, Wheat } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CASH_CROPS = [
  { id: 'cotton', name: 'Cotton', telugu: 'పత్తి', icon: '🦺', color: '#F8FAFC' },
  { id: 'chilli', name: 'Chilli', telugu: 'మిర్చి', icon: '🌶️', color: '#FEF2F2' },
  { id: 'sugarcane', name: 'Sugarcane', telugu: 'చెరకు', icon: '🎋', color: '#F0FDF4' },
  { id: 'maize', name: 'Maize', telugu: 'మొక్కజొన్న', icon: '🌽', color: '#FFFBEB' },
  { id: 'tobacco', name: 'Tobacco', telugu: 'పొగాకు', icon: '🍂', color: '#FAF5FF' },
  { id: 'turmeric', name: 'Turmeric', telugu: 'పసుపు', icon: '🟨', color: '#FEFCE8' },
];

export default function CashCrops() {
  const router = useRouter();
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [userLanguage, setUserLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadUserLanguage();
  }, []);

  useEffect(() => {
    if (loading) {
      Animated.loop(Animated.timing(spinAnim, { toValue: 1, duration: 2000, useNativeDriver: true })).start();
    } else {
      spinAnim.stopAnimation();
    }
  }, [loading]);

  const loadUserLanguage = async () => {
    const profile = await AsyncStorage.getItem('userProfile');
    if (profile) setUserLanguage(JSON.parse(profile).language || 'English');
  };

  const getSmartTips = async () => {
    if (!selectedCrop) {
      Alert.alert('Select Crop', 'Mundu crop select chey mowa');
      return;
    }

    setLoading(true);
    setResult(null);

    const prompt = `You are an Advanced AI Agricultural Advisor for Cash Crops.
Crop: ${selectedCrop.name} (${selectedCrop.telugu})
Language: ${userLanguage}

Return JSON with:
1. "crop_overview": Brief profit summary
2. "why_cash_crop": {high_demand, export_potential, value_addition, price_stability}
3. "investment_and_profit": {initial_investment, expected_yield, current_market_price, net_profit, roi_percentage, break_even_time}
4. "climate_and_soil": {temperature, rainfall, soil_ph, season}
5. "smart_sowing_tips": {seed_selection, seed_rate, spacing, soil_prep}
6. "water_and_nutrient_efficiency": {total_water, irrigation, fertigation, micronutrients, waste_reduction}
7. "cultivation_calendar": Array of 5 stages with stage_name, duration, activities, fertilizer, water, pest_watch
8. "yield_boosting_techniques": Array of 4 techniques with technique_name, when_to_apply, how_to_apply, cost, yield_increase, science
9. "pest_and_disease_calendar": Array of 4 major pests with name, symptoms, critical_stage, chemical_control, organic_control, prevention
10. "government_schemes": Array of 3 schemes with scheme_name, benefit, eligibility, how_to_apply
11. "market_and_harvest_strategy": {harvest_timing, harvest_method, storage_tips, market_insights, direct_selling, profit_multiplier_tip}
12. "risk_factors": Array of 3 risks with mitigation

Use 2026 Indian market data, MSP, real costs. All text in ${userLanguage}.`;

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_GEMINI_API_KEY', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.2 }
        })
      });

      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      setResult(JSON.parse(data.candidates[0].content.parts[0].text));
    } catch (err) {
      Alert.alert('Error', 'AI nunchi tips rale mowa');
    } finally {
      setLoading(false);
    }
  };

  const toggleCard = (cardId) => setExpandedCards(prev => ({...prev, [cardId]:!prev[cardId]}));
  const spin = spinAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const renderExpandableCard = (id, icon, title, content) => (
    <View style={styles.resultCard}>
      <TouchableOpacity style={styles.cardHeader} onPress={() => toggleCard(id)} activeOpacity={0.7}>
        {icon}
        <Text style={styles.cardTitle}>{title}</Text>
        {expandedCards[id]? <ChevronUp color="#64748B" size={20} /> : <ChevronDown color="#64748B" size={20} />}
      </TouchableOpacity>
      {expandedCards[id] && <View style={styles.cardContent}>{content}</View>}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color="#1B4332" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cash Crops</Text>
        <Sparkles color="#F59E0B" size={24} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SELECT CASH CROP</Text>
          <View style={styles.cropGrid}>
            {CASH_CROPS.map((crop) => (
              <TouchableOpacity
                key={crop.id}
                style={[styles.cropCard, { backgroundColor: crop.color }, selectedCrop?.id === crop.id && styles.cropCardSelected]}
                onPress={() => setSelectedCrop(crop)}
                activeOpacity={0.7}
              >
                <Text style={styles.cropIcon}>{crop.icon}</Text>
                <Text style={styles.cropName}>{crop.name}</Text>
                <Text style={styles.cropTelugu}>{crop.telugu}</Text>
                {selectedCrop?.id === crop.id && <View style={styles.selectedBadge}><Text style={styles.selectedBadgeText}>✓</Text></View>}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.tipsBtn, loading && styles.tipsBtnDisabled]}
          onPress={getSmartTips}
          disabled={loading ||!selectedCrop}
          activeOpacity={0.8}
        >
          <View style={styles.tipsBtnGradient}>
            <Sparkles color="#FFF" size={24} />
            <Text style={styles.tipsBtnText}>Smart Farming Tips</Text>
          </View>
        </TouchableOpacity>

        {loading && (
          <View style={styles.loadingCard}>
            <Animated.View style={[styles.growingPlant, { transform: [{ rotate: spin }] }]}>
              <Text style={styles.plantIcon}>🌱</Text>
            </Animated.View>
            <Text style={styles.loadingText}>
              {userLanguage === 'Telugu'? 'లాభదాయకమైనచిట్కాలను AI లెక్కిస్తోంది...' : 'AI calculating profitable tips...'}
            </Text>
          </View>
        )}

        {result &&!loading && (
          <>
            <View style={styles.resultCard}>
              <View style={styles.cardHeader}>
                <TrendingUp color="#22C55E" size={22} />
                <Text style={styles.cardTitle}>Crop Overview</Text>
              </View>
              <Text style={styles.overviewText}>{result.crop_overview}</Text>
            </View>

            {renderExpandableCard('profit', <DollarSign color="#22C55E" size={22} />, 'Investment & Profit',
              <View style={styles.profitGrid}>
                <View style={styles.profitItem}><Text style={styles.profitLabel}>Investment</Text><Text style={styles.profitAmount}>{result.investment_and_profit.initial_investment}</Text></View>
                <View style={styles.profitItem}><Text style={styles.profitLabel}>Expected Yield</Text><Text style={styles.profitAmount}>{result.investment_and_profit.expected_yield}</Text></View>
                <View style={styles.profitItem}><Text style={styles.profitLabel}>Market Price</Text><Text style={styles.profitAmount}>{result.investment_and_profit.current_market_price}</Text></View>
                <View style={styles.profitItem}><Text style={styles.profitLabel}>Net Profit</Text><Text style={[styles.profitAmount, { color: '#22C55E' }]}>{result.investment_and_profit.net_profit}</Text></View>
                <View style={styles.roiBox}>
                  <Text style={styles.roiLabel}>ROI: {result.investment_and_profit.roi_percentage} | Break-even: {result.investment_and_profit.break_even_time}</Text>
                </View>
              </View>
            )}

            {renderExpandableCard('calendar', <Calendar color="#8B5CF6" size={22} />, 'Cultivation Calendar',
              result.cultivation_calendar?.map((stage, idx) => (
                <View key={idx} style={styles.calendarStage}>
                  <View style={styles.stageNumber}><Text style={styles.stageNumberText}>{idx + 1}</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.stageName}>{stage.stage_name}</Text>
                    <Text style={styles.stageDetail}>⏱️ {stage.duration}</Text>
                    <Text style={styles.stageDetail}>📝 {stage.activities}</Text>
                    <Text style={styles.stageDetail}>🧪 {stage.fertilizer}</Text>
                    <Text style={styles.stageDetail}>💧 {stage.water}</Text>
                  </View>
                </View>
              ))
            )}

            {renderExpandableCard('yield', <TrendingUp color="#F59E0B" size={22} />, 'Yield Boosting Techniques',
              result.yield_boosting_techniques?.map((tech, idx) => (
                <View key={idx} style={styles.techniqueBox}>
                  <Text style={styles.techniqueName}>✨ {tech.technique_name}</Text>
                  <Text style={styles.techniqueDetail}>⏰ {tech.when_to_apply}</Text>
                  <Text style={styles.techniqueDetail}>📝 {tech.how_to_apply}</Text>
                  <Text style={styles.techniqueDetail}>💰 Cost: {tech.cost}</Text>
                  <View style={styles.yieldBadge}><Text style={styles.yieldText}>📈 {tech.yield_increase}</Text></View>
                </View>
              ))
            )}

            {result.market_and_harvest_strategy?.profit_multiplier_tip && (
              <View style={styles.profitBox}>
                <View style={styles.profitHeader}>
                  <Award color="#F59E0B" size={28} />
                  <Text style={styles.profitTitle}>Profit Multiplier Tip</Text>
                </View>
                <Text style={styles.profitText}>{result.market_and_harvest_strategy.profit_multiplier_tip}</Text>
                <View style={styles.profitBadge}><Text style={styles.profitBadgeText}>+20-30% Profit Potential</Text></View>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1B4332' },
  scrollView: { flex: 1 },
  section: { padding: 16 },
  sectionLabel: { fontSize: 12, fontWeight: '800', color: '#334155', marginBottom: 12, letterSpacing: 0.5 },
  cropGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  cropCard: { width: '31%', padding: 14, borderRadius: 16, alignItems: 'center', borderWidth: 2, borderColor: 'transparent', position: 'relative' },
  cropCardSelected: { borderColor: '#22C55E', borderWidth: 3, shadowColor: '#22C55E', shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  cropIcon: { fontSize: 36, marginBottom: 6 },
  cropName: { fontSize: 13, fontWeight: '700', color: '#1E293B', textAlign: 'center' },
  cropTelugu: { fontSize: 11, color: '#64748B', marginTop: 2, fontWeight: '600' },
  selectedBadge: { position: 'absolute', top: 6, right: 6, width: 22, height: 22, borderRadius: 11, backgroundColor: '#22C55E', alignItems: 'center', justifyContent: 'center' },
  selectedBadgeText: { color: '#FFF', fontSize: 12, fontWeight: '800' },
  tipsBtn: { margin: 16, borderRadius: 18, overflow: 'hidden', elevation: 5, shadowColor: '#F59E0B', shadowOpacity: 0.4, shadowRadius: 12 },
  tipsBtnDisabled: { opacity: 0.6 },
  tipsBtnGradient: { backgroundColor: '#F59E0B', padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  tipsBtnText: { color: '#FFF', fontWeight: '900', fontSize: 18, letterSpacing: 0.5 },
  loadingCard: { margin: 16, padding: 40, backgroundColor: '#FFFBEB', borderRadius: 20, alignItems: 'center', borderWidth: 2, borderColor: '#FCD34D' },
  growingPlant: { marginBottom: 16 },
  plantIcon: { fontSize: 64 },
  loadingText: { fontSize: 16, fontWeight: '700', color: '#92400E', textAlign: 'center' },
  resultCard: { backgroundColor: '#FFF', margin: 16, marginTop: 0, padding: 20, borderRadius: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16, paddingBottom: 12, borderBottomWidth: 2, borderBottomColor: '#E2E8F0' },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#1B4332', flex: 1 },
  overviewText: { fontSize: 15, color: '#475569', lineHeight: 24, backgroundColor: '#F0FDF4', padding: 16, borderRadius: 12, fontWeight: '600' },
  cardContent: { gap: 14 },
  profitGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  profitItem: { width: '48%', backgroundColor: '#F0FDF4', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#BBF7D0' },
  profitLabel: { fontSize: 12, fontWeight: '600', color: '#166534', marginBottom: 6 },
  profitAmount: { fontSize: 16, fontWeight: '800', color: '#1B4332' },
  roiBox: { backgroundColor: '#FEF3C7', padding: 14, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 },
  roiLabel: { fontSize: 14, fontWeight: '800', color: '#92400E' },
  calendarStage: { flexDirection: 'row', gap: 12, backgroundColor: '#F8FAFC', padding: 14, borderRadius: 14, marginBottom: 12, borderLeftWidth: 3, borderLeftColor: '#8B5CF6' },
  stageNumber: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#8B5CF6', alignItems: 'center', justifyContent: 'center' },
  stageNumberText: { fontSize: 16, fontWeight: '900', color: '#FFF' },
  stageName: { fontSize: 15, fontWeight: '800', color: '#1B4332', marginBottom: 6 },
  stageDetail: { fontSize: 13, color: '#475569', lineHeight: 20, marginBottom: 3 },
  techniqueBox: { backgroundColor: '#FFFBEB', padding: 16, borderRadius: 14, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#F59E0B' },
  techniqueName: { fontSize: 16, fontWeight: '800', color: '#92400E', marginBottom: 8 },
  techniqueDetail: { fontSize: 13, color: '#78350F', lineHeight: 20, marginBottom: 4 },
  yieldBadge: { backgroundColor: '#22C55E', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, alignSelf: 'flex-start', marginTop: 8 },
  yieldText: { fontSize: 12, fontWeight: '800', color: '#FFF' },
  profitBox: { margin: 16, padding: 24, borderRadius: 20, backgroundColor: '#FFFBEB', borderWidth: 3, borderColor: '#FCD34D', shadowColor: '#F59E0B', shadowOpacity: 0.3, shadowRadius: 12, elevation: 8 },
  profitHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  profitTitle: { fontSize: 20, fontWeight: '900', color: '#92400E' },
  profitText: { fontSize: 15, color: '#78350F', lineHeight: 24, fontWeight: '700', marginBottom: 16 },
  profitBadge: { backgroundColor: '#F59E0B', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, alignSelf: 'flex-start' },
  profitBadgeText: { fontSize: 14, fontWeight: '900', color: '#FFF' },
});
