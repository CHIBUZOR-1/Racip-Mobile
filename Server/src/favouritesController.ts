//Server/src/favouritesController.ts
import { Request, Response } from "express";
import favouritesModel from "./FavouritesSchema";
import { addFavouriteBodySchema, addFavouriteParamsSchema, userParamsSchema } from "./Validators/favourites.validation";

const addToFavourites = async(req: Request, res: Response) => {
    try {
      const { userId, recipeId } = addFavouriteParamsSchema.parse(req.params);
      const { title, image, cookTime, servings} = addFavouriteBodySchema.parse(req.body);
      if (!userId || !recipeId) {
          return res.status(400).json({ ok: false, msg: "Cannot be null" });
      }
      // Check if already exists
      const exists = await favouritesModel.findOne({ userId, recipeId });
      if (exists) {
          return res.status(400).json({
              ok: false,
              msg: "Recipe already in favourites",
          });
      }

      const favourite = new favouritesModel({
        userId,
        recipeId,
        title,
        image,
        cookTime,
        servings
      });
      await favourite.save();

      return res.status(201).json({
        ok: true,
        msg: 'Added to favourites',
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        error: true,
        msg: "An error occurred!",
      });
    }
    
}
const getFavourites = async(req: Request, res: Response) => {
    try {
      const { userId } = userParamsSchema.parse(req.params);

      const favourites = await favouritesModel.find({ userId });

      return res.status(200).json({
        ok: true,
        count: favourites.length,
        data: favourites,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        error: true,
        msg: "An error occurred!",
      });
    }
}

const deleteFromFavourites = async(req: Request, res: Response) => {
    try {
      const { userId, recipeId } = addFavouriteParamsSchema.parse(req.params);

      const deleted = await favouritesModel.findOneAndDelete({
        userId,
        recipeId,
      });

      if (!deleted) {
        return res.status(404).json({
          ok: false,
          msg: "Favourite not found",
        });
      }

      return res.status(200).json({
        ok: true,
        msg: "Removed from favourites",
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        error: true,
        msg: "An error occurred!",
      });
    }
}

const clearFavourites = async(req: Request, res: Response) => {
    try {
    const { userId } = userParamsSchema.parse(req.params);

    await favouritesModel.deleteMany({ userId });

    return res.status(200).json({
      ok: true,
      msg: "All favourites cleared",
    });
  } catch (error: any) {
    return res.status(400).json({
      ok: false,
      error: error.errors ?? error.message,
    });
  }
}

export { addToFavourites, getFavourites, deleteFromFavourites, clearFavourites };