import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { favouriteStore } from '@/store/favouritesStore';

const Favourites = () => {
  const favourites = favouriteStore(state => state.favourites);
  const count= favouriteStore(state => state.count);
  const fetchFavourites = favouriteStore(state => state.fetchFavourites);
  useEffect(()=> {
    fetchFavourites();
  }, [])
  return (
    <View className='flex-1'>
      <Text>{count}</Text>
    </View>
  )
}

export default Favourites