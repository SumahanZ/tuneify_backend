import { z, object, string } from "zod";

export const addFavoriteInputSchema = object({
  body: object({
    songId: string({
      required_error: "Song Id must be provided",
    }),
  }),
});

export type AddFavoriteInput = z.infer<typeof addFavoriteInputSchema>;
