import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { useProfile } from '../Context/ProfileContext';
import { ClipboardList, Sun, Beaker, Bug, Lightbulb, Landmark, User, Globe, Bell, FileText, Share2, Info, Sprout } from 'lucide-react-native';

export default function HomeScreen({ navigation }) {
  const { profile } = useProfile();
  const [menu, setMenu] = useState(false);

  const Card = ({ icon, title, color, screen }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(screen)}>
      <View style={[styles.iconCircle, {backgroundColor: color}]}>{icon}</View>
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );

  const MenuItem = ({ icon, label, sub, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>{icon}</View>
      <View style={styles.flex1}>
        <Text style={styles.menuLabel}>{label}</Text>
        {sub ? <Text style={styles.menuSub}>{sub}</Text> : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logo}>🌱</Text>
          <View>
            <Text style={styles.headerTitle}>KISAN</Text>
            <Text style={styles.headerSub}>THE SMART FARMING ASSISTANT</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setMenu(true)}>
          <Text style={styles.menuDots}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>Welcome back, {profile.name || 'Farmer'}! 🌾</Text>
          <Text style={styles.welcomeSub}>Your smart farming is ready.</Text>
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipTag}>TRENDING TIP</Text>
          <Text style={styles.tipTitle}>Best time for Urea</Text>
          <Text style={styles.tipDesc}>Soil moisture is optimal today</Text>
        </View>

        <Text style={styles.sectionTitle}>Farm Management</Text>
        <View style={styles.grid}>
          <Card icon={<ClipboardList color="#F97316" size={28} />} title="Crop Information" color="#FFEDD5" screen="CROP" />
          <Card icon={<Sun color="#3B82F6" size={28} />} title="Weather Forecast" color="#DBEAFE" screen="WEATHER" />
          <Card icon={<Beaker color="#10B981" size={28} />} title="Fertilizer Calculator" color="#D1FAE5" screen="FERTILIZER" />
          <Card icon={<Bug color="#EF4444" size={28} />} title="Smart Pest Control" color="#FEE2E2" screen="PEST" />
          <Card icon={<Lightbulb color="#EAB308" size={28} />} title="Smart Farming Tips" color="#FEF3C7" screen="TIPS" />
          <Card icon={<Landmark color="#8B5CF6" size={28} />} title="Govt Schemes" color="#EDE9FE" screen="SCHEMES" />
        </View>
      </ScrollView>

      <Modal visible={menu} transparent animationType="fade">
        <TouchableOpacity style={styles.modalBg} onPress={() => setMenu(false)}>
          <View style={styles.menuBox}>
            <MenuItem icon={<User color="#4CAF50" size={20} />} label="My Profile" sub={profile.name} onPress={() => {setMenu(false); navigation.navigate('PROFILE')}} />
            <MenuItem icon={<Globe color="#3B82F6" size={20} />} label="Change Language" sub={profile.language} onPress={() => {setMenu(false); navigation.navigate('LANGUAGE')}} />
            <MenuItem icon={<Sprout color="#10B981" size={20} />} label="KISAN AI Assistant" onPress={() => {setMenu(false); navigation.navigate('KISAN_AI')}} />
            <MenuItem icon={<Bell color="#F59E0B" size={20} />} label="Notifications" sub="Weather & Govt Alerts" onPress={() => setMenu(false)} />
            <MenuItem icon={<FileText color="#6366F1" size={20} />} label="My Farm Details" sub={`${profile.landSize} Ac, ${profile.soilType}`} onPress={() => setMenu(false)} />
            <View style={styles.divider} />
            <MenuItem icon={<Share2 color="#8B5CF6" size={20} />} label="Share App" onPress={() => setMenu(false)} />
            <MenuItem icon={<Info color="#6B7280" size={20} />} label="About Us" sub="v1.0.0" onPress={() => setMenu(false)} />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc' },
  header: { backgroundColor: '#2d5016', padding: 15, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { fontSize: 28 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  headerSub: { fontSize: 9, color: '#90EE90', fontWeight: '600' },
  menuDots: { fontSize: 24, color: 'white', fontWeight: 'bold' },
  scroll: { flex: 1 },
  welcomeBox: { backgroundColor: 'white', margin: 15, padding: 20, borderRadius: 15, elevation: 2 },
  welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  welcomeSub: { fontSize: 14, color: '#6B7280', marginTop: 5 },
  tipBox: { backgroundColor: '#2563EB', margin: 15, padding: 20, borderRadius: 15 },
  tipTag: { backgroundColor: 'rgba(255,255,255,0.3)', color: 'white', fontSize: 10, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, alignSelf: 'flex-start', fontWeight: 'bold' },
  tipTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 10 },
  tipDesc: { fontSize: 14, color: 'white', marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginLeft: 15, marginTop: 10, marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, gap: 10 },
  card: { backgroundColor: 'white', width: '47%', padding: 20, borderRadius: 15, alignItems: 'center', elevation: 2 },
  iconCircle: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  cardText: { fontSize: 14, fontWeight: '600', textAlign: 'center', color: '#374151' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
  menuBox: { position: 'absolute', top: 80, right: 15, backgroundColor: 'white', borderRadius: 15, padding: 10, width: 250, elevation: 5 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10 },
  menuIcon: { width: 35, height: 35, borderRadius: 18, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  flex1: { flex: 1 },
  menuLabel: { fontSize: 15, fontWeight: '600', color: '#1F2937' },
  menuSub: { fontSize: 11, color: '#10B981', fontWeight: '600', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 8 },
});
