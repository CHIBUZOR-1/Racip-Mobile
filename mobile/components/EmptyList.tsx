import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const EmptyList = () => {
  return (
    <View className='items-center w-full h-full justify-center pt-20'>
        <View className='w-full flex h-full items-center justify-center p-1'>
            <Ionicons name='restaurant' size={50} color={'#ef4444'}/>
            <Text className='font-roboto text-slate-400'>No Meals Found</Text>
        </View>
    </View>
  )
}

export default EmptyList