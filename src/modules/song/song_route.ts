import { Router } from "express";
import { validateUser } from "../../middlewares/validateUser";
import { uploadMiddleware } from "../../middlewares/validateFile";
import { validateSchema } from "../../middlewares/validateSchema";
import { createSongInputSchema } from "../../schemas/song_schema";

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
  () => {}
);

router.post(
  "/testCheck",
  uploadMiddleware([
    { name: "thumbnail", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  (req, res) => {
    console.log(req.files);
    return res.sendStatus(200);
  }
);

router.use("/api", router);

export default router;
