import { View, Text, ActivityIndicator, ScrollView, FlatList, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { favouriteStore } from '@/store/favouritesStore';
import { Ionicons } from '@expo/vector-icons';
import FavouritesCard from '@/components/FavouritesCard';

const Favourites = () => {
  const favourites = favouriteStore(state => state.favourites);
  const loading= favouriteStore(state => state.loading);
  const fetchFavourites = favouriteStore(state => state.fetchFavourites);
  const clLoad= favouriteStore(state => state.clLoad);
  const removingId = favouriteStore(state => state.removingId);
  const clearAll = favouriteStore(state => state.clearFavourites);
  useEffect(()=> {
    loadData();
  }, [])

  const loadData = async()=> {
    await fetchFavourites();
  }

  const clearFavs = async()=> {
    await clearAll();
  }


  if (loading) {
       return (
        <View className='flex-1 items-center justify-center p-1'>
          <ActivityIndicator size={'large'} color={'#ef4444'}/>
        </View>
        
       )
  }

  if (favourites.length === 0) {
    return (
      <View className='flex-1'>
            <View className='w-full p-1'>
              <Text className='font-rubik text-red-500 text-2xl'>My Favourites</Text>
            </View>
            <View className='items-center w-full h-full justify-center pt-20'>
              <View className='w-full flex h-full items-center justify-center p-1'>
                  <Ionicons name='restaurant' size={50} color={'#ef4444'}/>
                  <Text className='font-roboto text-slate-500'>No Favourites Found</Text>
              </View>
            </View>
        </View>
    )
  }
  return (
    <View className='flex-1'>
      <View className='w-full flex-row items-center gap-2  p-1'>
        <Text className='font-rubik text-red-500 text-2xl'>My Favourites</Text>
        <Text className='px-2 border border-slate-400 rounded-md'>{favourites.length}</Text>
      </View>
      <View className='p-2 flex-row w-full '>
        <Pressable disabled={clLoad} onPress={clearFavs} className={`flex-row p-1 px-1 ${ clLoad ? 'bg-slate-500' : 'active:bg-red-400 bg-blue-600'} rounded-md  items-center gap-2`}>
          <Text className='text-white font-semibold'>Clear all</Text>
          <Ionicons name='trash-outline' color={'white'}/>
        </Pressable>
      </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <FlatList
              data={favourites}
              renderItem={({ item }) => <FavouritesCard fave={item} loading={removingId === item.recipeId}/>}
              keyExtractor={(item) => item?.recipeId.toString()}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between',  paddingHorizontal: 4}}
              contentContainerStyle={{ gap: 13, paddingHorizontal: 5,}}
              scrollEnabled={false}
            />
          </ScrollView>
    </View>
  )
}

export default Favourites