import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const i18n = new I18n({
  en: { 
    appName: "KISAN",
    subTitle: "THE SMART FARMING ASSISTANT",
    selectLang: "Please select your language",
    farmerProfile: "Farmer Profile",
    profileSub: "Tell us about you and your farm",
    fullName: "FULL NAME *",
    age: "AGE",
    gender: "GENDER",
    state: "STATE",
    district: "DISTRICT",
    mandal: "MANDAL",
    village: "VILLAGE",
    landSize: "LAND SIZE (ACRES) *",
    soilType: "SOIL TYPE *",
    save: "Save & Continue",
    note: "Note: 40 Guntas = 1 Acre",
    cropName: "Crop Name *",
    askAI: "Ask KISAN AI",
    chemicalTotal: "Chemical Fertilizer - Total",
    organicTotal: "Organic Fertilizer - Total"
  },
  te: { 
    appName: "కిసాన్",
    subTitle: "స్మార్ట్ వ్యవసాయ సహాయకుడు",
    selectLang: "దయచేసి మీ భాషను ఎంచుకోండి",
    farmerProfile: "రైతు ప్రొఫైల్",
    profileSub: "మీ గురించి మరియు మీ పొలం గురించి చెప్పండి",
    fullName: "పూర్తి పేరు *",
    age: "వయస్సు",
    gender: "లింగం",
    state: "రాష్ట్రం",
    district: "జిల్లా",
    mandal: "మండలం",
    village: "గ్రామం",
    landSize: "భూమి పరిమాణం (ఎకరాలు) *",
    soilType: "నేల రకం *",
    save: "సేవ్ & కొనసాగించు",
    note: "గమనిక: 40 గుంటలు = 1 ఎకరం",
    cropName: "పంట పేరు *",
    askAI: "కిసాన్ AI ని అడుగు",
    chemicalTotal: "రసాయన ఎరువులు - మొత్తం",
    organicTotal: "సేంద్రీయ ఎరువులు - మొత్తం"
  },
  hi: { 
    appName: "किसान",
    subTitle: "स्मार्ट कृषि सहायक",
    selectLang: "कृपया अपनी भाषा चुनें",
    farmerProfile: "किसान प्रोफ़ाइल",
    profileSub: "अपने और अपने खेत के बारे में बताएं",
    fullName: "पूरा नाम *",
    age: "उम्र",
    gender: "लिंग",
    state: "राज्य",
    district: "जिला",
    mandal: "मंडल",
    village: "गांव",
    landSize: "भूमि का आकार (एकड़) *",
    soilType: "मिट्टी का प्रकार *",
    save: "सेव करें और जारी रखें",
    note: "नोट: 40 गुंटा = 1 एकड़",
    cropName: "फसल का नाम *",
    askAI: "किसान AI से पूछें",
    chemicalTotal: "रासायनिक उर्वरक - कुल",
    organicTotal: "जैविक उर्वरक - कुल"
  },
  ta: { 
    appName: "கிசான்",
    subTitle: "ஸ்மார்ட் விவசாய உதவியாளர்",
    selectLang: "தயவுசெய்து உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    farmerProfile: "விவசாயி சுயவிவரம்",
    save: "சேமி & தொடரவும்"
  },
  kn: { 
    appName: "ಕಿಸಾನ್",
    subTitle: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಹಾಯಕ",
    selectLang: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    farmerProfile: "ರೈತ ಪ್ರೊಫೈಲ್",
    save: "ಉಳಿಸಿ & ಮುಂದುವರಿಸಿ"
  },
});

export const setLanguage = async (langCode: string) => {
  i18n.locale = langCode;
  await AsyncStorage.setItem('appLanguage', langCode);
}

export const loadLanguage = async () => {
  const savedLang = await AsyncStorage.getItem('appLanguage');
  i18n.locale = savedLang || Localization.locale.split('-')[0] || 'en';
}

export default i18n;
