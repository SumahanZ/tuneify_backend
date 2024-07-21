import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { CreateSongInput } from "../../schemas/song_schema";
import { createSong, uploadSongImageToStorage } from "./song_service";
import { uploadToCloudinary } from "../../utils/cloudinaryUtils";

export async function uploadSongHandler(
  req: Request<{}, {}, CreateSongInput["body"], {}>,
  res: Response
) {
  const { name, artist } = req.body;

  try {
    const filePaths = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const { thumbnailResult, audioResult } = await uploadSongImageToStorage(filePaths);

    try {
      const newSong = await createSong({
        name,
        artist,
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
