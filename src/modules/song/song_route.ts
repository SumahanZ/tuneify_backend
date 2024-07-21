import { Router } from "express";
import { validateUser } from "../../middlewares/validateUser";
import { fileValidation } from "../../middlewares/validateFile";
import { validateSchema } from "../../middlewares/validateSchema";
import { createSongInputSchema } from "../../schemas/song_schema";

const router = Router();

router.post(
  "/song/upload-song",
  [validateUser, fileValidation([]), validateSchema(createSongInputSchema)],
  () => {}
);

router.post("/testCheck", fileValidation([]), (req, res) => {
  console.log(req.files);
});

router.use("/api", router);

export default router;
