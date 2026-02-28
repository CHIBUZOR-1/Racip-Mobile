import { View, Text, TextInput, Pressable, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import { recipeStore } from '@/store/recipeStore';
import useDebounce from '@/hooks/useDebounce';
import RecipeCard from '@/components/RecipeCard';
import EmptyList from '@/components/EmptyList';

const Search = () => {
  const [search, setSearch] = useState('');
  const loading = recipeStore(state => state.loading);
  const randomMeal = recipeStore(state => state.randomMeal);
  const getRandomMeals = recipeStore(state => state.getRandomMeals);
  const searchMealsByName = recipeStore(state => state.searchMealsByName);
  const filterByIngredient = recipeStore(state => state.filterByIngredient);

  const debounceSearch = useDebounce(search, 300);

  useEffect(()=> {
    getSearch('');
  }, [])
  useEffect(()=> {
    getSearch(debounceSearch);
  }, [debounceSearch])
  const getSearch = async(query: string) => {
    // if not query entered
    if(!query.trim()) {
      await getRandomMeals();
      return;
    }

    const nameResults = await searchMealsByName(query);

    if (!nameResults || nameResults.length === 0) {
      await filterByIngredient(query);
    }
  }

  return (
    <View className='flex-1 w-full items-center p-1'>
      <View className='w-full rounded-full border px-1 border-slate-200 flex-row items-center justify-between'>
        <Ionicons name='search' size={20} color={'#475569'}/>
        <TextInput className='rounded-full flex-1' value={search} onChangeText={setSearch} placeholder='Search recipes..'/>
        {
          search.length > 0 && (
            <Pressable onPress={()=> setSearch('')} className=' rounded-full bg-red-500 flex items-center justify-center h-9 w-9'>
              <Feather  className='rounded-full font-bold' name="x" color={'white'} />
            </Pressable>
          )
        }
      </View> 
      <View className='w-full'>
        <View className='flex-row p-1 items-center justify-between'>
          <Text className='font-anton text-slate-500'>Recipes</Text>
          <Text className='font-anton text-slate-500'>{randomMeal?.length} found</Text>
        </View>
      </View>
      {
        loading ? (
          <View className='w-full flex-1 items-center justify-center'>
            <ActivityIndicator size={'large'} color={'red'}/>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <FlatList
                data={randomMeal}
                renderItem={({ item }) => <RecipeCard recipez={item} />}
                keyExtractor={(item) => item?.idMeal.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 3, gap: 4, display: 'flex', alignItems: 'center', paddingBottom: 2 }}
                contentContainerStyle={{ gap: 2,  justifyContent: 'space-between', paddingHorizontal: 3}}
                scrollEnabled={false}
                ListEmptyComponent={<EmptyList/>}
              />
            </ScrollView>
        )
      }
    </View>
  )
}

export default Search