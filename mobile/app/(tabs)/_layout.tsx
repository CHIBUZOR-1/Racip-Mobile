//app/(tabs)/_layout
import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Tabs } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { Feather, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const _layout = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const insets = useSafeAreaInsets();
  if (!isLoaded) {
    return null;
  }
  if (!isSignedIn) {
    return <Redirect href={'/(auth)'} />
  }
  return <Tabs 
            screenOptions={{ 
              headerShown: false,
              tabBarActiveTintColor: '#ef4444',
              tabBarStyle: {
                height: 50 + insets.bottom,
              },
            }}
          >
            <Tabs.Screen name="index" options={{ 
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size})=> <Ionicons name='restaurant' color={color} size={size}/>
            }}/>
            <Tabs.Screen name="Search" options={{ 
              tabBarLabel: 'Search',
              tabBarIcon: ({ color, size})=> <Feather name='search' color={color} size={size}/>
            }}/>
            <Tabs.Screen name="Favourites" options={{ 
              tabBarLabel: 'Favorites',
              tabBarIcon: ({ color, size})=> <Ionicons name='heart' color={color} size={size}/>
            }}/>
          </Tabs>
}

export default _layout