//app/(auth)/index.tsx
import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useSocialAuth } from '@/hooks/socialAuth'

const index = () => {
  const { handleSocialAuth, loadingProvider } = useSocialAuth();
  return (
    <View className=' flex-1 items-center justify-center'>
      <View style={{
        elevation: 6,
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      }}  className='w-[90%] flex items-center bg-white border border-slate-300  rounded-md justify-center gap-4 h-[50%] p-2 '>
        <View className='flex items-center justify-center'>
          <View className=' p-1'>
            <Text className='text-gray-700 font-semibold text-2xl'>Sign in to Racip</Text>
          </View>
          <View className=' p-1'>
            <Text className='text-slate-500'>Welcome back! Please sign in to continue</Text>
          </View>
        </View>
        <View className='flex gap-2 w-full'>
          <Pressable style={{
            elevation: 4,
            shadowColor: '#64748b',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
          }} onPress={() => handleSocialAuth("oauth_google")} className=' flex-row bg-white active:bg-slate-200 rounded-md w-full  p-2 flex items-center justify-center'>
            {loadingProvider === "oauth_google" ? (
              <ActivityIndicator size={'small'} />
            ) :(
              <>

                <AntDesign name="google" size={20} color="red" style={{ marginRight: 8 }} />
                <Text>Continue with Google</Text>
              </>
            )}
          </Pressable>
          <Pressable style={{
            elevation: 4,
            shadowColor: '#64748b',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
          }} onPress={() => handleSocialAuth("oauth_apple")} className='shadow-sm flex-row rounded-md bg-white active:bg-slate-200 w-full shadow-slate-600 p-2 flex items-center justify-center'>
            {loadingProvider === "oauth_apple" ? (
              <ActivityIndicator size={'small'} />
            ) :(
              <>
                <Ionicons name="logo-apple" size={20} color="black" style={{ marginRight: 8 }} />
                <Text>Continue with Apple</Text>
              </>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default index