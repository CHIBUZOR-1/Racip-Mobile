//Server/src/favouritesRoutes.ts
import express from 'express';
import { requireAuth } from "@clerk/express"; 
import { addToFavourites, clearFavourites, deleteFromFavourites, getFavourites } from './favouritesController';
const favouritesRouter = express.Router();

favouritesRouter.post('/add', requireAuth(), addToFavourites);
favouritesRouter.get('/my-favourites', requireAuth(), getFavourites);
favouritesRouter.delete('/remove/:recipeId', requireAuth(), deleteFromFavourites);
favouritesRouter.delete('/clear', requireAuth(), clearFavourites);

export default favouritesRouter;