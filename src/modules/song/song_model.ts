import mongoose from "mongoose";

export interface SongInput {
  name: string;
  artist: string;
  audioURL: string;
  thumbnailURL: string;
}

export interface SongDocument extends SongInput, mongoose.Document {
  updatedAt: Date;
  createdAt: Date;
}

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
  },
  {
    timestamps: true,
  }
);

export const SongModel = mongoose.model<SongDocument>("Song", songSchema);
