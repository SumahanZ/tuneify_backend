import { SongDocument, SongInput } from "../song/song_model";
import { FavoriteDocument, FavoriteInput, FavoriteModel } from "./favorite_model";
import { FilterQuery } from "mongoose";

export async function createFavorite(input: FavoriteInput) {
  try {
    const createdFavorite = await FavoriteModel.create(input);
    if (!createdFavorite) throw new Error("Unable to add song to favorite!");
    return createdFavorite;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getFavorites(query: FilterQuery<FavoriteDocument>) {
  try {
    return await FavoriteModel.find(query).lean();
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function deleteFavorite(query: FilterQuery<FavoriteDocument>) {
  try {
    return await FavoriteModel.findOneAndDelete(query).lean();
  } catch (err: any) {
    throw new Error(err);
  }
}
export async function getOneFavorite(query: FilterQuery<FavoriteDocument>) {
  try {
    return await FavoriteModel.findOne(query).lean();
  } catch (err: any) {
    throw new Error(err);
  }
}
