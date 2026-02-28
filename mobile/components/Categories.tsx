import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import React from 'react'


export interface Category {
  idCategory: string
  strCategory: string
  strCategoryThumb: string
}

interface CategoriesProps {
  categories: Category[]
  selectedCategory: string | null
  onSelectCategory: (category: string) => void
}
const Categories: React.FC<CategoriesProps> = ({ categories, selectedCategory, onSelectCategory}) => {
  return (
    <View className='flex-1 items-center w-full justify-center'>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 3, paddingHorizontal: 4}}
      >
        {
            categories.map((cat, i)=> {
                return (
                    <Pressable onPress={()=>onSelectCategory(cat?.strCategory)} key={cat?.idCategory} className={`p-1 flex w-28 border-slate-300 border items-center justify-center rounded-md ${selectedCategory === cat?.strCategory ? 'bg-red-500': 'bg-white'}`}>
                        <Image className='h-10 w-14' source={{uri: cat?.strCategoryThumb}}/>
                        <Text className={`font-rubik ${selectedCategory === cat?.strCategory ? 'text-white whitespace-nowrap': 'text-gray-600'}`}>{cat?.strCategory}</Text>
                    </Pressable>
                )
            })
        }
      </ScrollView>
    </View>
  )
}

export default Categories