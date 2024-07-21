import { z, object, string, array } from "zod";

export const createSongInputSchema = object({
  body: object({
    name: string({
      required_error: "Song Name is required",
    }),
    artist: string({
      required_error: "Artist Name is required",
    }),
  }),
});

export type CreateSongInput = z.infer<typeof createSongInputSchema>;
