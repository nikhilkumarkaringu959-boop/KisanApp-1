import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Leaf, Cloud, Droplets, Bug, Sprout, Building2, ChevronRight, ChevronLeft, Menu, Camera, MapPin, Wind, Droplet, Sun, User, Send, Sparkles } from 'lucide-react-native';
import * as Location from 'expo-location';

type Screen = 'Language' | 'Home' | 'CropInfo' | 'Weather' | 'Fertilizer' | 'Pest' | 'CashCrops' | 'GovtSchemes' | 'KisanAI';
type CropTab = 'Kharif' | 'Rabi' | 'Zaid';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Language');
  const [language, setLanguage] = useState('English');
  const [userName] = useState('Nikhil');
  const [cropTab, setCropTab] = useState<CropTab>('Kharif');
  const [landSize, setLandSize] = useState('2.5');
  const [soilType, setSoilType] = useState('Red Soil');
  const [cropName, setCropName] = useState('');
  const [fertilizerResult, setFertilizerResult] = useState('');
  const [selectedState, setSelectedState] = useState('Telangana');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([
    { id: 1, text: 'Namaste! Nenu KISAN AI ni 🌾\n\nEm adagali mowa? Crop, fertilizer, pest gurinchi adugu!', isAI: true }
  ]);
  const scrollRef = useRef<ScrollView>(null);

  const fetchWeather = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status!== 'granted') {
        alert('Location permission kavali mowa!');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=8b5553bee19b77af9b96c40a2b0c2cbf&units=metric`);
      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      setWeatherData({
        name: 'Hyderabad',
        main: { temp: 27.5, humidity: 73, feels_like: 28 },
        weather: [{ main: 'Clear Sky' }],
        wind: { speed: 14.5 }
      });
    }
  };

  useEffect(() => {
    if (currentScreen === 'Weather' &&!weatherData) fetchWeather();
  }, [currentScreen]);

  const FERTILIZER_DB: any = {
    'paddy': { npk: '100:50:50', urea: '110kg in 3 splits', dap: '50kg basal', mop: '35kg', cost: '₹3,600/acre', yield: '25-30 quintal' },
    'cotton': { npk: '120:60:60', urea: '130kg in 2 splits', dap: '60kg basal', mop: '40kg', cost: '₹4,500/acre', yield: '8-12 quintal' },
    'sugarcane': { npk: '250:115:115', urea: '275kg in 3 splits', ssp: '720kg', mop: '190kg', fym: '25 tons', cost: '₹10,500/acre', yield: '40-50 tons' },
    'maize': { npk: '120:60:40', urea: '130kg', dap: '60kg', mop: '25kg', cost: '₹3,800/acre', yield: '20-25 quintal' },
    'chilli': { npk: '200:100:100', urea: '220kg', dap: '100kg', mop: '65kg', cost: '₹6,000/acre', yield: '15-20 quintal dry' },
    'turmeric': { npk: '200:100:100', urea: '220kg', dap: '100kg', mop: '65kg', cost: '₹6,200/acre', yield: '25-30 quintal' }
  };

  const calculateFertilizer = () => {
    const crop = cropName.toLowerCase().trim();
    const data = FERTILIZER_DB;
    if (!data) {
      setFertilizerResult('Crop name correct ga type chey mowa!\n\nAvailable: paddy, cotton, sugarcane, maize, chilli, turmeric');
      return;
    }
    const acres = parseFloat(landSize) || 1;
    setFertilizerResult(`🌾 **${crop.toUpperCase()} - ${landSize} Acres**

**NPK Required:** ${data.npk} kg/acre
**Total for ${landSize} acres:** NPK ${(parseFloat(data.npk.split(':')[0]) * acres).toFixed(0)}:${(parseFloat(data.npk.split(':')[1]) * acres).toFixed(0)}:${(parseFloat(data.npk.split(':')[2]) * acres).toFixed(0)} kg

**Schedule:**
1. **Basal:** ${data.dap}, ${data.mop}
2. **Top Dressing:** ${data.urea}
${data.fym? `3. **FYM:** ${data.fym}` : ''}
${data.ssp? `4. **SSP:** ${data.ssp}` : ''}

**Soil Type:** ${soilType}
${soilType === 'Red Soil'? '✅ Add 10kg Zinc Sulphate/acre' : ''}
${soilType === 'Black Soil'? '✅ Add 5kg Sulphur/acre' : ''}

**Total Cost:** ${data.cost} per acre
**Expected Yield:** ${data.yield}

**Tips:**
- Apply morning 6-9 AM or evening 4-7 PM
- Irrigate immediately after urea
- Split dose = better uptake 40%
- Don't apply in standing water`);
  };
const AI_DB: any = {
    'bollworm': `🐛 **Bollworm Control - Cotton**

**Identification:**
- Small holes in bolls, squares
- Larvae 2-4cm inside bolls
- Frass visible outside

**Organic Treatment:**
1. Neem oil 5ml + soap 1g per liter - spray evening 5-7 PM
2. Pheromone traps - 5 per acre @ ₹50 each
3. Trichogramma cards - 1 lakh eggs/acre @ ₹200
4. HaNPV 250 LE/acre - biopesticide

**Chemical Treatment:**
1. **Chlorantraniliprole 18.5% SC** - 0.3ml/L water
   Cost: ₹400/acre | Spray: 60 & 75 DAS
2. **Emamectin benzoate 5% SG** - 0.5g/L
   Cost: ₹350/acre | Interval: 15 days
3. **Spinosad 45% SC** - 0.3ml/L
   Cost: ₹500/acre | Best for resistance

**Prevention:**
- Bt cotton seeds - 90% protection
- Crop rotation with pulses/maize
- Remove crop residue after harvest
- Avoid excessive nitrogen - attracts pests

**Economic Loss:** 30-40% if untreated | **Cost:** ₹800-1200/acre`,

    'fertilizer': `💊 **Fertilizer Doses Per Acre**

**Paddy:** NPK 100:50:50
- Urea 110kg in 3 splits (Basal 25kg, Tillering 44kg, Panicle 44kg)
- DAP 50kg basal | MOP 35kg
- Cost: ₹3,600 | Yield: 25-30 quintal

**Cotton:** NPK 120:60:60
- Urea 130kg in 2 splits (Basal 65kg, Flowering 65kg)
- DAP 60kg basal | MOP 40kg
- Cost: ₹4,500 | Yield: 8-12 quintal

**Sugarcane:** NPK 250:115:115
- FYM 25 tons before planting
- Urea 275kg in 3 splits
- SSP 720kg | MOP 190kg
- Cost: ₹10,500 | Yield: 40-50 tons

**Apply 6-9 AM or 4-7 PM. Irrigate after urea!**`,

    'disease': `🌿 **Leaf Blight Treatment**

**Symptoms:** 
- Brown circular spots with yellow halos
- Spreads from leaf tip downwards
- In high humidity >80%

**Organic Solution:**
1. Copper oxychloride 50% WP - 2.5g/L water
2. Neem oil 5ml/L + soap 1g - weekly spray
3. Remove infected leaves - burn them
4. Improve air circulation - maintain spacing

**Chemical Solution:**
1. Mancozeb 75% WP - 2g/L water
2. Carbendazim 50% WP - 1g/L water
3. Spray interval: 10 days
4. Rotate chemicals - resistance raakunda

**Prevention:**
- Seed treatment: Carbendazim 2g/kg seed
- Avoid overhead irrigation
- Maintain 30x10cm spacing
- Crop rotation with maize/pulses

**Cost:** ₹400-600/acre | **Recovery:** 7-10 days`,

    'weather': `🌦️ **Weather-Based Farming Advice**

**High Temperature (>35°C):**
🔥 Immediate Actions:
- Irrigate evening 6-9 PM only
- Mulching mandatory - saves 40% water
- Shade net for nursery
- Avoid spraying 11 AM - 4 PM
- Crops: Heat stress in cotton, vegetables

**High Humidity (>80%):**
💧 Disease Risk:
- Fungal diseases: Blight, Mildew, Rust
- Preventive spray: Mancozeb 2.5g/L
- Improve air circulation
- Avoid overhead irrigation
- Drain excess water

**Rain Expected:**
☔ Don't Do:
- Pesticide spraying - will wash off
- Fertilizer application - leaching loss
- Harvesting - grain moisture increase

☔ Do:
- Drain field channels
- Cover harvested crops
- Postpone irrigation

**Cold (<15°C):**
❄️ Frost Protection:
- Light irrigation evening
- Smoke in field early morning
- Cover young plants
- Crops affected: Tomato, Chilli, Mango flowers`,

    'soil': `🌍 **Soil Health Improve Chey**

**Soil Test - Every 3 Years:**
- Cost: ₹200 at KVK
- Tests: pH, NPK, Organic Carbon, Micro
- Get Soil Health Card

**Improve Organic Carbon:**
1. FYM: 10 tons/acre yearly - OC +0.5%
2. Vermicompost: 2 tons/acre
3. Green Manure: Sunhemp/Dhaincha before crop
4. Crop Residue: Incorporate, don't burn

**pH Management:**
- Acidic (<6.5): Lime 2 tons/acre
- Alkaline (>7.5): Gypsum 1 ton/acre
- Ideal: 6.5-7.5 for most crops

**Biofertilizers:**
- Rhizobium: Pulses - 200g/acre seed treatment
- Azotobacter: Cereals - 200g/acre
- PSB: All crops - 200g/acre
- Cost: ₹50 each | Benefit: 20% NPK save

**Crop Rotation:**
- Cotton → Wheat → Maize
- Paddy → Pulses → Vegetables
- Breaks pest cycle, improves soil`,

    'pest': `🐛 **Common Pests Control**

**1. Stem Borer (Paddy)**
- Symptoms: Dead hearts, white heads
- Organic: Trichogramma cards 1 lakh/acre
- Chemical: Cartap hydrochloride 50% SP - 1g/L
- Light traps: 1 per acre

**2. Brown Plant Hopper (Paddy)**
- Symptoms: Hopper burn, plants dry
- Treatment: Imidacloprid 17.8% SL - 0.5ml/L
- Drain water completely
- Avoid excess nitrogen

**3. Whitefly (Cotton/Chilli)**
- Symptoms: Yellowing, leaf curl virus
- Treatment: Imidacloprid 0.5ml/L + Neem oil
- Yellow sticky traps 10/acre

**4. Aphids (All crops)**
- Symptoms: Curled leaves, honeydew
- Treatment: Dimethoate 2ml/L
- Ladybird beetles - natural predator`,

    'default': `Nenu farming expert ni mowa! 🌾

**Specific ga adugu:**

**Diseases:**
- "cotton lo bollworm vachindi"
- "paddy leaf yellow ayindi"
- "sugarcane red rot"

**Fertilizer:**
- "cotton fertilizer dose"
- "paddy NPK schedule"
- "sugarcane urea entha"

**Pest:**
- "paddy stem borer treatment"
- "whitefly control"

**Other:**
- "weather farming tips"
- "soil health improve cheyali"
- "drip irrigation cost"
- "market price cotton"

**Crop name + problem cheppu** - exact solution ista! 💯`
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { id: Date.now(), text: chatInput, isAI: false };
    setChatMessages(prev => [...prev, userMsg]);
    
    const msg = chatInput.toLowerCase();
    let response = AI_DB.default;
    if (msg.includes('bollworm') || (msg.includes('cotton') && msg.includes('worm'))) response = AI_DB.bollworm;
    else if (msg.includes('fertilizer') || msg.includes('npk') || msg.includes('urea') || msg.includes('dose')) response = AI_DB.fertilizer;
    else if (msg.includes('disease') || msg.includes('leaf') || msg.includes('blight') || msg.includes('yellow')) response = AI_DB.disease;
    else if (msg.includes('weather') || msg.includes('temperature') || msg.includes('rain')) response = AI_DB.weather;
    else if (msg.includes('soil')) response = AI_DB.soil;
    else if (msg.includes('pest') || msg.includes('borer') || msg.includes('whitefly')) response = AI_DB.pest;
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { id: Date.now() + 1, text: response, isAI: true }]);
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 600);
    setChatInput('');
  };
const CROPS = {
    Kharif: {
      'Cereals & Millets': ['Paddy/Rice', 'Corn', 'Jowar', 'Bajra', 'Ragi'],
      'Pulses': ['Tur', 'Moong', 'Urad'],
      'Oil Seeds': ['Soybean', 'Groundnut', 'Sesame']
    },
    Rabi: {
      'Cereals': ['Wheat', 'Barley'],
      'Pulses': ['Gram', 'Masoor', 'Peas'],
      'Oil Seeds': ['Mustard', 'Linseed']
    },
    Zaid: {
      'Cereals': ['Maize', 'Rice'],
      'Vegetables': ['Watermelon', 'Muskmelon', 'Cucumber'],
      'Fodder': ['Fodder Maize', 'Fodder Jowar']
    }
  };

  const SCHEMES = {
    Telangana: [
      { name: 'Rythu Bharosa 2026', benefit: '₹7500 per acre/season', docs: 'Passbook, Aadhaar, Bank Link', status: 'Funds release scheduled for Kharif soon' },
      { name: 'Runa Maaphee (Loan Waiver)', benefit: 'Crop loans up to ₹2 Lakhs', docs: 'Bank Loan Account, Aadhaar', status: 'Phase 3 list released online' },
      { name: 'PM-KISAN', benefit: '₹6000/year in 3 installments', docs: 'Land Records, Aadhaar, Bank', status: 'Next installment releasing soon' }
    ],
    AndhraPradesh: [
      { name: 'YSR Rythu Bharosa', benefit: '₹13500/year', docs: 'Passbook, Aadhaar', status: 'Installment credited' },
      { name: 'PM-KISAN', benefit: '₹6000/year', docs: 'Land Records, Aadhaar', status: 'Active' }
    ]
  };

  const LanguageScreen = () => (
    <View style={styles.languageContainer}>
      <Leaf color="#16A34A" size={60} />
      <Text style={styles.logoText}>KISAN</Text>
      <Text style={styles.subtitle}>The Smart Farming Assistant</Text>
      <Text style={styles.selectText}>Please select your language / దయచేసి మీ భాషను ఎంచుకోండి</Text>
      {['English', 'Telugu (తెలుగు)', 'Hindi (हिंदी)', 'Tamil (தமிழ்)', 'Kannada (ಕನ್ನಡ)'].map(lang => (
        <TouchableOpacity key={lang} style={styles.langBtn} onPress={() => { setLanguage(lang); setCurrentScreen('Home'); }}>
          <Text style={styles.langText}>{lang}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const HomeScreen = () => (
    <ScrollView style={styles.container}>
      <View style={styles.homeHeader}>
        <Menu color="#16A34A" size={24} />
        <Text style={styles.kisanLogo}>KISAN <Leaf color="#16A34A" size={20} /></Text>
      </View>
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeText}>Welcome back, {userName}! 👋</Text>
        <Text style={styles.welcomeSub}>Your smart farming is ready.</Text>
      </View>
      <View style={styles.govtBanner}>
        <Building2 color="#fff" size={24} />
        <View style={{ flex: 1 }}>
          <Text style={styles.govtTitle}>GOVT UPDATE</Text>
          <Text style={styles.govtText}>PM-KISAN next installment releasing soon. Check status.</Text>
        </View>
      </View>
      <View style={styles.gridContainer}>
        {[
          { icon: Sprout, label: 'Crop Information', screen: 'CropInfo', color: '#10B981' },
          { icon: Cloud, label: 'Weather Forecast', screen: 'Weather', color: '#3B82F6' },
          { icon: Droplets, label: 'Smart Fertilizer', screen: 'Fertilizer', color: '#8B5CF6' },
          { icon: Bug, label: 'Pest & Disease', screen: 'Pest', color: '#EF4444' },
          { icon: Leaf, label: 'Cash Crop Tips', screen: 'CashCrops', color: '#22C55E' },
          { icon: Building2, label: 'Govt Schemes', screen: 'GovtSchemes', color: '#F59E0B' },
        ].map(item => (
          <TouchableOpacity key={item.label} style={styles.gridItem} onPress={() => setCurrentScreen(item.screen as Screen)}>
            <View style={[styles.iconCircle, { backgroundColor: item.color + '20' }]}>
              <item.icon color={item.color} size={28} />
            </View>
            <Text style={styles.gridLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  const CropInfoScreen = () => (
    <View style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')}><ChevronLeft color="#fff" size={24} /></TouchableOpacity>
        <Text style={styles.screenTitle}>Crop Information</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.tabContainer}>
        {(['Kharif', 'Rabi', 'Zaid'] as CropTab[]).map(tab => (
          <TouchableOpacity key={tab} style={[styles.tab, cropTab === tab && styles.activeTab]} onPress={() => setCropTab(tab)}>
            <Text style={[styles.tabText, cropTab === tab && styles.activeTabText]}>{tab} Crops</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView>
        {Object.entries(CROPS[cropTab]).map(([category, crops]) => (
          <View key={category} style={styles.cropSection}>
            <Text style={styles.cropCategory}>{category}</Text>
            {crops.map(crop => (
              <TouchableOpacity key={crop} style={styles.cropItem} onPress={() => alert(`${crop}\n\nSowing: June-July\nHarvest: Oct-Nov\nWater: 500-700mm\nYield: 20-25 quintal/acre`)}>
                <Text style={styles.cropName}>{crop}</Text>
                <ChevronRight color="#9CA3AF" size={20} />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const WeatherScreen = () => (
    <View style={styles.container}>
      <View style={[styles.screenHeader, { backgroundColor: '#2563EB' }]}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')}><ChevronLeft color="#fff" size={24} /></TouchableOpacity>
        <Text style={styles.screenTitle}>Real-time Weather</Text>
        <View style={{ width: 24 }} />
      </View>
      {!weatherData? (
        <View style={styles.weatherEmpty}>
          <View style={styles.weatherCard}>
            <Cloud color="#3B82F6" size={60} />
            <Text style={styles.weatherTitle}>Get Live Weather Forecast</Text>
            <Text style={styles.weatherSub}>Fetch real-time data for your farm's location.</Text>
            <TouchableOpacity style={styles.weatherBtn} onPress={fetchWeather}>
              <Text style={styles.weatherBtnText}>Fetch Weather</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.weatherMain}>
            <View style={styles.locationRow}>
              <MapPin color="#fff" size={16} />
              <Text style={styles.locationText}>Your Location</Text>
            </View>
            <Text style={styles.tempText}>{Math.round(weatherData.main.temp)}°C</Text>
            <Text style={styles.weatherDesc}>{weatherData.weather[0].main}</Text>
            <View style={styles.weatherStats}>
              <View style={styles.statItem}>
                <Droplet color="#fff" size={20} />
                <Text style={styles.statValue}>{weatherData.main.humidity}%</Text>
              </View>
              <View style={styles.statItem}>
                <Wind color="#fff" size={20} />
                <Text style={styles.statValue}>{weatherData.wind.speed} km/h</Text>
              </View>
              <View style={styles.statItem}>
                <Cloud color="#fff" size={20} />
                <Text style={styles.statValue}>0 mm</Text>
              </View>
            </View>
          </View>
          <View style={styles.forecastSection}>
            <Text style={styles.sectionTitle}>24-Hour Forecast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['Now', '2 PM', '4 PM', '6 PM'].map((time, i) => (
                <View key={time} style={styles.hourCard}>
                  <Text style={styles.hourTime}>{time}</Text>
                  <Sun color="#F59E0B" size={24} />
                  <Text style={styles.hourTemp}>{26 - i}°</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.forecastSection}>
            <Text style={styles.sectionTitle}>7-Day Forecast</Text>
            {['Today', 'Thu', 'Fri', 'Sat'].map((day, i) => (
              <View key={day} style={styles.dayRow}>
                <Text style={styles.dayName}>{day}</Text>
                <View style={styles.dayMid}>
                  <Droplet color="#3B82F6" size={16} />
                  <Text style={styles.dayRain}>{[41, 31, 51, 46][i]}%</Text>
                </View>
                <Text style={styles.dayTemp}>{36}° / {25 - i}°</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
const FertilizerScreen = () => (
    <View style={styles.container}>
      <View style={[styles.screenHeader, { backgroundColor: '#8B5CF6' }]}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')}><ChevronLeft color="#fff" size={24} /></TouchableOpacity>
        <Text style={styles.screenTitle}>Smart Fertilizer AI</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.fertCard}>
          <View style={styles.fertHeader}>
            <Sprout color="#8B5CF6" size={24} />
            <Text style={styles.fertTitle}>Farm Context</Text>
          </View>
          <View style={styles.fertRow}>
            <View style={styles.fertInput}>
              <Text style={styles.fertLabel}>LAND SIZE</Text>
              <TextInput style={styles.fertValue} value={landSize} onChangeText={setLandSize} keyboardType="decimal-pad" />
            </View>
            <View style={styles.fertInput}>
              <Text style={styles.fertLabel}>SOIL TYPE</Text>
              <TextInput style={styles.fertValue} value={soilType} onChangeText={setSoilType} />
            </View>
          </View>
          <Text style={styles.fertQuestion}>What crop are you planning?</Text>
          <TextInput style={styles.fertCropInput} placeholder="e.g., Paddy, Cotton, Chilli..." value={cropName} onChangeText={setCropName} />
          <TouchableOpacity style={styles.fertBtn} onPress={calculateFertilizer}>
            <Text style={styles.fertBtnText}>Calculate Formula</Text>
          </TouchableOpacity>
          {fertilizerResult? <Text style={styles.fertResult}>{fertilizerResult}</Text> : null}
        </View>
      </ScrollView>
    </View>
  );

  const PestScreen = () => (
    <View style={styles.container}>
      <View style={[styles.screenHeader, { backgroundColor: '#DC2626' }]}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')}><ChevronLeft color="#fff" size={24} /></TouchableOpacity>
        <Text style={styles.screenTitle}>Smart Pest Control</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.pestContainer}>
        <View style={styles.pestBox}>
          <Camera color="#DC2626" size={60} />
          <Text style={styles.pestTitle}>Take a Photo of the Infected Leaf</Text>
          <Text style={styles.pestSub}>AI will instantly identify the pest or disease and suggest solutions.</Text>
          <TouchableOpacity style={styles.pestBtn} onPress={() => { setCurrentScreen('KisanAI'); setChatInput('cotton bollworm treatment'); }}>
            <Camera color="#fff" size={20} />
            <Text style={styles.pestBtnText}>Scan Crop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const CashCropsScreen = () => {
    const [selectedCrop, setSelectedCrop] = useState('Cotton');
    const crops = [
      { name: 'Cotton', icon: '🦺', tips: { sowing: 'Use high-density planting (90x30 cm). Treat seeds with Imidacloprid to prevent early sucking pests.', water: 'Adopt drip irrigation to save 40% water. Use fertigation for targeted nutrient delivery directly to roots.', yield: 'Topping Technique: Clip the terminal shoots at 80-90 days to stop vertical growth and redirect energy to boll/fruit development.' } },
      { name: 'Chilli', icon: '🌶️', tips: { sowing: 'Transplant 45-day old seedlings. Spacing 60x45cm.', water: 'Drip irrigation mandatory. Avoid water stress at flowering.', yield: 'Pinch apical buds at 30 days for more branches.' } },
      { name: 'Sugarcane', icon: '🎋', tips: { sowing: 'Use 3-bud setts. Spacing 120cm. Treat with Carbendazim.', water: 'Furrow irrigation. Critical at tillering & grand growth.', yield: 'Earthing up at 90 days. Propping to prevent lodging.' } },
      { name: 'Maize', icon: '🌽', tips: { sowing: 'Spacing 60x20cm. Seed treatment with Imidacloprid.', water: '4-5 irrigations. Critical at tasseling & silking.', yield: 'Detasseling in seed production. Nipping at 30 days.' } }
    ];
    const crop = crops.find(c => c.name === selectedCrop) || crops[0];
    
    return (
      <View style={styles.container}>
        <View style={[styles.screenHeader, { backgroundColor: '#EA580C' }]}>
          <TouchableOpacity onPress={() => setCurrentScreen('Home')}><ChevronLeft color="#fff" size={24} /></TouchableOpacity>
          <Text style={styles.screenTitle}>High-Yield Cash Crops</Text>
          <View style={{ width: 24 }} />
        </View>
        <ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cropTabs}>
            {crops.map(c => (
              <TouchableOpacity key={c.name} style={[styles.cropTab, selectedCrop === c.name && styles.cropTabActive]} onPress={() => setSelectedCrop(c.name)}>
                <Text style={styles.cropTabIcon}>{c.icon}</Text>
                <Text style={styles.cropTabText}>{c.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Maximize profits for {selectedCrop} through scientific management and timely market entry.</Text>
          </View>
          <View style={styles.tipSection}>
            <Text style={styles.tipSectionTitle}>Smart Sowing</Text>
            <Text style={styles.tipText}>{crop.tips.sowing}</Text>
          </View>
          <View style={styles.tipSection}>
            <Text style={styles.tipSectionTitle}>Water Management (నీటి యాజమాన్యం)</Text>
            <Text style={styles.tipText}>{crop.tips.water}</Text>
          </View>
          <View style={styles.tipSection}>
            <Text style={styles.tipSectionTitle}>Yield Boost (తలలు తుంచడం)</Text>
            <Text style={styles.tipText}>{crop.tips.yield}</Text>
          </View>
          <View style={styles.profitCard}>
            <Text style={styles.profitTitle}>💰 Profit Multiplier Tip & Market Strategy</Text>
            <Text style={styles.profitText}>• Grade your produce - 20% higher price{'\n'}• Sell when 10% above MSP{'\n'}• Direct selling - avoid middlemen{'\n'}• Use E-NAM app for best rates</Text>
          </View>
        </ScrollView>
      </View>
    );
  };

  const GovtSchemesScreen = () => (
    <View style={styles.container}>
      <View style={[styles.screenHeader, { backgroundColor: '#1E40AF' }]}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')}><ChevronLeft color="#fff" size={24} /></TouchableOpacity>
        <Text style={styles.screenTitle}>Govt Schemes & Updates</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.stateSelect}>
          <Text style={styles.stateLabel}>Select Your State:</Text>
          <TouchableOpacity style={styles.stateDropdown}>
            <Text style={styles.stateText}>{selectedState}</Text>
            <ChevronRight color="#6B7280" size={20} />
          </TouchableOpacity>
        </View>
        {SCHEMES.Telangana.map((scheme, i) => (
          <View key={i} style={styles.schemeCard}>
            <Text style={styles.schemeName}>{scheme.name}</Text>
            <View style={styles.schemeStatus}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Live Status: {scheme.status}</Text>
            </View>
            <Text style={styles.schemeBenefit}>Benefits: {scheme.benefit}</Text>
            <Text style={styles.schemeDocs}>Documents: {scheme.docs}</Text>
            <TouchableOpacity style={styles.schemeBtn}>
              <Text style={styles.schemeBtnText}>Check Official Status</Text>
              <ChevronRight color="#fff" size={18} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
const KisanAIScreen = () => (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding' : 'height'} style={styles.container}>
      <View style={[styles.screenHeader, { backgroundColor: '#059669' }]}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')}><ChevronLeft color="#fff" size={24} /></TouchableOpacity>
        <View style={styles.aiHeaderCenter}>
          <Sparkles color="#F59E0B" size={20} />
          <Text style={styles.screenTitle}>KISAN AI</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView ref={scrollRef} style={styles.chatContainer} onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
        {chatMessages.map(msg => (
          <View key={msg.id} style={[styles.chatRow, msg.isAI? styles.aiRow : styles.userRow]}>
            {msg.isAI && <View style={styles.aiAvatar}><Leaf color="#16A34A" size={18} /></View>}
            <View style={[styles.chatBubble, msg.isAI? styles.aiBubble : styles.userBubble]}>
              <Text style={[styles.chatText, msg.isAI? styles.aiText : styles.userText]}>{msg.text}</Text>
            </View>
            {!msg.isAI && <View style={styles.userAvatar}><User color="#fff" size={18} /></View>}
          </View>
        ))}
      </ScrollView>
      <View style={styles.chatInputBox}>
        <TextInput style={styles.chatInput} placeholder="Ask: cotton bollworm, paddy fertilizer..." value={chatInput} onChangeText={setChatInput} multiline />
        <TouchableOpacity style={styles.sendBtn} onPress={sendChatMessage}>
          <Send color="#fff" size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

  const BottomNav = () => (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('Home')}>
        <MapPin color={currentScreen === 'Home'? '#16A34A' : '#9CA3AF'} size={24} />
        <Text style={[styles.navText, currentScreen === 'Home' && styles.navTextActive]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.centerNav} onPress={() => setCurrentScreen('KisanAI')}>
        <View style={styles.centerBtn}>
          <Leaf color="#fff" size={28} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <User color="#9CA3AF" size={24} />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar barStyle="dark-content" />
      {currentScreen === 'Language' && <LanguageScreen />}
      {currentScreen === 'Home' && <HomeScreen />}
      {currentScreen === 'CropInfo' && <CropInfoScreen />}
      {currentScreen === 'Weather' && <WeatherScreen />}
      {currentScreen === 'Fertilizer' && <FertilizerScreen />}
      {currentScreen === 'Pest' && <PestScreen />}
      {currentScreen === 'CashCrops' && <CashCropsScreen />}
      {currentScreen === 'GovtSchemes' && <GovtSchemesScreen />}
      {currentScreen === 'KisanAI' && <KisanAIScreen />}
      {currentScreen!== 'Language' && <BottomNav />}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  languageContainer: { flex: 1, backgroundColor: '#F0FDF4', alignItems: 'center', justifyContent: 'center', padding: 20 },
  logoText: { fontSize: 48, fontWeight: '800', color: '#16A34A', marginTop: 20 },
  subtitle: { fontSize: 18, color: '#6B7280', marginTop: 8 },
  selectText: { fontSize: 16, color: '#374151', marginTop: 40, marginBottom: 20, textAlign: 'center' },
  langBtn: { width: '100%', backgroundColor: '#fff', padding: 18, borderRadius: 12, borderWidth: 2, borderColor: '#16A34A', marginBottom: 12 },
  langText: { fontSize: 18, fontWeight: '600', color: '#16A34A', textAlign: 'center' },
  homeHeader: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  kisanLogo: { fontSize: 24, fontWeight: '800', color: '#16A34A', marginLeft: 12 },
  welcomeBox: { padding: 20 },
  welcomeText: { fontSize: 28, fontWeight: '700', color: '#1F2937' },
  welcomeSub: { fontSize: 16, color: '#16A34A', marginTop: 4 },
  govtBanner: { backgroundColor: '#2563EB', margin: 16, padding: 16, borderRadius: 16, flexDirection: 'row', gap: 12 },
  govtTitle: { color: '#BFDBFE', fontSize: 12, fontWeight: '700', marginBottom: 4 },
  govtText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 8 },
  gridItem: { width: '50%', padding: 8 },
  iconCircle: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  gridLabel: { fontSize: 15, fontWeight: '600', color: '#1F2937', textAlign: 'center' },
  screenHeader: { backgroundColor: '#16A34A', padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  screenTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  tabContainer: { flexDirection: 'row', backgroundColor: '#fff', padding: 8 },
  tab: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
  activeTab: { backgroundColor: '#F0FDF4' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  activeTabText: { color: '#16A34A' },
  cropSection: { backgroundColor: '#fff', margin: 12, borderRadius: 12, padding: 16 },
  cropCategory: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  cropItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  cropName: { fontSize: 16, color: '#374151' },
  weatherEmpty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  weatherCard: { backgroundColor: '#fff', padding: 32, borderRadius: 20, alignItems: 'center', width: '100%', maxWidth: 400 },
  weatherTitle: { fontSize: 22, fontWeight: '700', color: '#1F2937', marginTop: 16 },
  weatherSub: { fontSize: 15, color: '#6B7280', marginTop: 8, textAlign: 'center' },
  weatherBtn: { backgroundColor: '#3B82F6', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12, marginTop: 20 },
  weatherBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  weatherMain: { backgroundColor: '#3B82F6', padding: 32, alignItems: 'center' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  locationText: { color: '#BFDBFE', fontSize: 14 },
  tempText: { fontSize: 72, fontWeight: '300', color: '#fff' },
  weatherDesc: { fontSize: 20, color: '#fff', marginTop: 8 },
  weatherStats: { flexDirection: 'row', gap: 32, marginTop: 24 },
  statItem: { alignItems: 'center', gap: 8 },
  statValue: { color: '#fff', fontSize: 16, fontWeight: '600' },
  forecastSection: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  hourCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, alignItems: 'center', marginRight: 12, width: 80 },
  hourTime: { fontSize: 14, color: '#6B7280', marginBottom: 8 },
  hourTemp: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginTop: 8 },
  dayRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 8 },
  dayName: { fontSize: 16, fontWeight: '600', color: '#1F2937', width: 80 },
  dayMid: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dayRain: { fontSize: 14, color: '#6B7280' },
  dayTemp: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  content: { flex: 1, padding: 16 },
  fertCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20 },
  fertHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  fertTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937' },
  fertRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  fertInput: { flex: 1 },
  fertLabel: { fontSize: 12, fontWeight: '700', color: '#6B7280', marginBottom: 6 },
  fertValue: { backgroundColor: '#F3F4F6', borderRadius: 8, padding: 12, fontSize: 16, fontWeight: '600', color: '#1F2937' },
  fertQuestion: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 12 },
  fertCropInput: { backgroundColor: '#F3F4F6', borderRadius: 8, padding: 14, fontSize: 16, marginBottom: 16 },
  fertBtn: { backgroundColor: '#8B5CF6', padding: 16, borderRadius: 12, alignItems: 'center' },
  fertBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  fertResult: { marginTop: 20, fontSize: 15, lineHeight: 24, color: '#374151' },
  pestContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  pestBox: { backgroundColor: '#fff', padding: 32, borderRadius: 20, alignItems: 'center', width: '100%', maxWidth: 400 },
  pestTitle: { fontSize: 22, fontWeight: '700', color: '#1F2937', marginTop: 16, textAlign: 'center' },
  pestSub: { fontSize: 15, color: '#6B7280', marginTop: 8, textAlign: 'center', lineHeight: 22 },
  pestBtn: { backgroundColor: '#DC2626', flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12, marginTop: 20 },
  pestBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cropTabs: { padding: 16 },
  cropTab: { backgroundColor: '#F3F4F6', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, marginRight: 12, alignItems: 'center' },
  cropTabActive: { backgroundColor: '#FED7AA', borderWidth: 2, borderColor: '#EA580C' },
  cropTabIcon: { fontSize: 24, marginBottom: 4 },
  cropTabText: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  tipCard: { backgroundColor: '#FFF7ED', margin: 16, padding: 16, borderRadius: 12 },
  tipTitle: { fontSize: 16, fontWeight: '600', color: '#9A3412', lineHeight: 24 },
  tipSection: { backgroundColor: '#fff', margin: 16, marginTop: 0, padding: 16, borderRadius: 12 },
  tipSectionTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  tipText: { fontSize: 15, color: '#374151', lineHeight: 24 },
  profitCard: { backgroundColor: '#FEF3C7', margin: 16, marginTop: 0, padding: 16, borderRadius: 12, borderWidth: 2, borderColor: '#F59E0B' },
  profitTitle: { fontSize: 18, fontWeight: '700', color: '#92400E', marginBottom: 12 },
  profitText: { fontSize: 15, color: '#92400E', lineHeight: 24 },
  stateSelect: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16 },
  stateLabel: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 12 },
  stateDropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F3F4F6', padding: 14, borderRadius: 8 },
  stateText: { fontSize: 16, color: '#374151' },
  schemeCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12 },
  schemeName: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  schemeStatus: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FEF3C7', padding: 10, borderRadius: 8, marginBottom: 12 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#F59E0B' },
  statusText: { fontSize: 14, color: '#92400E', fontWeight: '600' },
  schemeBenefit: { fontSize: 15, color: '#374151', marginBottom: 8 },
  schemeDocs: { fontSize: 14, color: '#6B7280', marginBottom: 12 },
  schemeBtn: { backgroundColor: '#2563EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 14, borderRadius: 10 },
  schemeBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  aiHeaderCenter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  chatContainer: { flex: 1, padding: 16 },
  chatRow: { flexDirection: 'row', marginBottom: 16, alignItems: 'flex-end' },
  aiRow: { justifyContent: 'flex-start' },
  userRow: { justifyContent: 'flex-end' },
  aiAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  userAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#16A34A', alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
  chatBubble: { maxWidth: '75%', padding: 12, borderRadius: 16 },
  aiBubble: { backgroundColor: '#fff', borderBottomLeftRadius: 4 },
  userBubble: { backgroundColor: '#16A34A', borderBottomRightRadius: 4 },
  chatText: { fontSize: 15, lineHeight: 22 },
  aiText: { color: '#1F2937' },
  userText: { color: '#fff' },
  chatInputBox: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E7EB', gap: 8, alignItems: 'flex-end' },
  chatInput: { flex: 1, backgroundColor: '#F3F4F6', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 16, maxHeight: 100 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#16A34A', alignItems: 'center', justifyContent: 'center' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 16, borderTopWidth: 1, borderTopColor: '#E5E7EB', alignItems: 'center', justifyContent: 'space-around' },
  navItem: { alignItems: 'center', gap: 4, padding: 8 },
  navText: { fontSize: 12, color: '#9CA3AF' },
  navTextActive: { color: '#16A34A', fontWeight: '600' },
  centerNav: { marginTop: -20 },
  centerBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#16A34A', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 }
});
