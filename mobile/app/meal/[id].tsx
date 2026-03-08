import { View, Text, ScrollView, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { recipeStore } from '@/store/recipeStore';
import { favouriteStore } from '@/store/favouritesStore';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";

interface Ingredient {
  ingredient: string
  measure: string
}
const MealDetails = () => {
     const { id } = useLocalSearchParams<{ id: string }>();
     const router = useRouter();
     const meal = recipeStore(state => state.meal);
     const { height } = Dimensions.get("window");
    const getCategoryMealById = recipeStore(state => state.getCategoryMealById);
    const addFavourite = favouriteStore(state => state.addFavourite);
    const load = favouriteStore(state => state.loading);
    const fetchFavourites= favouriteStore(state => state.fetchFavourites);
    const favourites= favouriteStore(state => state.favourites);
    const removeFavourites= favouriteStore(state => state.removeFavourite);

    useEffect(()=> {
      getMealById();
      console.log(id)
    }, [id]);

    const isFavourite = favourites.some(
        (f) => f.recipeId === meal.idMeal
    );
    const getMealById = async() => {
        await Promise.all([
          getCategoryMealById(id),
          fetchFavourites()
        ])
    }
     const getYoutubeUrl = (url: string) => {
        //const videoId = url.split("v=")[1];
        return url.split("v=")[1]?.split("&")[0];
        //return `https://www.youtube.com/embed/${videoId}`;
     }
    const addOrRemoveFromFavourites = async() => {
      if (!meal) return;
      const isFavourite = favourites.some(
        (f) => f.recipeId === meal.idMeal
      );
      if(isFavourite) {
        await removeFavourites(meal?.idMeal)
      } else {
        await addFavourite({
            recipeId: meal.idMeal,
            title: meal.strMeal,
            image: meal.strMealThumb
        });
      }
    }
    if (load) {
      return (
        <View className='flex-1 items-center justify-center p-1'>
          <ActivityIndicator size={'large'} color={'#ef4444'}/>
        </View>
      )
    }
  return (
    <View className='flex-1 w-full bg-slate-300'>
      <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
        <View style={{ height: height * 0.5 }} className='relative bg-red-300 w-full'>
          <View className='absolute top-0 right-0 bottom-0 left-0 w-full'>
            <Image source={{ uri: meal?.strMealThumb}} className='w-full h-[120%]' resizeMode='cover'/>
          </View>
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.9)']} className='absolute h-[60%] bottom-0 right-0 left-0' />
          { /* Floating buttons */}
          <View className='absolute top left-0 right-0 p-2 w-full'>
            <View className='flex-row items-center justify-between'>
              <Pressable onPress={()=> router.back()} className='flex items-center justify-center p-2 bg-slate-500 rounded-full'>
                <Ionicons name='arrow-back' size={20} color={'#f8fafc'}/>
              </Pressable>
              <Pressable onPress={addOrRemoveFromFavourites} className='flex items-center p-2 bg-slate-400 rounded-full justify-center text-slate-50'>
                <Ionicons name='heart' size={20} color={ isFavourite ? '#ef4444': '#f8fafc'}/>
              </Pressable>
            </View>
          </View>
          { /* Title  Section */}
          <View className='bottom-28 absolute flex gap-3 left-4 right-4'>
              <View className='flex items-start '>
                <Text className='text-slate-50 bg-red-500 p-1 rounded-md px-2 text-2xl font-rubik'>{meal?.strCategory}</Text>
              </View>
              <Text className='font-rubik text-2xl text-white'>{meal?.strMeal}</Text>
              {
                meal?.strArea && (
                  <View className='flex-row items-center gap-1'>
                    <Ionicons name="location" size={25} color={'white'} />
                    <Text className='text-slate-50 bg-red-500 p-1 rounded-md px-2 text-xl font-rubik'>{meal?.strArea} Cuisine</Text>
                  </View>
                )
              }
          </View>
        </View>
        <View className='bg-white flex gap-3 rounded-t-3xl px-4 pt-5 -mt-7'>
          {
            meal?.strYoutube && (
              <View  className=''>
                  <View className='flex-row items-center mb-2 gap-3'>
                    <LinearGradient
                      colors={["#FF0000", "#CC0000"]}
                      className='w-8 h-8 flex items-center justify-center rounded-lg'
                    >
                      <Ionicons name="play" size={20} color={'white'} />
                    </LinearGradient>
                    <Text className='font-rubik text-slate-600 text-2xl'>Video Tutorial</Text>
                  </View>
                  <View className='w-full h-56 overflow-hidden rounded-md pb-1'>
                    <YoutubePlayer
                        height={220}
                        play={false}
                        videoId={getYoutubeUrl(meal?.strYoutube)}
                      />
                  </View>
              </View>
            )
          }
          {/* INGREDIENTS SECTION */}
          <View className='w-full'>
            <View  className='flex-row gap-2 items-center mb-2 py-1'>
              <LinearGradient
                colors={["#0891b2", "#0e7490"]}
                className='flex items-center p-2 rounded-full justify-center'
              >
                <Ionicons name="list" size={20} color={'white'} />
              </LinearGradient>
              <Text className='text-2xl font-rubik'>Ingredients</Text>
              <View  className='flex border rounded-lg px-1 border-slate-300 items-center justify-center'>
                <Text className='text-xl'>{meal?.ingredients?.length}</Text>
              </View>
            </View>
            <View className='w-full'>
              {
                meal?.ingredients?.map((r: Ingredient, i: number) => {
                  return (
                    <View key={i} className='flex-row w-full items-center gap-2 mb-2'>
                      <View className='p-2 flex items-center justify-center h-10 w-10 bg-yellow-200 rounded-full'>
                        <Text className='font-rubik'>{i + 1}</Text>
                      </View>
                      <View>
                        <Text className='font-roboto text-slate-500'>{r?.ingredient}: {r?.measure}</Text>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </View>
          {/* INSTRUCTIONS SECTION */}
          <View className='w-full py-1 flex gap-2'>
            <View className='flex-row gap-2 items-center'>
              <View className='rounded-full'>
                <LinearGradient
                  colors={["#9C27B0", "#673AB7"]}
                  className='p-2 rounded-md flex items-center justify-center'
                  >
                  <Ionicons name="book" size={20} color={'white'} />
                </LinearGradient>
                </View>
              <Text className='font-rubik text-2xl'>Instructions</Text>
            </View>
            <View>
              <Text>{meal?.strInstructions}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default MealDetails