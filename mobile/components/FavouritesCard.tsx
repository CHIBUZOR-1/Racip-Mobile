import { View, Text, Image, Pressable, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { favouriteStore } from '@/store/favouritesStore'

const { width } = Dimensions.get("window");
const cardWidth = (width - 32) / 2;

export interface Favourite {
  recipeId: string
  title: string
  image: string
}
interface FavouriteProps {
  fave: Favourite
  loading: boolean; 
}
const FavouritesCard: React.FC<FavouriteProps> = ({ fave, loading }) => {
  const remove = favouriteStore(state => state.removeFavourite);
  return (
    <Link style={{ width: cardWidth }}  href={{ pathname: "/meal/[id]", params: { id: fave?.recipeId } }} className='flex rounded-md  items-center justify-center'>
        <View style={{
            elevation: 4,
            shadowColor: '#64748b',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
          }} className='w-full mt-2 rounded-lg items-center justify-center'>
            <Image resizeMode='cover' className='h-52 rounded-t-lg w-full' source={{ uri: fave?.image}}/>
            <View className='w-full bg-white p-1'>
                <Text className='text-center font-rubik text-ellipsis line-clamp-1'>{fave?.title}</Text>
            </View>
            <View className='w-full rounded-b-lg p-1 flex bg-white items-center'>
              <Pressable disabled={loading} onPress={()=>remove(fave?.recipeId)} className='bg-red-600 active:bg-yellow-400 p-2 rounded-full'>
                {
                  loading ? (
                    <ActivityIndicator size={'small'} color={'white'}/>
                  ) : (
                    <Ionicons name='trash-outline' size={16} color={'white'}/>
                  )
                }
              </Pressable>
            </View>
        </View>
    </Link>
  )
}

export default FavouritesCard