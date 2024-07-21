import path from "path";
import { uploadToCloudinary } from "../../utils/cloudinaryUtils";
import log from "../../utils/logger";
import { SongInput, SongModel } from "./song_model";
import { getDataURIFromMemory } from "../../utils/configureMulter";

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
    if (!(filePath["thumbnail"][0] && filePath["audio"][0]))
      throw new Error("Provided files doesn't match");

    console.log(path.dirname(filePath["thumbnail"][0].mimetype));

    const thumbnailResult = await uploadToCloudinary(
      getDataURIFromMemory(filePath["thumbnail"][0].buffer, filePath["thumbnail"][0].mimetype),
      "thumbnails"
    );

    const audioResult = await uploadToCloudinary(
      getDataURIFromMemory(filePath["audio"][0].buffer, filePath["audio"][0].mimetype),
      "audios"
    );

    return { thumbnailResult, audioResult };
  } catch (err: any) {
    log.error(err);
    throw new Error(err);
  }
}
