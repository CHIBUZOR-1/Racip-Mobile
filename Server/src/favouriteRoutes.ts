//Server/src/favouritesRoutes.ts
import express from 'express';
import { addToFavourites, clearFavourites, deleteFromFavourites, getFavourites } from './favouritesController';
const favouritesRouter = express.Router();

favouritesRouter.post('/add/:userId/:recipeId', addToFavourites);
favouritesRouter.get('/my-favourites/:userId', getFavourites);
favouritesRouter.delete('/remove/:userId/:recipeId', deleteFromFavourites);
favouritesRouter.delete('/clear/:userId', clearFavourites);

export default favouritesRouter;