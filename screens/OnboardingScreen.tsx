import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useProfile } from '../context/ProfileContext';

export default function OnboardingScreen({ navigation }) {
  const { updateProfile } = useProfile();
  const [profile, setProfile] = useState({
    name: '', age: '', gender: '', state: 'Telangana', district: '', mandal: '', village: '', landSize: '', soilType: ''
  });
  const [error, setError] = useState('');

  const update = (field, value) => setProfile(prev => ({...prev, [field]: value }));

  const handleComplete = () => {
    if(!profile.name ||!profile.landSize ||!profile.soilType) {
      setError("Please fill Name, Land Size, and Soil Type");
      return;
    }
    Object.keys(profile).forEach(key => updateProfile(key, profile[key]));
    navigation.navigate('MAIN');
  };

  const GenderBtn = ({ title }) => (
    <TouchableOpacity style={[styles.genderBtn, profile.gender === title && styles.genderActive]} onPress={() => update('gender', title)}>
      <Text style={[styles.genderText, profile.gender === title && styles.genderTextActive]}>{title}</Text>
    </TouchableOpacity>
  );

  const SoilBtn = ({ name, color }) => (
    <TouchableOpacity style={[styles.soilBtn, profile.soilType === name && styles.soilActive]} onPress={() => update('soilType', name)}>
      <View style={[styles.soilDot, {backgroundColor: color}]} />
      <Text style={[styles.soilText, profile.soilType === name && styles.soilTextActive]}>{name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Farmer Profile</Text>
        <Text style={styles.subtitle}>Tell us about you and your farm</Text>
      </View>

      <View style={styles.card}>
        {error? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Full Name *</Text>
        <TextInput style={styles.input} placeholder="Enter your name" value={profile.name} onChangeText={t => update('name', t)} />

        <View style={styles.row}>
          <View style={styles.flex1}>
            <Text style={styles.label}>Age</Text>
            <TextInput style={styles.input} placeholder="Years" keyboardType="numeric" value={profile.age} onChangeText={t => update('age', t)} />
          </View>
          <View style={styles.flex1}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderRow}>
              <GenderBtn title="Male" />
              <GenderBtn title="Female" />
              <GenderBtn title="Other" />
            </View>
          </View>
        </View>

        <Text style={styles.label}>State</Text>
        <TextInput style={styles.input} value={profile.state} onChangeText={t => update('state', t)} />

        <View style={styles.row}>
          <View style={styles.flex1}>
            <Text style={styles.label}>District</Text>
            <TextInput style={styles.input} value={profile.district} onChangeText={t => update('district', t)} />
          </View>
          <View style={styles.flex1}>
            <Text style={styles.label}>Mandal</Text>
            <TextInput style={styles.input} value={profile.mandal} onChangeText={t => update('mandal', t)} />
          </View>
        </View>

        <Text style={styles.label}>Village</Text>
        <TextInput style={styles.input} value={profile.village} onChangeText={t => update('village', t)} />

        <Text style={styles.label}>Land Size (Acres) *</Text>
        <TextInput style={styles.input} placeholder="e.g. 2.40" keyboardType="numeric" value={profile.landSize} onChangeText={t => update('landSize', t)} />
        <Text style={styles.note}>Note: 40 Guntas = 1 Acre</Text>

        <Text style={styles.label}>Soil Type *</Text>
        <View style={styles.soilGrid}>
          <SoilBtn name="Black Soil" color="#333" />
          <SoilBtn name="Red Soil" color="#8B0000" />
          <SoilBtn name="Alluvial Soil" color="#DAA520" />
          <SoilBtn name="Laterite Soil" color="#D2691E" />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleComplete}>
          <Text style={styles.submitText}>Save & Start Farming</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc' },
  header: { backgroundColor: '#2d5016', padding: 30, paddingTop: 50, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  subtitle: { fontSize: 14, color: '#90EE90', marginTop: 5 },
  card: { backgroundColor: 'white', margin: 15, marginTop: -20, padding: 20, borderRadius: 20, elevation: 3 },
  error: { backgroundColor: '#FEF2F2', color: '#DC2626', padding: 10, borderRadius: 8, marginBottom: 15, fontWeight: '600' },
  label: { fontSize: 12, fontWeight: 'bold', color: '#4a5568', marginTop: 15, marginBottom: 5, textTransform: 'uppercase' },
  input: { backgroundColor: '#f7fafc', padding: 15, borderRadius: 10, fontSize: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  row: { flexDirection: 'row', gap: 10 },
  flex1: { flex: 1 },
  genderRow: { flexDirection: 'row', gap: 5 },
  genderBtn: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1.5, borderColor: '#4CAF50', alignItems: 'center' },
  genderActive: { backgroundColor: '#4CAF50' },
  genderText: { color: '#4CAF50', fontWeight: '600', fontSize: 12 },
  genderTextActive: { color: 'white' },
  note: { fontSize: 12, color: '#3B82F6', marginTop: 5, fontWeight: '600' },
  soilGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  soilBtn: { width: '48%', padding: 15, borderRadius: 10, borderWidth: 2, borderColor: '#e2e8f0', flexDirection: 'row', alignItems: 'center', gap: 10 },
  soilActive: { borderColor: '#4CAF50', backgroundColor: '#F0FFF4' },
  soilDot: { width: 16, height: 16, borderRadius: 8 },
  soilText: { fontWeight: '600', color: '#4a5568' },
  soilTextActive: { color: '#2d5016' },
  submitBtn: { backgroundColor: '#4CAF50', padding: 18, marginTop: 25, borderRadius: 12 },
  submitText: { color: 'white', fontSize: 18, textAlign: 'center', fontWeight: 'bold' },
});
