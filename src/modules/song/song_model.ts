import mongoose from "mongoose";

export interface UserInput {
  name: string;
  artist: string;
  url: string;
}

export interface SongDocument extends UserInput, mongoose.Document {
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
    url: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SongModel = mongoose.model<SongDocument>("Song", songSchema);
