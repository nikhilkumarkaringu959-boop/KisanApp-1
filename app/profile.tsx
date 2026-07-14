import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

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

  const saveProfile = async () => {
    if(!name || !land) {
      alert('Please enter Name and Land Size');
      return;
    }
    
    const profileData = { name, age, gender, state, district, mandal, village, land, soil };
    await AsyncStorage.setItem('farmerProfile', JSON.stringify(profileData));
    alert('Profile Saved ✅');
    router.replace('/home'); // Save ayyaka home ki
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Farmer Profile</Text>
        <Text style={styles.headerSub}>Tell us about you and your farm</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.label}>FULL NAME *</Text>
        <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />

        <View style={styles.row}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>AGE</Text>
            <TextInput style={styles.input} placeholder="Years" keyboardType="numeric" value={age} onChangeText={setAge} />
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.label}>GENDER</Text>
            <View style={styles.genderRow}>
              {['Male', 'Female', 'Other'].map(g => (
                <TouchableOpacity key={g} style={[styles.genderBtn, gender === g && styles.selectedBtn]} onPress={() => setGender(g)}>
                  <Text style={[styles.genderText, gender === g && styles.selectedText]}>{g.slice(0,3)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <Text style={styles.label}>STATE</Text>
        <View style={styles.stateRow}>
          {states.map(s => (
            <TouchableOpacity key={s} style={[styles.stateBtn, state === s && styles.selectedState]} onPress={() => setState(s)}>
              <Text style={state === s ? styles.selectedText : {}}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.row}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>DISTRICT</Text>
            <TextInput style={styles.input} placeholder="District" value={district} onChangeText={setDistrict} />
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.label}>MANDAL</Text>
            <TextInput style={styles.input} placeholder="Mandal" value={mandal} onChangeText={setMandal} />
          </View>
        </View>

        <Text style={styles.label}>VILLAGE</Text>
        <TextInput style={styles.input} placeholder="Village" value={village} onChangeText={setVillage} />

        <Text style={styles.label}>LAND SIZE (ACRES) *</Text>
        <TextInput style={styles.input} placeholder="e.g. 2.40" keyboardType="decimal-pad" value={land} onChangeText={setLand} />
        <Text style={styles.note}>Note: 40 Guntas = 1 Acre</Text>

        <Text style={styles.label}>SOIL TYPE *</Text>
        <View style={styles.soilRow}>
          {soilTypes.map(s => (
            <TouchableOpacity key={s} style={[styles.soilBtn, soil === s && styles.selectedSoil]} onPress={() => setSoil(s)}>
              <Text style={soil === s ? styles.selectedText : {}}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
          <Text style={styles.saveBtnText}>Save & Continue</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: '#1B5E20', padding: 30, paddingTop: 60, borderBottomRightRadius: 30 },
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
