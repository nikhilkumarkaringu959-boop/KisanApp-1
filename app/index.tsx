import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import i18n, { setLanguage, loadLanguage } from './i18n'; // i18n import

const languages = [
  { code: 'en', name: 'English' },
  { code: 'te', name: 'Telugu (తెలుగు)' },
  { code: 'ta', name: 'Tamil (தமிழ்)' },
  { code: 'hi', name: 'Hindi (हिंदी)' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState<'checking' | 'language' | 'profile'>('checking');
  const [, forceUpdate] = useState(0); // language marchadaniki

  // Profile states
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [state, setState] = useState('Telangana');
  const [district, setDistrict] = useState('');
  const [mandal, setMandal] = useState('');
  const [village, setVillage] = useState('');
  const [land, setLand] = useState('');
  const [soil, setSoil] = useState('Black Soil');

  const states = ['Telangana', 'Andhra Pradesh', 'Karnataka', 'Tamil Nadu'];
  const soilTypes = ['Black Soil', 'Red Soil', 'Alluvial Soil', 'Laterite Soil'];

  // App open ayyaka
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await loadLanguage(); // saved language load chey
    forceUpdate(n => n + 1); // UI re-render
    checkOnboarding();
  }

  const checkOnboarding = async () => {
    const savedLang = await AsyncStorage.getItem('appLanguage');
    const savedProfile = await AsyncStorage.getItem('farmerProfile');
    
    if (savedLang && savedProfile) {
      router.replace('/(tabs)');
    } else if (savedLang) {
      setStep('profile');
    } else {
      setStep('language');
    }
  }

  // 1. LANGUAGE SELECT
  const selectLanguage = async (langCode: string) => {
    await setLanguage(langCode); // i18n.locale set chesthundi
    forceUpdate(n => n + 1); // UI update
    setStep('profile');
  }

  // 2. PROFILE SAVE
  const saveProfile = async () => {
    if(!name || !land) {
      Alert.alert(i18n.t('error'), i18n.t('nameLandError'));
      return;
    }
    const profileData = { name, age, gender, state, district, mandal, village, land, soil };
    await AsyncStorage.setItem('farmerProfile', JSON.stringify(profileData));
    router.replace('/(tabs)');
  }

  if (step === 'checking') return null;

  // LANGUAGE SCREEN
  if (step === 'language') {
    return (
      <View style={styles.container}>
        <View style={styles.logoCircle}><Ionicons name="leaf" size={50} color="white" /></View>
        <Text style={styles.title}>{i18n.t('appName')}</Text>
        <Text style={styles.subtitle}>{i18n.t('subTitle')}</Text>
        <Text style={styles.selectText}>{i18n.t('selectLang')}</Text>
        {languages.map((lang) => (
          <TouchableOpacity key={lang.code} style={styles.langBtn} onPress={() => selectLanguage(lang.code)}>
            <Text style={styles.langText}>{lang.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  // PROFILE SCREEN
  if (step === 'profile') {
    const genderOptions = [
      { key: 'Male', label: i18n.t('male') },
      { key: 'Female', label: i18n.t('female') },
      { key: 'Other', label: i18n.t('other') },
    ];

    return (
      <ScrollView style={styles.profileContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{i18n.t('farmerProfile')}</Text>
          <Text style={styles.headerSub}>{i18n.t('profileSub')}</Text>
        </View>
        <View style={styles.formCard}>
          <Text style={styles.label}>{i18n.t('fullName')}</Text>
          <TextInput style={styles.input} placeholder={i18n.t('enterName')} value={name} onChangeText={setName} />

          <View style={styles.row}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>{i18n.t('age')}</Text>
              <TextInput style={styles.input} placeholder={i18n.t('years')} keyboardType="numeric" value={age} onChangeText={setAge} />
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={styles.label}>{i18n.t('gender')}</Text>
              <View style={styles.genderRow}>
                {genderOptions.map(g => (
                  <TouchableOpacity key={g.key} style={[styles.genderBtn, gender === g.key && styles.selectedBtn]} onPress={() => setGender(g.key)}>
                    <Text style={[styles.genderText, gender === g.key && styles.selectedText]}>{g.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <Text style={styles.label}>{i18n.t('state')}</Text>
          <View style={styles.wrapRow}>
            {states.map(s => (
              <TouchableOpacity key={s} style={[styles.wrapBtn, state === s && styles.selectedState]} onPress={() => setState(s)}>
                <Text style={state === s ? styles.selectedText : {}}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>{i18n.t('district')}</Text>
              <TextInput style={styles.input} placeholder={i18n.t('district')} value={district} onChangeText={setDistrict} />
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={styles.label}>{i18n.t('mandal')}</Text>
              <TextInput style={styles.input} placeholder={i18n.t('mandal')} value={mandal} onChangeText={setMandal} />
            </View>
          </View>

          <Text style={styles.label}>{i18n.t('village')}</Text>
          <TextInput style={styles.input} placeholder={i18n.t('village')} value={village} onChangeText={setVillage} />

          <Text style={styles.label}>{i18n.t('landSize')}</Text>
          <TextInput style={styles.input} placeholder={i18n.t('landPlaceholder')} keyboardType="decimal-pad" value={land} onChangeText={setLand} />
          <Text style={styles.note}>{i18n.t('note')}</Text>

          <Text style={styles.label}>{i18n.t('soilType')}</Text>
          <View style={styles.wrapRow}>
            {soilTypes.map(s => (
              <TouchableOpacity key={s} style={[styles.wrapBtn, soil === s && styles.selectedSoil]} onPress={() => setSoil(s)}>
                <Text style={soil === s ? styles.selectedText : {}}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
            <Text style={styles.saveBtnText}>{i18n.t('save')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F5E9', alignItems: 'center', paddingTop: 80, paddingHorizontal: 20 },
  logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', marginBottom: 15, elevation: 5 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1B5E20' },
  subtitle: { fontSize: 16, color: '#2E7D32', marginBottom: 30 },
  selectText: { fontSize: 14, color: '#555', marginBottom: 25 },
  langBtn: { width: '100%', backgroundColor: 'white', padding: 16, borderRadius: 12, borderWidth: 2, borderColor: '#4CAF50', marginBottom: 12, alignItems: 'center' },
  langText: { fontSize: 16, fontWeight: '600', color: '#2E7D32' },
  profileContainer: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: '#1B5E20', padding: 30, paddingTop: 60, borderBottomRightRadius: 30 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: 'white', fontStyle: 'italic' },
  headerSub: { fontSize: 14, color: '#A5D6A7', marginTop: 5 },
  formCard: { backgroundColor: 'white', margin: 15, padding: 15, borderRadius: 15, marginTop: -20, elevation: 3 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#555', marginTop: 12, marginBottom: 5 },
  input: { backgroundColor: '#F1F8E9', padding: 12, borderRadius: 8, fontSize: 15 },
  row: { flexDirection: 'row' },
  genderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  genderBtn: { flex: 1, padding: 10, borderWidth: 1.5, borderColor: '#4CAF50', borderRadius: 8, alignItems: 'center', marginRight: 5 },
  wrapRow: { flexDirection: 'row', flexWrap: 'wrap' },
  wrapBtn: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, margin: 4 },
  selectedBtn: { backgroundColor: '#E8F5E9', borderColor: '#2E7D32' },
  selectedState: { backgroundColor: '#E8F5E9', borderColor: '#2E7D32' },
  selectedSoil: { backgroundColor: '#E8F5E9', borderColor: '#2E7D32' },
  selectedText: { color: '#2E7D32', fontWeight: 'bold' },
  genderText: { color: '#2E7D32', fontWeight: 'bold' },
  note: { color: '#1976D2', fontSize: 12, marginTop: 5, fontWeight: '600' },
  saveBtn: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  saveBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});
