//app/index.tsx
import { useSocialAuth } from "@/hooks/socialAuth";
import { Feather } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <ImageBackground source={require("../assets/images/meal2.jpg")} className="flex-1 items-center justify-center" contentFit="cover">
      <View className="h-screen items-center justify-center">
        <Text className="text-3xl [text-shadow:0_0_10px_#475569] font-rubik  text-white">
          Welcome to Racip
        </Text>
        <Link href={'/(tabs)'} className={`bg-red-500 flex-row items-center gap-2 justify-center border border-slate-300 p-2 rounded-md text-white`} replace>
          <Text className="text-white text-2xl  font-bold">Continue</Text>
          <Feather size={20} name="arrow-right" />
        </Link>
      </View>
    </ImageBackground>
  );
}
