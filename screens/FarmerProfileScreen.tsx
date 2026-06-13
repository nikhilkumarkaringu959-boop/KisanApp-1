import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useProfile } from '../contexts/ProfileContext';
import { useNavigation } from '@react-navigation/native';

export default function FarmerProfileScreen() {
  const navigation = useNavigation();
  const { profile, saveFullProfile } = useProfile();
  
  // State for all fields
  const [name, setName] = useState(profile.name || '');
  const [age, setAge] = useState(profile.age || '');
  const [gender, setGender] = useState(profile.gender || '');
  const [state, setState] = useState(profile.state || 'Telangana');
  const [district, setDistrict] = useState(profile.district || '');
  const [mandal, setMandal] = useState(profile.mandal || '');
  const [village, setVillage] = useState(profile.village || '');
  const [landSize, setLandSize] = useState(profile.landSize || '');
  const [soilType, setSoilType] = useState(profile.soilType || '');
  const [crop, setCrop] = useState(profile.crop || '');

  // Dropdown states
  const [showStatePicker, setShowStatePicker] = useState(false);
  const [showSoilPicker, setShowSoilPicker] = useState(false);

  // ✅ STATE OPTIONS
  const stateOptions = [
    'Telangana',
    'Andhra Pradesh',
    'Tamil Nadu',
    'Karnataka',
    'Maharashtra',
  ];

  // ✅ SOIL TYPE OPTIONS
  const soilTypeOptions = [
    'Black Soil',
    'Red Soil',
    'Laterite Soil',
    'Alluvial Soil',
  ];

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    if (!district.trim()) {
      Alert.alert('Error', 'Please enter district');
      return;
    }
    if (!landSize.trim()) {
      Alert.alert('Error', 'Please enter land size');
      return;
    }

    const success = await saveFullProfile({
      name: name.trim(),
      age: age.trim(),
      gender,
      state,
      district: district.trim(),
      mandal: mandal.trim(),
      village: village.trim(),
      landSize: landSize.trim(),
      soilType,
      crop: crop.trim(),
    });

    if (success) {
      Alert.alert('Success', 'Profile saved successfully!', [
        { 
          text: 'OK', 
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'MAIN_TABS' }],
          })
        }
      ]);
    } else {
      Alert.alert('Error', 'Failed to save profile. Try again.');
    }
  };

  const GenderButton = ({ title, value }) => (
    <TouchableOpacity
      style={[
        styles.genderButton,
        gender === value && styles.genderButtonActive
      ]}
      onPress={() => setGender(value)}
    >
      <Text style={[
        styles.genderText,
        gender === value && styles.genderTextActive
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Farmer Profile Setup</Text>

        {/* Full Name */}
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />

        {/* Age */}
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 45"
          placeholderTextColor="#999"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          maxLength={3}
        />

        {/* Gender */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderContainer}>
          <GenderButton title="Male" value="Male" />
          <GenderButton title="Female" value="Female" />
          <GenderButton title="Other" value="Other" />
        </View>

        {/* ✅ STATE DROPDOWN */}
        <Text style={styles.label}>State *</Text>
        <TouchableOpacity 
          style={styles.dropdownButton} 
          onPress={() => setShowStatePicker(true)}
        >
          <Text style={styles.dropdownText}>{state || 'Select State'}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>

        {/* ✅ SOIL TYPE DROPDOWN */}
        <Text style={styles.label}>Soil Type</Text>
        <TouchableOpacity 
          style={styles.dropdownButton} 
          onPress={() => setShowSoilPicker(true)}
        >
          <Text style={styles.dropdownText}>{soilType || 'Select Soil Type'}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>

        {/* District */}
        <Text style={styles.label}>District *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter district"
          placeholderTextColor="#999"
          value={district}
          onChangeText={setDistrict}
        />

        {/* Mandal */}
        <Text style={styles.label}>Mandal</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter mandal"
          placeholderTextColor="#999"
          value={mandal}
          onChangeText={setMandal}
        />

        {/* Village */}
        <Text style={styles.label}>Village</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter village"
          placeholderTextColor="#999"
          value={village}
          onChangeText={setVillage}
        />

        {/* Land Size */}
        <Text style={styles.label}>Land Size (Acres) *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 2.40"
          placeholderTextColor="#999"
          value={landSize}
          onChangeText={setLandSize}
          keyboardType="decimal-pad"
        />

        {/* Main Crop */}
        <Text style={styles.label}>Main Crop</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Cotton, Paddy, Maize"
          placeholderTextColor="#999"
          value={crop}
          onChangeText={setCrop}
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save & Continue</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ✅ STATE PICKER MODAL */}
      <Modal visible={showStatePicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select State</Text>
            <Picker
              selectedValue={state}
              onValueChange={(itemValue) => setState(itemValue)}
              style={styles.picker}
            >
              {stateOptions.map((item) => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={() => setShowStatePicker(false)}
            >
              <Text style={styles.modalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ✅ SOIL TYPE PICKER MODAL */}
      <Modal visible={showSoilPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Soil Type</Text>
            <Picker
              selectedValue={soilType}
              onValueChange={(itemValue) => setSoilType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Soil Type" value="" />
              {soilTypeOptions.map((item) => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={() => setShowSoilPicker(false)}
            >
              <Text style={styles.modalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 25,
    marginTop: 10,
    fontFamily: 'System',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
    fontFamily: 'System',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    fontFamily: 'System',
    color: '#000',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 5,
  },
  genderButton: {
    flex: 1,
    padding: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#2d5016',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  genderButtonActive: {
    backgroundColor: '#2d5016',
  },
  genderText: {
    color: '#2d5016',
    fontWeight: '600',
    fontSize: 15,
    fontFamily: 'System',
  },
  genderTextActive: {
    color: '#fff',
  },
  dropdownButton: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'System',
    color: '#000',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  button: {
    backgroundColor: '#2d5016',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'System',
  },
  picker: {
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#2d5016',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
});
