import { z, object, string } from "zod";

export const createSongInputSchema = object({
  body: object({
    name: string({
      required_error: "Song Name is required",
    }).min(6, "Song Name too short -  should be 6 chars minimum"),
    artist: string({
      required_error: "Artist Name is required",
    }).min(6, "Artist Name too short -  should be 6 chars minimum"),
    hexCode: string({
      required_error: "Hex Code is required",
    }),
  }),
});

export type CreateSongInput = z.infer<typeof createSongInputSchema>;
