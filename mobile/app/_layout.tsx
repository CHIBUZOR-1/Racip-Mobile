//app/_layout.tsx
import { Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo';
import { useFonts } from "expo-font";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import "../global.css"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    Rubik: require("../assets/fonts/RubikDistressed-Regular.ttf"),
    Anton: require("../assets/fonts/Anton-Regular.ttf"),
    PlaywriteCA: require("../assets/fonts/PlaywriteCA-Regular.ttf"),
    Pacifico: require("../assets/fonts/Pacifico-Regular.ttf"),
    Oswald: require("../assets/fonts/Oswald-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center ">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ClerkProvider tokenCache={tokenCache}>
        <SafeAreaView className="flex-1 bg-slate-600">
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false}}>
            <Stack.Screen name="index" options={{ headerTitle: "Home"}}/>
            <Stack.Screen name="(auth)" options={{ headerTitle: "Home Screen" }}/>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </SafeAreaView>
    </ClerkProvider>
  );
}
