import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/Theme';

export default function FarmerProfile() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [state, setState] = useState('Telangana');
  const [district, setDistrict] = useState('');
  const [mandal, setMandal] = useState('');
  const [village, setVillage] = useState('');
  const [landSize, setLandSize] = useState('');
  const [soilType, setSoilType] = useState('');

  const genderOptions = ['Male', 'Female', 'Other'];
  const soilOptions = [
    { name: 'Black Soil', color: '#2C2C2C' },
    { name: 'Red Soil', color: '#8B0000' },
    { name: 'Alluvial Soil', color: '#DAA520' },
    { name: 'Laterite Soil', color: '#CD853F' },
  ];

  const saveProfile = async () => {
    if (!name || !landSize || !soilType) {
      alert('Please fill Full Name, Land Size and Soil Type');
      return;
    }
    const profile = { name, age, gender, state, district, mandal, village, landSize, soilType };
    await AsyncStorage.setItem('farmerProfile', JSON.stringify(profile));
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* Green Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Farmer Profile</Text>
        <Text style={styles.headerSub}>Tell us about you and your farm</Text>
      </View>

      {/* White Card Form */}
      <ScrollView style={styles.formCard} showsVerticalScrollIndicator={false}>
        
        {/* FULL NAME */}
        <Text style={styles.label}>FULL NAME *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your name" 
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />

        {/* AGE + GENDER Row */}
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>AGE</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Years" 
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>GENDER</Text>
            <View style={styles.genderRow}>
              {genderOptions.map((g) => (
                <TouchableOpacity 
                  key={g}
                  style={[styles.genderBtn, gender === g && styles.genderBtnActive]}
                  onPress={() => setGender(g)}
                >
                  <Text style={[styles.genderText, gender === g && styles.genderTextActive]}>
                    {g === 'Male' ? 'Ma\nle' : g === 'Female' ? 'Fe\nmal\ne' : 'Oth\ner'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* STATE */}
        <Text style={styles.label}>STATE</Text>
        <TextInput 
          style={styles.input} 
          value={state}
          onChangeText={setState}
          placeholderTextColor="#999"
        />

        {/* DISTRICT + MANDAL Row */}
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>DISTRICT</Text>
            <TextInput 
              style={styles.input} 
              value={district}
              onChangeText={setDistrict}
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>MANDAL</Text>
            <TextInput 
              style={styles.input} 
              value={mandal}
              onChangeText={setMandal}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* VILLAGE */}
        <Text style={styles.label}>VILLAGE</Text>
        <TextInput 
          style={styles.input} 
          value={village}
          onChangeText={setVillage}
          placeholderTextColor="#999"
        />

        {/* LAND SIZE */}
        <Text style={styles.label}>LAND SIZE (ACRES) *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. 2.40" 
          keyboardType="numeric"
          value={landSize}
          onChangeText={setLandSize}
          placeholderTextColor="#999"
        />
        <Text style={styles.note}>Note: 40 Guntas = 1 Acre</Text>

        {/* SOIL TYPE */}
        <Text style={styles.label}>SOIL TYPE *</Text>
        <View style={styles.soilGrid}>
          {soilOptions.map((soil) => (
            <TouchableOpacity 
              key={soil.name}
              style={[styles.soilBtn, soilType === soil.name && styles.soilBtnActive]}
              onPress={() => setSoilType(soil.name)}
            >
              <View style={[styles.soilDot, { backgroundColor: soil.color }]} />
              <Text style={styles.soilText}>{soil.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.saveBtn} onPress={saveProfile} activeOpacity={0.8}>
          <Text style={styles.saveBtnText}>Save & Start Farming</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.primary 
  },
  header: { 
    backgroundColor: COLORS.primary, 
    paddingTop: 50, 
    paddingHorizontal: 24, 
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { 
    fontSize: 36, 
    fontWeight: '800', 
    color: '#fff',
    fontFamily: 'serif',
  },
  headerSub: { 
    fontSize: 16, 
    color: '#A5D6A7', 
    marginTop: 6,
    fontStyle: 'italic',
  },
  formCard: { 
    flex: 1, 
    backgroundColor: '#fff', 
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  label: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: '#4A5568', 
    marginBottom: 8,
    marginTop: 16,
    letterSpacing: 0.5,
  },
  input: { 
    backgroundColor: '#F7FAFC', 
    borderWidth: 1, 
    borderColor: '#E2E8F0', 
    borderRadius: 12, 
    padding: 14, 
    fontSize: 16, 
    color: COLORS.text,
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  halfWidth: { 
    width: '48%' 
  },
  genderRow: { 
    flexDirection: 'row', 
    gap: 8 
  },
  genderBtn: { 
    flex: 1, 
    borderWidth: 2, 
    borderColor: COLORS.primaryLight, 
    borderRadius: 8, 
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  genderBtnActive: { 
    backgroundColor: COLORS.leafBg, 
    borderColor: COLORS.primaryLight,
  },
  genderText: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: COLORS.primaryLight,
    textAlign: 'center',
    lineHeight: 16,
  },
  genderTextActive: { 
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  note: { 
    fontSize: 12, 
    color: '#3182CE', 
    marginTop: 6,
    fontWeight: '600',
  },
  soilGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    gap: 12,
  },
  soilBtn: { 
    width: '48%', 
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#F7FAFC', 
    borderWidth: 1, 
    borderColor: '#E2E8F0', 
    borderRadius: 12, 
    padding: 14,
    gap: 10,
  },
  soilBtnActive: { 
    borderColor: COLORS.primaryLight,
    borderWidth: 2,
    backgroundColor: COLORS.leafBg,
  },
  soilDot: { 
    width: 16, 
    height: 16, 
    borderRadius: 8 
  },
  soilText: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: COLORS.text 
  },
  saveBtn: { 
    backgroundColor: COLORS.primaryLight, 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  saveBtnText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '800',
    fontStyle: 'italic',
  },
});
