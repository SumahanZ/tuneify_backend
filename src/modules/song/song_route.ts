import { Router } from "express";
import { validateUser } from "../../middlewares/validateUser";
import { uploadMiddleware } from "../../middlewares/validateFile";
import { validateSchema } from "../../middlewares/validateSchema";
import { createSongInputSchema } from "../../schemas/song_schema";
import { fetchLatestSongsHandler, uploadSongHandler } from "./song_controller";

const router = Router();

router.post(
  "/song/upload-song",
  [
    validateUser,
    uploadMiddleware([
      { name: "thumbnail", maxCount: 1 },
      { name: "audio", maxCount: 1 },
    ]),
    validateSchema(createSongInputSchema),
  ],
  uploadSongHandler
);

router.get("/song/list", validateUser, fetchLatestSongsHandler);

router.use("/api", router);

export default router;
