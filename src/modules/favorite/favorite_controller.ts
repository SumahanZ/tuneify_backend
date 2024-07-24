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
      user: res.locals.users,
      song: req.body.songId,
    });

    if (foundFavorite)
      await deleteFavorite({
        id: foundFavorite._id,
      });

    await createFavorite({
      user: res.locals.user,
      song: new ObjectId(req.body.songId),
    });

    return res.status(201).json({ msg: "Successfully added/remove song from favorites!" });
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ msg: err.message });
  }
}

export async function getUserFavoritesHandler(req: Request, res: Response) {
  try {
    const userFavorites = await getFavorites({
      id: res.locals.user,
    });

    return res.status(200).json(userFavorites);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ msg: err.message });
  }
}
