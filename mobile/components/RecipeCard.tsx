// /mobile/component/RecipeCard.tsx
import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const { width } = Dimensions.get("window");
const cardWidth = (width - 32) / 2;

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
    <Link style={{ width: cardWidth }} href={{ pathname: "/meal/[id]", params: { id: recipez.idMeal } }} className='rounded-lg  items-center justify-center'>
      <View
      style={{
        elevation: 10,
        shadowColor: '#64748b'
      }}
       className='w-full mt-2 rounded-lg bg-white items-center justify-center'>
        <Image resizeMode='cover' className='h-52 rounded-t-lg w-full' source={{ uri: recipez?.strMealThumb}}/>
        <View className='w-full p-1'>
          <Text className='text-center font-rubik text-ellipsis line-clamp-1'>{recipez?.strMeal}</Text>
        </View>
      </View>
    </Link>
  )
}

export default RecipeCard