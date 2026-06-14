import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="screens/LanguageScreen" />
      <Stack.Screen name="screens/FarmerProfile" />
      <Stack.Screen name="screens/CropInfo" />
      <Stack.Screen name="screens/Weather" />
      <Stack.Screen name="screens/FertilizerCalc" />
      <Stack.Screen name="screens/PestControl" />
      <Stack.Screen name="screens/FarmingTips" />
      <Stack.Screen name="screens/GovtSchemes" />
    </Stack>
  );
}
