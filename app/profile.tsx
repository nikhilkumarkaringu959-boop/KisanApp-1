import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import i18n from '../i18n'; // i18n import

export default function ProfileScreen() {
  const router = useRouter();
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

  const genderOptions = [
    { key: 'Male', label: i18n.t('male') },
    { key: 'Female', label: i18n.t('female') },
    { key: 'Other', label: i18n.t('other') },
  ];

  // Screen open ayyaka saved profile load cheyadam
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const savedProfile = await AsyncStorage.getItem('farmerProfile');
    if(savedProfile) {
      const data = JSON.parse(savedProfile);
      setName(data.name || '');
      setAge(data.age || '');
      setGender(data.gender || 'Male');
      setState(data.state || 'Telangana');
      setDistrict(data.district || '');
      setMandal(data.mandal || '');
      setVillage(data.village || '');
      setLand(data.land || '');
      setSoil(data.soil || 'Black Soil');
    }
  }

  const saveProfile = async () => {
    if(!name || !land) {
      Alert.alert(i18n.t('error'), i18n.t('nameLandError'));
      return;
    }
    
    const profileData = { name, age, gender, state, district, mandal, village, land, soil };
    await AsyncStorage.setItem('farmerProfile', JSON.stringify(profileData));
    Alert.alert("Success", "Profile Saved ✅");
    router.replace('/(tabs)'); // Save ayyaka home ki
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{position: 'absolute', top: 50, left: 15}}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{i18n.t('farmerProfile')}</Text>
        <Text style={styles.headerSub}>{i18n.t('profileSub')}</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.label}>{i18n.t('fullName')} *</Text>
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
                  <Text style={[styles.genderText, gender === g.key && styles.selectedText]}>{g.label.slice(0,3)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <Text style={styles.label}>{i18n.t('state')}</Text>
        <View style={styles.stateRow}>
          {states.map(s => (
            <TouchableOpacity key={s} style={[styles.stateBtn, state === s && styles.selectedState]} onPress={() => setState(s)}>
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

        <Text style={styles.label}>{i18n.t('landSize')} *</Text>
        <TextInput style={styles.input} placeholder={i18n.t('landPlaceholder')} keyboardType="decimal-pad" value={land} onChangeText={setLand} />
        <Text style={styles.note}>{i18n.t('note')}</Text>

        <Text style={styles.label}>{i18n.t('soilType')} *</Text>
        <View style={styles.soilRow}>
          {soilTypes.map(s => (
            <TouchableOpacity key={s} style={[styles.soilBtn, soil === s && styles.selectedSoil]} onPress={() => setSoil(s)}>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: '#1B5E20', padding: 30, paddingTop: 60, borderBottomRightRadius: 30, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: 'white', fontStyle: 'italic' },
  headerSub: { fontSize: 14, color: '#A5D6A7', marginTop: 5 },
  formCard: { backgroundColor: 'white', margin: 15, padding: 15, borderRadius: 15, marginTop: -20, elevation: 3 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#555', marginTop: 12, marginBottom: 5 },
  input: { backgroundColor: '#F1F8E9', padding: 12, borderRadius: 8, fontSize: 15 },
  row: { flexDirection: 'row' },
  genderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  genderBtn: { flex: 1, padding: 10, borderWidth: 1.5, borderColor: '#4CAF50', borderRadius: 8, alignItems: 'center', marginRight: 5 },
  stateRow: { flexDirection: 'row', flexWrap: 'wrap' },
  stateBtn: { padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, margin: 4 },
  soilRow: { flexDirection: 'row', flexWrap: 'wrap' },
  soilBtn: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, margin: 4 },
  selectedBtn: { backgroundColor: '#E8F5E9', borderColor: '#2E7D32' },
  selectedState: { backgroundColor: '#E8F5E9', borderColor: '#2E7D32' },
  selectedSoil: { backgroundColor: '#E8F5E9', borderColor: '#2E7D32' },
  selectedText: { color: '#2E7D32', fontWeight: 'bold' },
  genderText: { color: '#2E7D32', fontWeight: 'bold' },
  note: { color: '#1976D2', fontSize: 12, marginTop: 5, fontWeight: '600' },
  saveBtn: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  saveBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});
