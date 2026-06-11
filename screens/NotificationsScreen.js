import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('alerts');

  const weatherAlerts = [
    {
      id: 1,
      type: 'rain',
      title: 'Heavy Rain Alert',
      message: 'Heavy rainfall expected in next 48 hours. Avoid fertilizer application. Ensure proper drainage in fields.',
      time: '2 hours ago',
      severity: 'high'
    },
    {
      id: 2,
      type: 'temp',
      title: 'Heat Wave Warning',
      message: 'Temperature may reach 42°C. Irrigate crops in early morning or evening. Protect young plants.',
      time: '1 day ago',
      severity: 'medium'
    }
  ];

  const govtSchemes = [
    {
      id: 1,
      name: 'PM-KISAN',
      amount: '₹6,000/year',
      desc: 'Direct income support to farmer families. ₹2000 per installment.',
      eligibility: 'All landholding farmers',
      link: 'https://pmkisan.gov.in'
    },
    {
      id: 2,
      name: 'PM Fasal Bima Yojana',
      amount: 'Crop Insurance',
      desc: 'Insurance coverage for crop loss due to natural calamities.',
      eligibility: 'All farmers growing notified crops',
      link: 'https://pmfby.gov.in'
    },
    {
      id: 3,
      name: 'Kisan Credit Card',
      amount: 'Up to ₹3 Lakh',
      desc: 'Easy credit for crop production and allied activities at 4% interest.',
      eligibility: 'All farmers, SHGs, JLGs',
      link: 'https://www.pmkisan.gov.in'
    },
    {
      id: 4,
      name: 'Soil Health Card',
      amount: 'Free Service',
      desc: 'Free soil testing and nutrient recommendations for your field.',
      eligibility: 'All farmers',
      link: 'https://soilhealth.dac.gov.in'
    }
  ];

  const getSeverityColor = (severity) => {
    if (severity === 'high') return '#DC2626';
    if (severity === 'medium') return '#F59E0B';
    return '#16A34A';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'alerts' && styles.activeTab]}
          onPress={() => setActiveTab('alerts')}
        >
          <Ionicons name="warning" size={18} color={activeTab === 'alerts'? '#16A34A' : '#6B7280'} />
          <Text style={[styles.tabText, activeTab === 'alerts' && styles.activeTabText]}>Weather Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'schemes' && styles.activeTab]}
          onPress={() => setActiveTab('schemes')}
        >
          <Ionicons name="document-text" size={18} color={activeTab === 'schemes'? '#16A34A' : '#6B7280'} />
          <Text style={[styles.tabText, activeTab === 'schemes' && styles.activeTabText]}>Govt Schemes</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {activeTab === 'alerts'? (
          <>
            {weatherAlerts.map(alert => (
              <View key={alert.id} style={styles.alertCard}>
                <View style={styles.alertHeader}>
                  <View style={[styles.severityDot, { backgroundColor: getSeverityColor(alert.severity) }]} />
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertTime}>{alert.time}</Text>
                </View>
                <Text style={styles.alertMessage}>{alert.message}</Text>
              </View>
            ))}
          </>
        ) : (
          <>
            {govtSchemes.map(scheme => (
              <View key={scheme.id} style={styles.schemeCard}>
                <View style={styles.schemeHeader}>
                  <Text style={styles.schemeName}>{scheme.name}</Text>
                  <Text style={styles.schemeAmount}>{scheme.amount}</Text>
                </View>
                <Text style={styles.schemeDesc}>{scheme.desc}</Text>
                <Text style={styles.schemeEligibility}>✓ {scheme.eligibility}</Text>
                <TouchableOpacity 
                  style={styles.schemeBtn}
                  onPress={() => Linking.openURL(scheme.link)}
                >
                  <Text style={styles.schemeBtnText}>Apply Now</Text>
                  <Ionicons name="open-outline" size={16} color="#16A34A" />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#16A34A' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: '#16A34A' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#6B7280', marginLeft: 6 },
  activeTabText: { color: '#16A34A' },
  scrollView: { flex: 1 },
  alertCard: { backgroundColor: '#fff', margin: 16, marginBottom: 12, padding: 16, borderRadius: 12, elevation: 1 },
  alertHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  severityDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  alertTitle: { flex: 1, fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  alertTime: { fontSize: 12, color: '#9CA3AF' },
  alertMessage: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
  schemeCard: { backgroundColor: '#fff', margin: 16, marginBottom: 12, padding: 16, borderRadius: 12, elevation: 1 },
  schemeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  schemeName: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  schemeAmount: { fontSize: 14, fontWeight: 'bold', color: '#16A34A', backgroundColor: '#DCFCE7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  schemeDesc: { fontSize: 14, color: '#4B5563', marginBottom: 8, lineHeight: 20 },
  schemeEligibility: { fontSize: 13, color: '#6B7280', marginBottom: 12 },
  schemeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0FDF4', paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: '#16A34A' },
  schemeBtnText: { fontSize: 14, fontWeight: 'bold', color: '#16A34A', marginRight: 6 },
});
