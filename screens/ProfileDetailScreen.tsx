import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { User, Calendar, Users, MapPin, Mountain, Ruler, Sprout, Globe, Home } from 'lucide-react-native';
import { useProfile } from '../contexts/ProfileContext';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';

export default function ProfileDetailScreen() {
  const { profile } = useProfile();
  const navigation = useNavigation();

  const personalInfo = [
    {
      icon: User,
      label: 'Full Name',
      value: profile.name || 'Not Set',
      color: '#3B82F6',
    },
    {
      icon: Calendar,
      label: 'Age',
      value: profile.age || 'Not Set',
      color: '#8B5CF6',
    },
    {
      icon: Users,
      label: 'Gender',
      value: profile.gender || 'Not Set',
      color: '#EC4899',
    },
    {
      icon: Globe,
      label: 'Language',
      value: profile.language || 'Not Set',
      color: '#06B6D4',
    },
  ];

  const locationInfo = [
    {
      icon: MapPin,
      label: 'State',
      value: profile.state || 'Not Set',
      color: '#10B981',
    },
    {
      icon: MapPin,
      label: 'District',
      value: profile.district || 'Not Set',
      color: '#F59E0B',
    },
    {
      icon: MapPin,
      label: 'Mandal',
      value: profile.mandal || 'Not Set',
      color: '#6366F1',
    },
    {
      icon: Home,
      label: 'Village',
      value: profile.village || 'Not Set',
      color: '#14B8A6',
    },
  ];

  const farmInfo = [
    {
      icon: Ruler,
      label: 'Land Size',
      value: profile.landSize ? `${profile.landSize} Acres` : 'Not Set',
      color: '#16A34A',
    },
    {
      icon: Mountain,
      label: 'Soil Type',
      value: profile.soilType || 'Not Set',
      color: '#92400E',
    },
    {
      icon: Sprout,
      label: 'Main Crop',
      value: profile.crop || 'Not Set',
      color: '#059669',
    },
  ];

  const renderCard = (item, index) => (
    <View key={index} style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
        <item.icon color={item.color} size={22} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardLabel}>{item.label}</Text>
        <Text style={styles.cardValue}>{item.value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header Card */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <User color="#fff" size={48} />
          </View>
          <Text style={styles.profileName}>{profile.name || 'Farmer'}</Text>
          <Text style={styles.profileSubtext}>Kisan AI User</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{profile.landSize || '0'}</Text>
              <Text style={styles.statLabel}>Acres</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{profile.district || 'N/A'}</Text>
              <Text style={styles.statLabel}>District</Text>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <Text style={styles.sectionTitle}>Personal Information</Text>
        {personalInfo.map(renderCard)}

        {/* Location Details */}
        <Text style={styles.sectionTitle}>Location Details</Text>
        {locationInfo.map(renderCard)}

        {/* Farm Details */}
        <Text style={styles.sectionTitle}>Farm Details</Text>
        {farmInfo.map(renderCard)}

        {/* Edit Button */}
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('FARMER_PROFILE')}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F9FAFB' 
  },
  content: { 
    padding: 16 
  },
  profileHeader: {
    backgroundColor: '#16A34A',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  profileSubtext: {
    fontSize: 14,
    color: '#E8F5E9',
    fontWeight: '500',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#E8F5E9',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    marginTop: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#16A34A',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
