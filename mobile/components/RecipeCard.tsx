// /mobile/component/RecipeCard.tsx
import { View, Text, Image } from 'react-native'
import React from 'react'

export interface Meal {
  idMeal: string
  strMealThumb: string
  strMeal: string
}
interface RecipeProps {
  recipez: Meal
}
const RecipeCard: React.FC<RecipeProps> = ({ recipez }) => {
  return (
    <View className='w-[50%] mt-2 rounded-lg border border-red-100 items-center justify-center'>
      <Image resizeMode='cover' className='h-52 rounded-t-lg w-full' source={{ uri: recipez?.strMealThumb}}/>
      <View className='w-full p-1'>
        <Text className='text-center font-rubik text-ellipsis line-clamp-1'>{recipez?.strMeal}</Text>
      </View>
    </View>
  )
}

export default RecipeCard