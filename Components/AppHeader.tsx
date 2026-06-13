import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Share } from 'react-native';
import { MoreVertical, User, Globe, Leaf, Bell, ClipboardList, Share2, Info } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../contexts/ProfileContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function AppHeader() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const { profile } = useProfile();
  const { language } = useLanguage();

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'KISAN - The Smart Farming Assistant\nDownload: https://play.google.com/store/apps/kisanai',
      });
      setMenuVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    {
      icon: User,
      iconBg: '#E8F4FD',
      label: 'My Profile',
      subLabel: profile.name || 'Guest',
      onPress: () => {
        setMenuVisible(false);
        navigation.navigate('PROFILE_DETAIL');
      },
    },
    {
      icon: Globe,
      iconBg: '#E8F4FD',
      label: 'Change Language',
      subLabel: language || 'English',
      onPress: () => {
        setMenuVisible(false);
        navigation.navigate('LANGUAGE');
      },
    },
    {
      icon: Leaf,
      iconBg: '#E8F5E9',
      label: 'KISAN AI Assistant',
      subLabel: null,
      onPress: () => {
        setMenuVisible(false);
        navigation.navigate('KISAN_AI');
      },
    },
    {
      icon: Bell,
      iconBg: '#FFF9E6',
      label: 'Notifications',
      subLabel: 'Weather & Govt Alerts',
      onPress: () => {
        setMenuVisible(false);
        navigation.navigate('NOTIFICATIONS');
      },
    },
    {
      icon: ClipboardList,
      iconBg: '#F3E5F5',
      label: 'My Farm Details',
      subLabel: `${profile.landSize || '0'} Ac, ${profile.soilType || 'N/A'}`,
      onPress: () => {
        setMenuVisible(false);
        navigation.navigate('FARM_DETAILS');
      },
    },
    {
      icon: Share2,
      iconBg: '#E3F2FD',
      label: 'Share App',
      subLabel: null,
      onPress: handleShare,
    },
    {
      icon: Info,
      iconBg: '#E8F4FD',
      label: 'About Us',
      subLabel: 'v1.0.0',
      onPress: () => {
        setMenuVisible(false);
        navigation.navigate('ABOUT_US');
      },
    },
  ];

  return (
    <>
      {/* ✅ GREEN HEADER - EXACT SAME */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Leaf color="#fff" size={28} />
          <View>
            <Text style={styles.headerTitle}>KISAN</Text>
            <Text style={styles.headerSubtitle}>THE SMART FARMING ASSISTANT</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <MoreVertical color="#fff" size={24} />
        </TouchableOpacity>
      </View>

      {/* ✅ DROPDOWN MENU */}
      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menu}>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                {index === 5 && <View style={styles.divider} />}
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
                    <item.icon color="#16A34A" size={22} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    {item.subLabel && (
                      <Text style={styles.menuSubLabel}>{item.subLabel}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#16A34A', // ✅ GREEN COLOR
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#E8F5E9',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 70,
    paddingRight: 16,
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 8,
    width: 280,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 14,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
  menuSubLabel: {
    fontSize: 13,
    color: '#16A34A',
    marginTop: 2,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
    marginHorizontal: 16,
  },
});
