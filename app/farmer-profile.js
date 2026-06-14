// app/farmer-profile.js
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const genders = ['Male', 'Female', 'Other'];
const soilTypes = [
  { name: 'Black Soil', color: '#2C2C2C' },
  { name: 'Red Soil', color: '#C0392B' },
  { name: 'Alluvial Soil', color: '#F1C40F' },
  { name: 'Laterite Soil', color: '#D35400' },
];

export default function FarmerProfile() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', age: '', gender: 'Male', state: 'Telangana',
    district: '', mandal: '', village: '', landSize: '', soilType: ''
  });

  const updateForm = (key, value) => setForm({...form, [key]: value });

  const saveProfile = async () => {
    if (!form.name ||!form.landSize ||!form.soilType) {
      alert('Name, Land Size & Soil Type required mowa');
      return;
    }
    await AsyncStorage.setItem('userProfile', JSON.stringify(form));
    await AsyncStorage.setItem('isOnboarded', 'true');
    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Farmer Profile</Text>
        <Text style={styles.headerSub}>Tell us about you and your farm</Text>
      </View>

      <View style={styles.card}>
        {/* FULL NAME - FIXED VISIBILITY */}
        <Text style={styles.label}>FULL NAME *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#94A3B8"
          value={form.name}
          onChangeText={(v) => updateForm('name', v)}
        />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>AGE</Text>
            <TextInput
              style={styles.input}
              placeholder="Years"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
              value={form.age}
              onChangeText={(v) => updateForm('age', v)}
            />
          </View>
          <View style={{ flex: 1.5 }}>
            <Text style={styles.label}>GENDER</Text>
            <View style={styles.genderRow}>
              {genders.map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[styles.genderBtn, form.gender === g && styles.genderActive]}
                  onPress={() => updateForm('gender', g)}
                >
                  <Text style={[styles.genderText, form.gender === g && styles.genderTextActive]}>
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <Text style={styles.label}>STATE</Text>
        <TextInput
          style={styles.input}
          placeholder="Telangana"
          placeholderTextColor="#94A3B8"
          value={form.state}
          onChangeText={(v) => updateForm('state', v)}
        />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>DISTRICT</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter district"
              placeholderTextColor="#94A3B8"
              value={form.district}
              onChangeText={(v) => updateForm('district', v)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>MANDAL</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter mandal"
              placeholderTextColor="#94A3B8"
              value={form.mandal}
              onChangeText={(v) => updateForm('mandal', v)}
            />
          </View>
        </View>

        <Text style={styles.label}>VILLAGE</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter village"
          placeholderTextColor="#94A3B8"
          value={form.village}
          onChangeText={(v) => updateForm('village', v)}
        />

        <Text style={styles.label}>LAND SIZE (ACRES) *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 2.40"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          value={form.landSize}
          onChangeText={(v) => updateForm('landSize', v)}
        />
        <Text style={styles.note}>Note: 40 Guntas = 1 Acre</Text>

        <Text style={styles.label}>SOIL TYPE *</Text>
        <View style={styles.soilGrid}>
          {soilTypes.map((soil) => (
            <TouchableOpacity
              key={soil.name}
              style={[styles.soilBtn, form.soilType === soil.name && styles.soilActive]}
              onPress={() => updateForm('soilType', soil.name)}
            >
              <View style={[styles.dot, { backgroundColor: soil.color }]} />
              <Text style={styles.soilText}>{soil.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={saveProfile} activeOpacity={0.8}>
          <Text style={styles.saveBtnText}>Save & Start Farming</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  header: {
    backgroundColor: '#1B4332',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFF'
  },
  headerSub: {
    fontSize: 15,
    color: '#86EFAC',
    marginTop: 4
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 20,
    marginTop: -20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 18,
    marginBottom: 8,
    letterSpacing: 0.5
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#0F172A', // TEXT COLOR DARK - FIX
    fontWeight: '500'
  },
  row: {
    flexDirection: 'row',
    gap: 12
  },
  genderRow: {
    flexDirection: 'row',
    gap: 8
  },
  genderBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#22C55E',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  genderActive: {
    backgroundColor: '#22C55E'
  },
  genderText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#22C55E'
  },
  genderTextActive: {
    color: '#FFFFFF'
  },
  note: {
    fontSize: 12,
    color: '#3B82F6',
    marginTop: 6,
    fontWeight: '600'
  },
  soilGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  soilBtn: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#FFFFFF'
  },
  soilActive: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FDF4'
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9
  },
  soilText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B'
  },
  saveBtn: {
    backgroundColor: '#22C55E',
    padding: 18,
    borderRadius: 14,
    marginTop: 32,
    elevation: 3,
    shadowColor: '#22C55E',
    shadowOpacity: 0.3
  },
  saveBtnText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 17,
    letterSpacing: 0.5
  },
});
