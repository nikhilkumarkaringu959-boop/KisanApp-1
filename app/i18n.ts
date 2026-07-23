import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const i18n = new I18n();

// 5 Languages Support: English, Telugu, Hindi, Tamil, Kannada
i18n.translations = {
  en: {
    // Common
    home: "Home",
    profile: "Profile",
    error: "Error",
    success: "Success",
    save: "Save & Continue",

    // index.tsx - Onboarding
    welcome: "Welcome to KISAN",
    onboardingSub: "Your AI-powered farming companion",
    getStarted: "Get Started",

    // home.tsx - Home Screen
    hello: "Hello",
    farmer: "Farmer",
    dashboard: "Dashboard",
    crops: "Crops",
    fertilizer: "Fertilizer",
    market: "Market",
    pest: "Pest Scan",
    schemes: "Govt Schemes",
    smartTips: "Smart Tips",
    weather: "Weather",

    // crop.tsx - Crop Info
    cropInfo: "Crop Information",
    selectCrop: "Select Crop",
    soilType: "Soil Type",
    season: "Season",
    duration: "Duration",
    yield: "Expected Yield",

    // fertilizer.tsx - Fertilizer Calculator
    fertilizerCalc: "Fertilizer Calculator",
    landSize: "Land Size",
    acres: "Acres",
    calculate: "Calculate",
    result: "Result",
    nitrogen: "Nitrogen",
    phosphorus: "Phosphorus",
    potassium: "Potassium",

    // market.tsx - Market Prices
    marketPrices: "Market Prices",
    apmcMandi: "APMC Mandi",
    lastUpdated: "Last Updated",
    min: "Min",
    max: "Max",
    indicative: "* Data is indicative. Verify with local mandi",
    fetching: "Fetching latest prices...",

    // pest.tsx - Pest Scan
    pestScan: "Pest & Disease Scan",
    identifyPests: "Identify Pests Instantly",
    scanDesc: "Take a photo of infected leaf to get AI solutions",
    scanCrop: "Scan Crop / Upload Photo",
    selectGallery: "Select from Gallery",
    detecting: "Detecting pest...",
    yourPhoto: "Your Photo",
    reference: "Reference",
    accuracy: "Accuracy",
    symptoms: "Symptoms",
    chemical: "Chemical Control",
    organic: "Organic Control",
    prevention: "Prevention Tips",
    analysisFailed: "Analysis failed. Try again with a clear photo.",

    // schemes.tsx - Govt Schemes
    govtSchemes: "Govt Schemes & Updates",
    selectState: "Select Your State",
    checkSchemes: "Check Govt Schemes & Updates",
    fetchingSchemes: "Fetching official government data...",
    latestUpdates: "Latest Updates",
    latestStatus: "Latest Status",
    eligibility: "Eligibility & Benefits",
    documents: "Required Documents",
    officialLinks: "Official Links",
    goToWebsite: "Go to Official Website",
    schemesFetchError: "Official data fetch failed. Try again.",

    // smarttips.tsx - Smart Farming Tips
    selectCropCash: "Select Cash Crops - 10 Crops",
    getSmartTips: "Smart Tips",
    calculatingTips: "AI is calculating profitable tips...",
    overview: "Overview",
    sowingTips: "Smart Sowing Tips",
    waterNutrient: "Water & Nutrient Efficiency",
    yieldBoost: "Yield Boosting Techniques",
    marketHarvest: "Market & Harvest Strategy",
    profitTip: "Profit Multiplier Tip",
    seedSelection: "Seed Selection",
    plantSpacing: "Plant Spacing",
    soilPrep: "Soil Preparation",
    waterMgmt: "Water Management",
    fertigation: "Fertigation",
    wasteReduction: "Waste Reduction",
    harvestTime: "Harvest Time",
    storage: "Storage",
    marketInsight: "Market Insight",
    tipsError: "AI tips not received. Check internet.",

    // weather.tsx - Weather
    realTimeWeather: "Real-time Weather",
    fetchWeather: "Get Live Weather Forecast",
    fetchDesc: "Fetch real-time data for your farm's location.",
    fetchBtn: "Fetch Weather",
    locationDenied: "Location permission denied",
    fetchError: "Failed to fetch weather. Please check internet.",
    yourLocation: "Your Location",
    humidity: "Humidity",
    wind: "Wind",
    rain: "Rain",
    hourForecast: "24-Hour Forecast",
    dayForecast: "10-Day Forecast",
    today: "Today",
    now: "Now",

    // profile.tsx - Profile
    farmerProfile: "Farmer Profile",
    profileSub: "Tell us about you and your farm",
    fullName: "FULL NAME",
    enterName: "Enter your name",
    age: "AGE",
    years: "Years",
    gender: "GENDER",
    male: "Male",
    female: "Female",
    other: "Other",
    state: "STATE",
    district: "DISTRICT",
    mandal: "MANDAL",
    village: "VILLAGE",
    landSizeProfile: "LAND SIZE",
    landPlaceholder: "e.g. 2.40",
    note: "Note: 40 Guntas = 1 Acre",
    nameLandError: "Please enter Name and Land Size",
  },

  te: {
    home: "హోమ్", profile: "ప్రొఫైల్", error: "లోపం", success: "విజయం", save: "సేవ్ చేసి కొనసాగించు",
    welcome: "కిసాన్ కు స్వాగతం", onboardingSub: "మీ AI ఆధారిత వ్యవసాయ సహచరుడు", getStarted: "ప్రారంభించండి",
    hello: "హలో", farmer: "రైతు", dashboard: "డాష్‌బోర్డ్", crops: "పంటలు", fertilizer: "ఎరువులు", market: "మార్కెట్", pest: "పురుగు స్కాన్", schemes: "ప్రభుత్వ పథకాలు", smartTips: "స్మార్ట్ చిట్కాలు", weather: "వాతావరణం",
    cropInfo: "పంట సమాచారం", selectCrop: "పంటను ఎంచుకోండి", soilType: "నేల రకం", season: "సీజన్", duration: "కాల వ్యవధి", yield: "ఆశించిన దిగుబడి",
    fertilizerCalc: "ఎరువుల కాలిక్యులేటర్", landSize: "భూమి విస్తీర్ణం", acres: "ఎకరాలు", calculate: "లెక్కించు", result: "ఫలితం", nitrogen: "నత్రజని", phosphorus: "భాస్వరం", potassium: "పొటాషియం",
    marketPrices: "మార్కెట్ ధరలు", apmcMandi: "APMC మార్కెట్", lastUpdated: "చివరిగా నవీకరించబడింది", min: "కనిష్ట", max: "గరిష్ట", indicative: "* డేటా సూచన మాత్రమే. స్థానిక మార్కెట్లో ధృవీకరించుకోండి", fetching: "తాజా ధరలు పొందుతోంది...",
    pestScan: "పురుగు & వ్యాధి స్కాన్", identifyPests: "పురుగులను తక్షణమే గుర్తించండి", scanDesc: "సోకిన ఆకు ఫోటో తీసి AI పరిష్కారాలు పొందండి", scanCrop: "పంటను స్కాన్ చేయి / ఫోటో అప్‌లోడ్", selectGallery: "గ్యాలరీ నుండి ఎంచుకోండి", detecting: "తెగులును గుర్తిస్తోంది...", yourPhoto: "మీ ఫోటో", reference: "రెఫరెన్స్", accuracy: "ఖచ్చితత్వం", symptoms: "లక్షణాలు", chemical: "రసాయన నివారణ", organic: "సేంద్రీయ నివారణ", prevention: "నివారణ చిట్కాలు", analysisFailed: "విశ్లేషణ విఫలమైంది. స్పష్టమైన ఫోటోతో మళ్లీ ప్రయత్నించండి.",
    govtSchemes: "ప్రభుత్వ పథకాలు & అప్డేట్స్", selectState: "మీ రాష్ట్రాన్ని ఎంచుకోండి", checkSchemes: "ప్రభుత్వ పథకాలు & అప్డేట్స్ చెక్ చేయండి", fetchingSchemes: "ప్రభుత్వ అధికారిక సమాచారాన్ని సేకరిస్తోంది...", latestUpdates: "తాజా అప్డేట్స్", latestStatus: "తాజా స్థితి", eligibility: "అర్హత & ప్రయోజనాలు", documents: "అవసరమైన పత్రాలు", officialLinks: "అధికారిక లింకులు", goToWebsite: "అధికారిక వెబ్‌సైట్‌కు వెళ్లండి", schemesFetchError: "అధికారిక డేటా రావడం లేదు. మళ్లీ ప్రయత్నించండి.",
    selectCropCash: "వాణిజ్య పంటలు ఎంచుకోండి - 10 పంటలు", getSmartTips: "స్మార్ట్ చిట్కాలు", calculatingTips: "లాభదాయకమైన చిట్కాలను AI లెక్కిస్తోంది...", overview: "అవలోకనం", sowingTips: "స్మార్ట్ విత్తన చిట్కాలు", waterNutrient: "నీరు & పోషక సామర్థ్యం", yieldBoost: "దిగుబడి పెంచే పద్ధతులు", marketHarvest: "మార్కెట్ & కోత వ్యూహం", profitTip: "లాభ గుణక చిట్కా", seedSelection: "విత్తన ఎంపిక", plantSpacing: "మొక్కల దూరం", soilPrep: "నేల తయారీ", waterMgmt: "నీటి యాజమాన్యం", fertigation: "ఎరువుల ద్వారా నీరు", wasteReduction: "వృధా తగ్గింపు", harvestTime: "కోత సమయం", storage: "నిల్వ", marketInsight: "మార్కెట్ అంతర్దృష్టి", tipsError: "AI చిట్కాలు రాలేదు. ఇంటర్నెట్ చెక్ చేయండి.",
    realTimeWeather: "తక్షణ వాతావరణం", fetchWeather: "ప్రత్యక్ష వాతావరణ సూచన పొందండి", fetchDesc: "మీ పొలం స్థానానికి రియల్-టైమ్ డేటాను పొందండి.", fetchBtn: "వాతావరణం పొందండి", locationDenied: "లొకేషన్ అనుమతి నిరాకరించబడింది", fetchError: "వాతావరణాన్ని పొందడంలో విఫలమైంది. ఇంటర్నెట్ చెక్ చేయండి.", yourLocation: "మీ స్థానం", humidity: "తేమ", wind: "గాలి", rain: "వర్షం", hourForecast: "24-గంటల సూచన", dayForecast: "10-రోజుల సూచన", today: "ఈరోజు", now: "ఇప్పుడు",
    farmerProfile: "రైతు ప్రొఫైల్", profileSub: "మీ గురించి మరియు మీ పొలం గురించి చెప్పండి", fullName: "పూర్తి పేరు", enterName: "మీ పేరు నమోదు చేయండి", age: "వయస్సు", years: "సంవత్సరాలు", gender: "లింగం", male: "పురుషుడు", female: "స్త్రీ", other: "ఇతర", state: "రాష్ట్రం", district: "జిల్లా", mandal: "మండలం", village: "గ్రామం", landSizeProfile: "భూమి విస్తీర్ణం", landPlaceholder: "ఉదా. 2.40", note: "గమనిక: 40 గుంటలు = 1 ఎకరం", nameLandError: "దయచేసి పేరు మరియు భూమి విస్తీర్ణం నమోదు చేయండి",
  },

  hi: {
    home: "होम", profile: "प्रोफ़ाइल", error: "त्रुटि", success: "सफलता", save: "सेव करें और जारी रखें",
    welcome: "किसान में आपका स्वागत है", onboardingSub: "आपका AI-संचालित कृषि साथी", getStarted: "शुरू करें",
    hello: "नमस्ते", farmer: "किसान", dashboard: "डैशबोर्ड", crops: "फसलें", fertilizer: "उर्वरक", market: "बाजार", pest: "कीट स्कैन", schemes: "सरकारी योजनाएं", smartTips: "स्मार्ट टिप्स", weather: "मौसम",
    cropInfo: "फसल की जानकारी", selectCrop: "फसल चुनें", soilType: "मिट्टी का प्रकार", season: "मौसम", duration: "अवधि", yield: "अपेक्षित उपज",
    fertilizerCalc: "उर्वरक कैलकुलेटर", landSize: "भूमि का आकार", acres: "एकड़", calculate: "गणना करें", result: "परिणाम", nitrogen: "नाइट्रोजन", phosphorus: "फास्फोरस", potassium: "पोटैशियम",
    marketPrices: "बाजार मूल्य", apmcMandi: "APMC मंडी", lastUpdated: "अंतिम अपडेट", min: "न्यूनतम", max: "अधिकतम", indicative: "* डेटा सांकेतिक है। स्थानीय मंडी में सत्यापित करें", fetching: "नवीनतम मूल्य प्राप्त किए जा रहे हैं...",
    pestScan: "कीट और रोग स्कैन", identifyPests: "कीटों की तुरंत पहचान करें", scanDesc: "AI समाधान पाने के लिए संक्रमित पत्ते की फोटो लें", scanCrop: "फसल स्कैन करें / फोटो अपलोड करें", selectGallery: "गैलरी से चुनें", detecting: "कीट का पता लगाया जा रहा है...", yourPhoto: "आपकी फोटो", reference: "संदर्भ", accuracy: "सटीकता", symptoms: "लक्षण", chemical: "रासायनिक नियंत्रण", organic: "जैविक नियंत्रण", prevention: "रोकथाम युक्तियाँ", analysisFailed: "विश्लेषण विफल रहा। स्पष्ट फोटो के साथ पुनः प्रयास करें।",
    govtSchemes: "सरकारी योजनाएं और अपडेट", selectState: "अपना राज्य चुनें", checkSchemes: "सरकारी योजनाएं और अपडेट देखें", fetchingSchemes: "आधिकारिक सरकारी डेटा प्राप्त किया जा रहा है...", latestUpdates: "नवीनतम अपडेट", latestStatus: "नवीनतम स्थिति", eligibility: "पात्रता और लाभ", documents: "आवश्यक दस्तावेज", officialLinks: "आधिकारिक लिंक", goToWebsite: "आधिकारिक वेबसाइट पर जाएं", schemesFetchError: "आधिकारिक डेटा प्राप्त करने में विफल। पुनः प्रयास करें।",
    selectCropCash: "नकदी फसलें चुनें - 10 फसलें", getSmartTips: "स्मार्ट सुझाव", calculatingTips: "AI लाभदायक सुझावों की गणना कर रहा है...", overview: "अवलोकन", sowingTips: "स्मार्ट बुवाई सुझाव", waterNutrient: "पानी और पोषक दक्षता", yieldBoost: "उपज बढ़ाने की तकनीकें", marketHarvest: "बाजार और कटाई रणनीति", profitTip: "लाभ गुणक टिप", seedSelection: "बीज चयन", plantSpacing: "पौधे की दूरी", soilPrep: "मिट्टी की तैयारी", waterMgmt: "जल प्रबंधन", fertigation: "उर्वरक", wasteReduction: "अपशिष्ट में कमी", harvestTime: "कटाई का समय", storage: "भंडारण", marketInsight: "बाजार अंतर्दृष्टि", tipsError: "AI सुझाव नहीं मिले। इंटरनेट जांचें।",
    realTimeWeather: "वास्तविक समय मौसम", fetchWeather: "लाइव मौसम पूर्वानुमान प्राप्त करें", fetchDesc: "अपने खेत के स्थान के लिए वास्तविक समय का डेटा प्राप्त करें।", fetchBtn: "मौसम प्राप्त करें", locationDenied: "स्थान अनुमति अस्वीकृत", fetchError: "मौसम प्राप्त करने में विफल। कृपया इंटरनेट जांचें।", yourLocation: "आपका स्थान", humidity: "नमी", wind: "हवा", rain: "बारिश", hourForecast: "24 घंटे का पूर्वानुमान", dayForecast: "10 दिन का पूर्वानुमान", today: "आज", now: "अभी",
    farmerProfile: "किसान प्रोफ़ाइल", profileSub: "अपने और अपने खेत के बारे में बताएं", fullName: "पूरा नाम", enterName: "अपना नाम दर्ज करें", age: "आयु", years: "वर्ष", gender: "लिंग", male: "पुरुष", female: "महिला", other: "अन्य", state: "राज्य", district: "जिला", mandal: "मंडल", village: "गांव", landSizeProfile: "भूमि का आकार", landPlaceholder: "जैसे 2.40", note: "नोट: 40 गुंटा = 1 एकड़", nameLandError: "कृपया नाम और भूमि का आकार दर्ज करें",
  },

  ta: {
    home: "முகப்பு", profile: "சுயவிவரம்", error: "பிழை", success: "வெற்றி", save: "சேமித்து தொடரவும்",
    welcome: "கிசானுக்கு வரவேற்கிறோம்", onboardingSub: "உங்கள் AI சார்ந்த விவசாய துணை", getStarted: "தொடங்குங்கள்",
    hello: "வணக்கம்", farmer: "விவசாயி", dashboard: "டாஷ்போர்டு", crops: "பயிர்கள்", fertilizer: "உரம்", market: "சந்தை", pest: "பூச்சி ஸ்கேன்", schemes: "அரசு திட்டங்கள்", smartTips: "ஸ்மார்ட் குறிப்புகள்", weather: "வானிலை",
    cropInfo: "பயிர் தகவல்", selectCrop: "பயிரை தேர்ந்தெடுக்கவும்", soilType: "மண் வகை", season: "பருவம்", duration: "காலம்", yield: "எதிர்பார்கப்படும் விளைச்சல்",
    fertilizerCalc: "உர கால்குலேட்டர்", landSize: "நில அளவு", acres: "ஏக்கர்", calculate: "கணக்கிடு", result: "முடிவு", nitrogen: "நைட்ரஜன்", phosphorus: "பாஸ்பரஸ்", potassium: "பொட்டாசியம்",
    marketPrices: "சந்தை விலைகள்", apmcMandi: "APMC சந்தை", lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது", min: "குறைந்தபட்சம்", max: "அதிகபட்சம்", indicative: "* தரவு தோராயமானது. உள்ளூர் சந்தையில் சரிபார்கவும்", fetching: "சமீபத்திய விலைகளை பெறுகிறது...",
    pestScan: "பூச்சி & நோய் ஸ்கேன்", identifyPests: "பூச்சிகளை உடனடியாக அடையாளம் காணவும்", scanDesc: "AI தீர்வுகளைப் பெற பாதிக்கப்பட்ட இலையின் புகைப்படத்தை எடுக்கவும்", scanCrop: "பயிரை ஸ்கேன் செய் / புகைப்படத்தை பதிவேற்று", selectGallery: "கேலரியில் இருந்து தேர்ந்தெடுக்கவும்", detecting: "பூச்சியைக் கண்டறிதல்...", yourPhoto: "உங்கள் புகைப்படம்", reference: "குறிப்பு", accuracy: "துல்லியம்", symptoms: "அறிகுறிகள்", chemical: "இரசாயன கட்டுப்பாடு", organic: "இயற்கை கட்டுப்பாடு", prevention: "தடுப்பு குறிப்புகள்", analysisFailed: "பகுப்பாய்வு தோல்வியடைந்தது. தெளிவான புகைப்படத்துடன் மீண்டும் முயற்சிக்கவும்.",
    govtSchemes: "அரசு திட்டங்கள் & புதுப்பிப்புகள்", selectState: "உங்கள் மாநிலத்தை தேர்ந்தெடுக்கவும்", checkSchemes: "அரசு திட்டங்கள் & புதுப்பிப்புகளை சரிபார்கவும்", fetchingSchemes: "அதிகாரப்பூர்வ அரசு தரவை பெறுகிறது...", latestUpdates: "சமீபத்திய புதுப்பிப்புகள்", latestStatus: "சமீபத்திய நிலை", eligibility: "தகுதி & பலன்கள்", documents: "தேவையான ஆவணங்கள்", officialLinks: "அதிகாரப்பூர்வ இணைப்புகள்", goToWebsite: "அதிகாரப்பூர்வ இணையதளத்திற்கு செல்லவும்", schemesFetchError: "அதிகாரப்பூர்வ தரவு பெற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
    selectCropCash: "பணப்பயிர்களை தேர்ந்தெடுக்கவும் - 10 பயிர்கள்", getSmartTips: "ஸ்மார்ட் குறிப்புகள்", calculatingTips: "AI லாபகரமான குறிப்புகளை கணக்கிடுகிறது...", overview: "கண்ணோட்டம்", sowingTips: "ஸ்மார்ட் விதைப்பு குறிப்புகள்", waterNutrient: "நீர் & ஊட்டச்சத்து திறன்", yieldBoost: "விளைச்சல் அதிகரிக்கும் நுட்பங்கள்", marketHarvest: "சந்தை & அறுவடை உத்தி", profitTip: "லாப பெருக்கி குறிப்பு", seedSelection: "விதை தேர்வு", plantSpacing: "செடி இடைவெளி", soilPrep: "மண் தயாரிப்பு", waterMgmt: "நீர் மேலாண்மை", fertigation: "உரமிடுதல்", wasteReduction: "வீண் குறைப்பு", harvestTime: "அறுவடை நேரம்", storage: "சேமிப்பு", marketInsight: "சந்தை நுண்ணறிவு", tipsError: "AI குறிப்புகள் கிடைக்கவில்லை. இணையத்தை சரிபார்கவும்.",
    realTimeWeather: "நேரடி வானிலை", fetchWeather: "நேரடி வானிலை முன்னறிவிப்பைப் பெறுங்கள்", fetchDesc: "உங்கள் பண்ணை இடத்திற்கான நேரடி தரவைப் பெறுங்கள்.", fetchBtn: "வானிலையைப் பெறு", locationDenied: "இருப்பிட அனுமதி மறுக்கப்பட்டது", fetchError: "வானிலையைப் பெற முடியவில்லை. இணையத்தை சரிபார்கவும்.", yourLocation: "உங்கள் இருப்பிடம்", humidity: "ஈரப்பதம்", wind: "காற்று", rain: "மழை", hourForecast: "24 மணி நேர முன்னறிவிப்பு", dayForecast: "10 நாள் முன்னறிவிப்பு", today: "இன்று", now: "இப்போது",
    farmerProfile: "விவசாயி சுயவிவரம்", profileSub: "உங்களைப் பற்றியும் உங்கள் பண்ணையைப் பற்றியும் கூறுங்கள்", fullName: "முழு பெயர்", enterName: "உங்கள் பெயரை உள்ளிடவும்", age: "வயது", years: "ஆண்டுகள்", gender: "பாலினம்", male: "ஆண்", female: "பெண்", other: "மற்றவை", state: "மாநிலம்", district: "மாவட்டம்", mandal: "மண்டலம்", village: "கிராமம்", landSizeProfile: "நில அளவு", landPlaceholder: "எ.கா. 2.40", note: "குறிப்பு: 40 குண்டா = 1 ஏக்கர்", nameLandError: "பெயர் மற்றும் நில அளவை உள்ளிடவும்",
  },

  kn: {
    home: "ಮುಖಪುಟ", profile: "ಪ್ರೊಫೈಲ್", error: "ದೋಷ", success: "ಯಶಸ್ಸು", save: "ಉಳಿಸಿ ಮತ್ತು ಮುಂದುವರಿಸಿ",
    welcome: "ಕಿಸಾನ್‌ಗೆ ಸ್ವಾಗತ", onboardingSub: "ನಿಮ್ಮ AI-ಚಾಲಿತ ಕೃಷಿ ಸಹಾಯಕ", getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    hello: "ನಮಸ್ಕಾರ", farmer: "ರೈತ", dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", crops: "ಬೆಳೆಗಳು", fertilizer: "ರಸಗೊಬ್ಬರ", market: "ಮಾರುಕಟ್ಟೆ", pest: "ಕೀಟ ಸ್ಕ್ಯಾನ್", schemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು", smartTips: "ಸ್ಮಾರ್ಟ್ ಸಲಹೆಗಳು", weather: "ಹವಾಮಾನ",
    cropInfo: "ಬೆಳೆ ಮಾಹಿತಿ", selectCrop: "ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ", soilType: "ಮಣ್ಣಿನ ಪ್ರಕಾರ", season: "ಋತು", duration: "ಅವಧಿ", yield: "ನಿರೀಕ್ಷಿತ ಇಳುವರಿ",
    fertilizerCalc: "ರಸಗೊಬ್ಬರ ಕ್ಯಾಲ್ಕುಲೇಟರ್", landSize: "ಭೂಮಿಯ ಗಾತ್ರ", acres: "ಎಕರೆ", calculate: "ಲೆಕ್ಕಹಾಕಿ", result: "ಫಲಿತಾಂಶ", nitrogen: "ಸಾರಜನಕ", phosphorus: "ರಂಜಕ", potassium: "ಪೊಟ್ಯಾಶಿಯಂ",
    marketPrices: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು", apmcMandi: "APMC ಮಾರುಕಟ್ಟೆ", lastUpdated: "ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ", min: "ಕನಿಷ್ಠ", max: "ಗರಿಷ್ಠ", indicative: "* ಡೇಟಾ ಸೂಚಕವಾಗಿದೆ. ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಪರಿಶೀಲಿಸಿ", fetching: "ಇತ್ತೀಚಿನ ಬೆಲೆಗಳನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
    pestScan: "ಕೀಟ ಮತ್ತು ರೋಗ ಸ್ಕ್ಯಾನ್", identifyPests: "ಕೀಟಗಳನ್ನು ತಕ್ಷಣ ಗುರುತಿಸಿ", scanDesc: "AI ಪರಿಹಾರಗಳನ್ನು ಪಡೆಯಲು ಸೋಂಕಿತ ಎಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ", scanCrop: "ಬೆಳೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ / ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ", selectGallery: "ಗ್ಯಾಲರಿಯಿಂದ ಆಯ್ಕೆಮಾಡಿ", detecting: "ಕೀಟವನ್ನು ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ...", yourPhoto: "ನಿಮ್ಮ ಫೋಟೋ", reference: "ಉಲ್ಲೇಖ", accuracy: "ನಿಖರತೆ", symptoms: "ಲಕ್ಷಣಗಳು", chemical: "ರಾಸಾಯನಿಕ ನಿಯಂತ್ರಣ", organic: "ಸಾವಯವ ನಿಯಂತ್ರಣ", prevention: "ತಡೆಗಟ್ಟುವ ಸಲಹೆಗಳು", analysisFailed: "ವಿಶ್ಲೇಷಣೆ ವಿಫಲವಾಗಿದೆ. ಸ್ಪಷ್ಟ ಫೋಟೋದೊಂದಿಗೆ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    govtSchemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ನವೀಕರಣಗಳು", selectState: "ನಿಮ್ಮ ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ", checkSchemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ನವೀಕರಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ", fetchingSchemes: "ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಡೇಟಾವನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ...", latestUpdates: "ಇತ್ತೀಚಿನ ನವೀಕರಣಗಳು", latestStatus: "ಇತ್ತೀಚಿನ ಸ್ಥಿತಿ", eligibility: "ಅರ್ಹತೆ ಮತ್ತು ಪ್ರಯೋಜನಗಳು", documents: "ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು", officialLinks: "ಅಧಿಕೃತ ಲಿಂಕ್‌ಗಳು", goToWebsite: "ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಹೋಗಿ", schemesFetchError: "ಅಧಿಕೃತ ಡೇಟಾವನ್ನು ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    selectCropCash: "ವಾಣಿಜ್ಯ ಬೆಳೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ - 10 ಬೆಳೆಗಳು", getSmartTips: "ಸ್ಮಾರ್ಟ್ ಸಲಹೆಗಳು", calculatingTips: "AI ಲಾಭದಾಯಕ ಸಲಹೆಗಳನ್ನು ಲೆಕ್ಕ ಹಾಕುತ್ತಿದೆ...", overview: "ಅವಲೋಕನ", sowingTips: "ಸ್ಮಾರ್ಟ್ ಬಿತ್ತನೆ ಸಲಹೆಗಳು", waterNutrient: "ನೀರು ಮತ್ತು ಪೋಷಕ ದಕ್ಷತೆ", yieldBoost: "ಇಳುವರಿ ಹೆಚ್ಚಿಸುವ ತಂತ್ರಗಳು", marketHarvest: "ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಕೊಯ್ಲು ತಂತ್ರ", profitTip: "ಲಾಭ ಗುಣಕ ಸಲಹೆ", seedSelection: "ಬೀಜ ಆಯ್ಕೆ", plantSpacing: "ಸಸ್ಯ ಅಂತರ", soilPrep: "ಮಣ್ಣು ತಯಾರಿ", waterMgmt: "ನೀರಿನ ನಿರ್ವಹಣೆ", fertigation: "ರಸಗೊಬ್ಬರ", wasteReduction: "ವ್ಯರ್ಥ ಕಡಿತ", harvestTime: "ಕೊಯ್ಲು ಸಮಯ", storage: "ಸಂಗ್ರಹಣೆ", marketInsight: "ಮಾರುಕಟ್ಟೆ ಒಳನೋಟ", tipsError: "AI ಸಲಹೆಗಳು ಬರಲಿಲ್ಲ. ಇಂಟರ್ನೆಟ್ ಪರಿಶೀಲಿಸಿ.",
    realTimeWeather: "ನೈಜ ಸಮಯದ ಹವಾಮಾನ", fetchWeather: "ಲೈವ್ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಯನ್ನು ಪಡೆಯಿರಿ", fetchDesc: "ನಿಮ್ಮ ಜಮೀನಿನ ಸ್ಥಳಕ್ಕೆ ನೈಜ ಸಮಯದ ಡೇಟಾವನ್ನು ಪಡೆಯಿರಿ.", fetchBtn: "ಹವಾಮಾನವನ್ನು ಪಡೆಯಿರಿ", locationDenied: "ಸ್ಥಳ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ", fetchError: "ಹವಾಮಾನವನ್ನು ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಇಂಟರ್ನೆಟ್ ಪರಿಶೀಲಿಸಿ.", yourLocation: "ನಿಮ್ಮ ಸ್ಥಳ", humidity: "ತೇವಾಂಶ", wind: "ಗಾಳಿ", rain: "ಮಳೆ", hourForecast: "24 ಗಂಟೆಗಳ ಮುನ್ಸೂಚನೆ", dayForecast: "10 ದಿನಗಳ ಮುನ್ಸೂಚನೆ", today: "ಇಂದು", now: "ಈಗ",
    farmerProfile: "ರೈತ ಪ್ರೊಫೈಲ್", profileSub: "ನಿಮ್ಮ ಬಗ್ಗೆ ಮತ್ತು ನಿಮ್ಮ ಜಮೀನಿನ ಬಗ್ಗೆ ನಮಗೆ ತಿಳಿಸಿ", fullName: "ಪೂರ್ಣ ಹೆಸರು", enterName: "ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ", age: "ವಯಸ್ಸು", years: "ವರ್ಷಗಳು", gender: "ಲಿಂಗ", male: "ಪುರುಷ", female: "ಸ್ತ್ರೀ", other: "ಇತರೆ", state: "ರಾಜ್ಯ", district: "ಜಿಲ್ಲೆ", mandal: "ತಾಲೂಕು", village: "ಗ್ರಾಮ", landSizeProfile: "ಭೂಮಿಯ ಗಾತ್ರ", landPlaceholder: "ಉದಾ. 2.40", note: "ಟಿಪ್ಪಣಿ: 40 ಗುಂಟೆ = 1 ಎಕರೆ", nameLandError: "ದಯವಿಟ್ಟು ಹೆಸರು ಮತ್ತು ಭೂಮಿಯ ಗಾತ್ರವನ್ನು ನಮೂದಿಸಿ",
  }
};

i18n.locale = Localization.locale;
i18n.enableFallback = true;

export default i18n; // idhi mottam code ha
