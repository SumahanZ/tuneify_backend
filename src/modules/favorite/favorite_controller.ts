import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { createFavorite, deleteFavorite, getFavorites, getOneFavorite } from "./favorite_service";
import { AddFavoriteInput } from "../../schemas/favorite_schema";

export async function addRemoveFavoriteHandler(
  req: Request<{}, {}, AddFavoriteInput["body"]>,
  res: Response
) {
  try {
    const foundFavorite = await getOneFavorite({
      user: res.locals.user._id,
      song: req.body.songId,
    });

    console.log(foundFavorite);

    if (foundFavorite) {
      await deleteFavorite({
        _id: foundFavorite._id,
      });

      return res.status(201).json({ msg: "Removed song!" });
    }

    await createFavorite({
      user: res.locals.user,
      song: new ObjectId(req.body.songId),
    });

    return res.status(201).json({ msg: "Added song!" });
  } catch (err: any) {
    return res.status(400).json({ msg: err.message });
  }
}

export async function getUserFavoritesHandler(req: Request, res: Response) {
  try {
    const userFavorites = await getFavorites({
      user: res.locals.user._id,
    });

    return res.status(200).json(userFavorites);
  } catch (err: any) {
    return res.status(400).json({ msg: err.message });
  }
}
