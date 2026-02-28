// app/store/recipestore
import { create } from "zustand";
import axios from "axios";
import { getIngredients } from "@/hooks/ingredients";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};
interface Ingredient {
  ingredient: string;
  measure: string;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
};
interface RecipeStore {
    loading: boolean;
    recipes: Category[];
    recipe: Meal[];
    randomMeal: Meal[];
    meal: any;
    rmeal: any;
    getCategories: () => Promise<void>;
    getRecipeByCategory: (cat: string) => Promise<void>;
    getCategoryMealById: (id: string)=> Promise<void>;
    getRandomMeal: ()=> Promise<void>;
    searchMealsByName: (query: string)=> Promise<Meal[]>;
    filterByIngredient: (query: string)=> Promise<Meal[]>;
    getRandomMeals: (count?: number)=> Promise<void>;
};

export const recipeStore = create<RecipeStore>((set, get) => ({
    loading: false,
    recipes: [],
    recipe: [],
    randomMeal: [],
    meal: {},
    rmeal: {},
    getCategories: async () => {
        try {
            set({ loading: true});
            const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
            set({ recipes: data.categories, loading: false});
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            set({ loading: false, recipes: [] });
        } finally {
            set({ loading: false});
        }
    },
    getRandomMeal: async() => {
        try {
            set({ loading: true});
            const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
            set({ rmeal: { ...data.meals[0], ingredients: getIngredients(data.meals[0])}, loading: false});
        } catch (error) {
            console.error("Failed to fetch random meal:", error);
            set({ loading: false, rmeal: {} });
        } 
    },
    searchMealsByName: async(query)=> {
        try {
            set({ loading: true});
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
            const meals = data.meals ?? [];
            set({ randomMeal: meals, loading: false});
            return meals;
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            set({ randomMeal: [] });
            return [];
        } finally {
            set({ loading: false});
        }
    },
    filterByIngredient: async(query)=> {
        try {
            set({ loading: true});
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(query)}`);
            const meals = data.meals ?? [];
            set({ randomMeal: meals, loading: false});
            return meals;
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            set({ randomMeal: [] });
            return [];
        } finally {
            set({ loading: false});
        }
    },
    getRandomMeals: async (count = 12) => {
        try {
            set({ loading: true });

            const promises = Array.from({ length: count }, () =>
                axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
            );

            const responses = await Promise.all(promises);

            const meals = responses.map((res) => ({
                ...res.data.meals[0],
                ingredients: getIngredients(res.data.meals[0]),
            }));

            set({
                randomMeal: meals
            });

        } catch (error) {
            console.error(error);
            set({ randomMeal: []});
        } finally {
            set({ loading: false});
        }
    },
    getRecipeByCategory: async(cat) => {
        try {
            set({ loading: true});
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
            set({ recipe: data.meals, loading: false});
        } catch (error) {
            console.error("Failed to fetch meals in category:", error);
            set({ loading: false, recipe: [] });
        } finally {
            set({ loading: false});
        }
    },
    getCategoryMealById: async(id) => {
        try {
            set({ loading: true});
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            set({ meal: { ...data.meals[0], ingredients: getIngredients(data.meals[0])}, loading: false});
        } catch (error) {
            console.error("Failed to fetch meal:", error);
            set({ loading: false, meal: {} });
        } finally {
            set({ loading: false});
        }
    }
    
}));