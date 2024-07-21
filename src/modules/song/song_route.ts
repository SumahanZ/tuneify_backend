import { Router } from "express";
import { validateUser } from "../../middlewares/validateUser";
import { uploadMiddleware } from "../../middlewares/validateFile";
import { validateSchema } from "../../middlewares/validateSchema";
import { CreateSongInput, createSongInputSchema } from "../../schemas/song_schema";
import { uploadSongHandler } from "./song_controller";

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

router.post(
  "/testCheck",
  [
    uploadMiddleware([
      { name: "thumbnail", maxCount: 1 },
      { name: "audio", maxCount: 1 },
    ]),
    validateSchema(createSongInputSchema),
  ],
  (req: any, res: any) => {
    console.log(req.body);
    console.log(req.files);
    if (req.files) {
      const filePaths = req.files;
      console.log(filePaths["thumbnail"][0].originalname);
    }
    // console.log(filePaths);
    return res.sendStatus(200);
  }
);

router.use("/api", router);

export default router;
