import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { CreateSongInput } from "../../schemas/song_schema";
import { createSong } from "./song_service";
import { uploadToCloudinary } from "../../utils/uploadCloudinary";

export async function uploadSongHandler(
  req: Request<{}, {}, CreateSongInput["body"], {}>,
  res: Response
) {
  const { name, artist } = req.body;

  try {
    const filePaths = (req.files as Express.Multer.File[]).map(
      (file) => file.originalname
    );

    await uploadToCloudinary(filePaths, "songs");

    try {
      const newSong = await createSong({ name, artist });
      return res.status(201).json({ song: newSong });
    } catch (err) {
      await Promise.all([].map((id) => cloudinary.uploader.destroy(id)));
      return res.status(404).json({ msg: "User signup unsuccessful!" });
    }
  } catch (err: any) {
    return res.status(400).json({ msg: err.message });
  }
}
