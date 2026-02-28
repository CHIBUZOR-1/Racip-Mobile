//hooks/socialAuth.ts
import { useSSO } from "@clerk/clerk-expo"
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import * as Linking from "expo-linking";


export const useSocialAuth = () => {
    const [loadingProvider, setLoadingProvider] = useState<"oauth_google" | "oauth_apple" | null>(null)
    const { startSSOFlow } = useSSO();
    const router = useRouter();
    const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
        setLoadingProvider(strategy);
        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy,  redirectUrl: Linking.createURL("/"), });
            if (createdSessionId && setActive) {
                await setActive({ session: createdSessionId });
            }
        } catch (error) {
            console.log('An Error Occured', error);
            const provider = strategy === "oauth_google" ? "Google" : "Apple";
            Alert.alert("Error", `Failed to sign in with ${provider}. Please Try again`)
        } finally {
            setLoadingProvider(null)
        }
    }
    return { handleSocialAuth, loadingProvider };
}