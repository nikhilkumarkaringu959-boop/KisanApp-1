import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Lightbulb, Sun, CloudRain, Sprout, Droplets, Bug, Wind } from 'lucide-react-native';

export default function TipsScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('Seasonal');

  const tabs = ['Seasonal', 'Crop Wise', 'Water', 'Pest Control', 'Soil Health'];

  const tipsData = {
    'Seasonal': [
      {
        icon: <Sun color="#F59E0B" size={24} />,
        title: 'Kharif Season Tips (Jun-Oct)',
        tips: [
          'Sow crops with first monsoon rains for best germination',
          'Ensure proper drainage - waterlogging kills crops',
          'Apply basal dose of fertilizer at sowing time',
          'Watch for stem borer & leaf folder in paddy',
          'Weeding at 20-25 days critical for yield'
        ],
        color: '#FEF3C7'
      },
      {
        icon: <CloudRain color="#3B82F6" size={24} />,
        title: 'Rabi Season Tips (Nov-Mar)',
        tips: [
          'Sow wheat before Nov 30 for maximum yield',
          'First irrigation 20-25 days after sowing',
          'Protect from frost - light irrigation helps',
          'Apply urea in 2-3 splits for better uptake',
          'Harvest when moisture 20-22% for wheat'
        ],
        color: '#DBEAFE'
      },
      {
        icon: <Wind color="#10B981" size={24} />,
        title: 'Summer Season Tips (Mar-Jun)',
        tips: [
          'Grow short duration crops - green gram, fodder',
          'Mulching mandatory to conserve moisture',
          'Irrigate early morning or evening only',
          'Shade net for nursery vegetables',
          'Deep ploughing to kill pests & weeds'
        ],
        color: '#D1FAE5'
      }
    ],
    'Crop Wise': [
      {
        icon: <Sprout color="#16A34A" size={24} />,
        title: 'Paddy Smart Tips',
        tips: [
          'SRI method: 25% less water, 30% more yield',
          'Transplant 14-21 day old seedlings',
          'Alternate wetting-drying saves 30% water',
          'Zinc spray if leaves show yellow streaks',
          'Harvest at 80% grain maturity'
        ],
        color: '#F0FDF4'
      },
      {
        icon: <Sprout color="#EF4444" size={24} />,
        title: 'Cotton Smart Tips',
        tips: [
          'Seed treatment with Imidacloprid 70WS',
          'Spacing 90x60cm for better aeration',
          'First irrigation 30-35 days after sowing',
          'Pinching at 75cm height for more branches',
          'Pick cotton when bolls fully open & dry'
        ],
        color: '#FEE2E2'
      },
      {
        icon: <Sprout color="#8B5CF6" size={24} />,
        title: 'Sugarcane Smart Tips',
        tips: [
          'Plant 3-bud setts in Feb-Mar for best yield',
          'Trench method saves 40% water',
          'Earthing up at 90 & 150 days',
          'Propping prevents lodging in winds',
          'Harvest when brix reaches 18-20%'
        ],
        color: '#EDE9FE'
      }
    ],
    'Water': [
      {
        icon: <Droplets color="#0EA5E9" size={24} />,
        title: 'Smart Irrigation Tips',
        tips: [
          'Drip irrigation saves 50-60% water',
          'Irrigate early morning 6-9 AM or evening 4-7 PM',
          'Check soil moisture - 2 inch deep before watering',
          'Mulching reduces evaporation by 70%',
          'Rainwater harvesting for summer use'
        ],
        color: '#E0F2FE'
      },
      {
        icon: <Droplets color="#06B6D4" size={24} />,
        title: 'Water Conservation',
        tips: [
          'Laser land leveling saves 25% water',
          'Alternate furrow irrigation for row crops',
          'Use moisture meter for exact irrigation',
          'Cover crops reduce soil water loss',
          'Avoid midday irrigation - 40% loss'
        ],
        color: '#CFFAFE'
      }
    ],
    'Pest Control': [
      {
        icon: <Bug color="#DC2626" size={24} />,
        title: 'Organic Pest Control',
        tips: [
          'Neem oil 5ml + soap 1g per liter water',
          'Yellow sticky traps for whitefly & aphids',
          'Trichoderma 5g/kg seed treatment',
          'Pheromone traps for bollworm - 5 per acre',
          'Introduce ladybugs for aphid control'
        ],
        color: '#FEE2E2'
      },
      {
        icon: <Bug color="#F59E0B" size={24} />,
        title: 'Chemical Control Tips',
        tips: [
          'Spray early morning or evening only',
          'Rotate pesticides to avoid resistance',
          'Follow waiting period before harvest',
          'Use flat fan nozzle for uniform spray',
          'Never mix more than 2 chemicals'
        ],
        color: '#FEF3C7'
      }
    ],
    'Soil Health': [
      {
        icon: <Sprout color="#92400E" size={24} />,
        title: 'Soil Improvement Tips
