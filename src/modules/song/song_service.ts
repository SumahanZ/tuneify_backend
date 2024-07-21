import { uploadToCloudinary } from "../../utils/cloudinaryUtils";
import { SongInput, SongModel } from "./song_model";

export async function createSong(input: SongInput) {
  try {
    const createdSong = await SongModel.create(input);
    if (!createdSong) throw new Error("Song created unsuccessfully!");
    return createdSong;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function uploadSongImageToStorage(filePath: {
  [fieldname: string]: Express.Multer.File[];
}) {
  try {
    if (!(filePath["thumbnail"][0] && filePath["artist"][0]))
      throw new Error("Provided files doesn't match");

    const thumbnailResult = await uploadToCloudinary(
      filePath["thumbnail"][0].originalname,
      "thumbnails"
    );

    const audioResult = await uploadToCloudinary(
      filePath["thumbnail"][0].originalname,
      "thumbnails"
    );

    return { thumbnailResult, audioResult };
  } catch (err: any) {
    throw new Error(err);
  }
}
