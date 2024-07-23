import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { CreateSongInput } from "../../schemas/song_schema";
import { createSong, getSongs, uploadSongImageToStorage } from "./song_service";

export async function uploadSongHandler(
  req: Request<{}, {}, CreateSongInput["body"], {}>,
  res: Response
) {
  const { name, artist, hexCode } = req.body;

  try {
    const filePaths = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const { thumbnailResult, audioResult } = await uploadSongImageToStorage(filePaths);

    try {
      const newSong = await createSong({
        name,
        artist,
        hexCode,
        thumbnailURL: thumbnailResult.url,
        audioURL: audioResult.url,
      });

      return res.status(201).json({ song: newSong });
    } catch (err) {
      await Promise.all(
        [thumbnailResult.public_id, audioResult.public_id].map((id) =>
          cloudinary.uploader.destroy(id)
        )
      );
      return res.status(404).json({ msg: "User signup unsuccessful!" });
    }
  } catch (err: any) {
    return res.status(400).json({ msg: err.message });
  }
}

export async function fetchLatestSongsHandler(req: Request, res: Response) {
  try {
    const latestSongs = await getSongs();
    return res.status(200).json(latestSongs);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ msg: err.message });
  }
}
