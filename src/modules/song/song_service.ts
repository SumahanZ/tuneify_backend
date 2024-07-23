import path from "path";
import { uploadToCloudinary } from "../../utils/cloudinaryUtils";
import log from "../../utils/logger";
import { SongDocument, SongInput, SongModel } from "./song_model";
import { getDataURIFromMemory } from "../../utils/multerUtils";
import { customID } from "../../utils/generateID";
import { FilterQuery, QueryOptions } from "mongoose";

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

    const thumbnailResult = await uploadToCloudinary(
      getDataURIFromMemory(filePath["thumbnail"][0].buffer, filePath["thumbnail"][0].mimetype),
      `thumbnails/${customID()}`
    );

    const audioResult = await uploadToCloudinary(
      getDataURIFromMemory(filePath["audio"][0].buffer, filePath["audio"][0].mimetype),
      `audios/${customID()}`
    );

    return { thumbnailResult, audioResult };
  } catch (err: any) {
    log.error(err);
    throw new Error(err);
  }
}

export async function getSongs(query?: FilterQuery<SongDocument>) {
  try {
    if (query) return await SongModel.find(query).lean();
    return await SongModel.find().lean();
  } catch (err: any) {
    throw new Error(err);
  }
}
