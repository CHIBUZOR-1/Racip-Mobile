import { create } from "zustand"; 
import api from "@/lib/api";

interface Favourite { 
    recipeId: string; 
    title: string; 
    image: string;
}; 
interface FavouritesStore { 
    favourites: Favourite[]; 
    count: number;
    loading: boolean; 
    error: string | null; 
    fetchFavourites: () => Promise<void>; 
    addFavourite: (fav: Favourite) => Promise<void>; 
    removeFavourite: (recipeId: string) => Promise<void>; 
    clearFavourites: () => Promise<void>; 
};

export const favouriteStore = create<FavouritesStore>((set) => ({
    favourites: [], 
    loading: false, 
    count: 0,
    error: null,
    fetchFavourites: async () => { 
        set({ loading: true }); 
        try { 
            const { data } = await api.get("/fav/my-favourites"); 
            if (data.ok) {
              console.log(data)
              set({ favourites: data.data, count: data.count});   
            }
        } catch (err: any) { 
            set({ error: err.message}); 
        } finally {
            set({ loading: false});
        }
    },
    addFavourite: async (fav) => {
        set({ loading: true }); 
        try { 
            await api.post("/fav/add", fav); 
            set({ loading: false }); 
        } catch (err: any) { 
            set({ error: err.message }); 
        } finally {
            set({ loading: false});
        }
    },
    removeFavourite: async(recipeId)=> {
        try {
            await api.delete(`/fav/remove/${recipeId}`); 
            set((state) => ({ favourites: state.favourites.filter((f) => f.recipeId !== recipeId), }));
        } catch (err: any) {
             set({ error: err.message }); 
        } finally {
            set({ loading: false});
        }
    },
    clearFavourites: async()=> {}
}));