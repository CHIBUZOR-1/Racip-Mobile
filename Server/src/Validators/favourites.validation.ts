import { z } from "zod";

/**
 * Params validation (for routes with :userId and :recipeId)
 * for adding to favorites
 */
export const addFavouriteParamsSchema = z.object({
  //userId: z.string().min(1, "UserId is required"),
  recipeId: z.string().min(1, "RecipeId is required"),
});

/**
 * Only userId (for clear + get)
 * for getting user favorites
 */
export const userParamsSchema = z.object({
  userId: z.string().min(1, "UserId is required"),
});

/**
 * Body validation (when adding favourite)
 */
export const addFavouriteBodySchema = z.object({
  recipeId: z.string().min(1, "RecipeId is required"),
  title: z.string().min(1, "Title is required"),
  image: z.string().optional().nullable(),
  //cookTime: z.string().optional().nullable(),
  //servings: z.string().optional().nullable(),
});