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
    addLoad: boolean; 
    clLoad: boolean; 
    removingId: string | null;
    error: string | null; 
    fetchFavourites: () => Promise<void>; 
    addFavourite: (fav: Favourite) => Promise<void>; 
    removeFavourite: (recipeId: string) => Promise<void>; 
    clearFavourites: () => Promise<void>; 
};

export const favouriteStore = create<FavouritesStore>((set) => ({
    favourites: [], 
    loading: false, 
    addLoad: false,
    clLoad: false,
    removingId: null,
    count: 0,
    error: null,
    fetchFavourites: async () => { 
        set({ loading: true }); 
        try { 
            const { data } = await api.get("/fav/my-favourites"); 
            if (data.ok) {
              set({ favourites: data.data, count: data.count});   
            }
        } catch (err: any) { 
            set({ error: err.message}); 
        } finally {
            set({ loading: false});
        }
    },
    addFavourite: async (fav) => {
        set({ addLoad: true }); 
        try { 
            const { data } = await api.post("/fav/add", fav); 
            set((state) => ({
                favourites: [...state.favourites, data.favourite],
            }));
        } catch (err: any) { 
            set({ error: err.message }); 
        } finally {
            set({ addLoad: false});
        }
    },
    removeFavourite: async(recipeId)=> {
        set({ removingId: recipeId }); 
        try {
            await api.delete(`/fav/remove/${recipeId}`); 
            set((state) => ({ favourites: state.favourites.filter((f) => f.recipeId !== recipeId), }));
        } catch (err: any) {
             set({ error: err.message }); 
        } finally {
            set({ removingId: null});
        }
    },
    clearFavourites: async()=> {
        set({ clLoad: true }); 
        try {
            await api.delete(`/fav/clear`); 
            set({ favourites: [] });
        } catch (err: any) {
            set({ error: err.message }); 
        } finally {
            set({ clLoad: false});
        }
    }
}));