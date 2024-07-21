import { SongInput, SongModel } from "./song_model";

export async function createSong(
  input: Omit<SongInput, "thumbnailURL" | "audioURL">
) {
  try {
    const createdSong = await SongModel.create(input);
    if (!createdSong) throw new Error("Song created unsuccessfully!");
    return createdSong;
  } catch (err: any) {
    throw new Error(err);
  }
}
