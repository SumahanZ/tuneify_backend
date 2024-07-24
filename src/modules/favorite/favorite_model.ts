import mongoose, { InferSchemaType } from "mongoose";

export type FavoriteDocument = InferSchemaType<typeof favoriteSchema>;

export interface FavoriteInput {
  user: mongoose.Types.ObjectId;
  song: mongoose.Types.ObjectId;
}

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  },
  {
    timestamps: true,
  }
);

export const FavoriteModel = mongoose.model<FavoriteDocument>("Favorite", favoriteSchema);
