import { View, Text, ActivityIndicator, ScrollView, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { favouriteStore } from '@/store/favouritesStore';
import EmptyList from '@/components/EmptyList';
import { Ionicons } from '@expo/vector-icons';

const Favourites = () => {
  const favourites = favouriteStore(state => state.favourites);
  const loading= favouriteStore(state => state.loading);
  const fetchFavourites = favouriteStore(state => state.fetchFavourites);
  const count= favouriteStore(state => state.count);
  useEffect(()=> {
    loadData();
  }, [])

  const loadData = async ()=> {
    await fetchFavourites();
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
              <Text className='font-rubik text-red-500 text-2xl'>Favourites</Text>
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
      <View className='w-full p-1'>
        <Text className='font-rubik text-red-500 text-2xl'>Favourites</Text>
      </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <FlatList
              data={favourites}
              renderItem={({ item }) => <Text>jj</Text>}
              keyExtractor={(item) => item?.recipeId.toString()}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 3, gap: 4, display: 'flex', alignItems: 'center', paddingBottom: 2 }}
              contentContainerStyle={{ gap: 2,  justifyContent: 'space-between', paddingHorizontal: 3}}
              scrollEnabled={false}
            />
          </ScrollView>
    </View>
  )
}

export default Favourites