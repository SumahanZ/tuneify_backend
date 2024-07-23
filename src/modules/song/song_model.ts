import mongoose, { InferSchemaType } from "mongoose";

export interface SongInput {
  name: string;
  artist: string;
  audioURL: string;
  thumbnailURL: string;
  hexCode: string;
}

export type SongDocument = InferSchemaType<typeof songSchema>;

const songSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    artist: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    audioURL: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    thumbnailURL: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    hexCode: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SongModel = mongoose.model<SongDocument>("Song", songSchema);
