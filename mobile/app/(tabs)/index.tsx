//app/(tabs)/index.tsx
import { View, Text, Image, Pressable, Alert, ScrollView, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useClerk } from '@clerk/clerk-expo'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { recipeStore } from '@/store/recipeStore'
import { Link } from 'expo-router'
import Categories from '@/components/Categories'
import RecipeCard from '@/components/RecipeCard'
import EmptyList from '@/components/EmptyList'

const HomeScreen = () => {
  const {signOut} = useClerk();
  const { user } = useUser();
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const selectLoad = recipeStore(state => state.selectLoad)
  const recipes = recipeStore(state => state.recipes);
  const recipe = recipeStore(state => state.recipe)
  const rmeal = recipeStore(state => state.rmeal);

  const getCategories = recipeStore(state => state.getCategories)
  const getRandomMeal = recipeStore(state => state.getRandomMeal)
  const getRecipeByCategory = recipeStore(state => state.getRecipeByCategory)

  const [selectedCat, setSelectedCat] = useState<string>('');
  const [refreshing, setRefrshing] = useState(false);

  useEffect(() => {
   loadAll();
  }, []);
  
  useEffect(()=> {
    fetchSelectedCat(selectedCat);
  },[selectedCat])
   const logout = ()=> {
     Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel"},
      {
        text: "Logout",
        style: "destructive",
        onPress: () => signOut(),
      },
     ])
   }
   const loadAll = async()=> {
    try {
      setImageLoaded(true);
       await getCategories();
       await getRandomMeal();
       !selectedCat && await relate('Beef');
    } catch (error) {
      console.log(error)
    } finally {
      setImageLoaded(false)
    }
   }
   
   const relate = async(cat: string)=> {
      setSelectedCat('Beef');
      await getRecipeByCategory(cat);
   }

   const handleCatSelect = async(category: string)=> {
      setSelectedCat(category);
   }

   const fetchSelectedCat = async(category: string) => {
    await getRecipeByCategory(category);
   }
   const onRefresh = async() => {
    setRefrshing(true);
    await loadAll();
    setRefrshing(false);
   }
   if (imageLoaded) {
     return (
      <View className='flex-1 items-center justify-center p-1'>
        <ActivityIndicator size={'large'} color={'#ef4444'}/>
      </View>
      
     )
   }
  return (
    <View className='flex-1 items-center justify-center gap-3'>
      <View className='flex-row items-center px-2 justify-between w-full p-1'>
        <View>
          <Image className='w-10 rounded-full h-10' source={{ uri: `${user?.imageUrl}`}}/>
        </View>
        <View>
          <Pressable onPress={logout} className=' p-1  flex items-center justify-center  active:bg-slate-300'>
            <Ionicons name='exit-outline' size={25} color={'#ef4444'}/>
          </Pressable>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
      >
        {/* Featured Recipe */}
        <Link  href={{ pathname: "/meal/[id]", params: { id: rmeal.idMeal } }} className='w-full relative h-80 flex items-center justify-center p-1 rounded-md'>
              <View style={{
                elevation: 4,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                shadowColor: '#64748b',
              }} className='w-full h-full'>
                <Image  resizeMode='cover' className='w-full rounded-lg h-full' source={{ uri: rmeal?.strMealThumb }}/>
                <Text className={`bg-red-500 absolute top-2 left-2 text-white font-anton px-2 rounded-md ${imageLoaded && 'hidden'}`}>FEATURED</Text>
                <Text className=' absolute bottom-2 [text-shadow:0_0_10px_#ef4444] right-2 text-white font-anton px-2 rounded-md'>{rmeal?.strMeal}</Text>
              </View>
        </Link>
        {/* Categories section*/}
        {
          recipes.length > 0 && (
            <Categories categories={recipes} selectedCategory={selectedCat} onSelectCategory={handleCatSelect}/>
          )
        }
        {/* Selected Category user_36iHth9O8tJ6Wu54ictd5CUcsh4 */}
        <View className='w-full p-2'>
          <Text className='font-oswald text-red-700 text-2xl'>{selectedCat}</Text>
        </View>
        <View className='flex w-full'>
          {
            recipe.length > 0 && (
              <FlatList
                data={recipe}
                renderItem={({ item }) => <RecipeCard recipez={item} />}
                keyExtractor={(item) => item?.idMeal.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between',  paddingHorizontal: 9, alignItems: 'center'}}
                contentContainerStyle={{ gap: 10}}
                scrollEnabled={false}
                ListEmptyComponent={<EmptyList/>}
              />
            )
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen