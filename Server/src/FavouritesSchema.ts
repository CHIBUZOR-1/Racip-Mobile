// Backend/Server/src/favouritesModel.ts
import mongoose, { Schema, InferSchemaType } from 'mongoose';

const favouritesSchema = new Schema(
    {
        userId: { type: String, required: true},
        recipeId: { type: String, required: true},
        title: { type: String, required: true },
        image: { type: String },
        cookTime: { type: String },
        servings: { type: String }
    },
    { timestamps: true, minimize: false }
);

export type IFavourite = InferSchemaType<typeof favouritesSchema>;

const favouritesModel = mongoose.model<IFavourite>('favourites', favouritesSchema);
export default favouritesModel;